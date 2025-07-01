import { auth, clerkClient } from '@clerk/nextjs/server'
import PlayersHeader from './PlayersHeader';
import { redirect } from 'next/navigation';
import PlayersTable from './PlayersTable';
import { Player } from '~/types';


export default async function Players() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/');
  }

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const isAdmin = (user.publicMetadata?.roles as string[])?.includes('admin');

  if (!isAdmin) {
    redirect('/');
  }

  try {
    // Fetch all users with pagination
    const allUsers: Player[] = [];

    for (let page = 1; ; page++) {
      const { data } = await clerk.users.getUserList({
        limit: 100, // max allowed
      });

      allUsers.push(
        ...data.map(user => ({
          id: user.id,
          fullName: user.fullName ?? "N/A",
          primaryEmailAddress: user.primaryEmailAddress?.emailAddress ?? "N/A",
          roles: user.publicMetadata.roles as string,
          active: !!user.publicMetadata.active
        }))
      );

      if (data.length < 100) break; // no more pages
    }

    return (
      <>
        <PlayersHeader />
        <PlayersTable players={allUsers} />
      </>
    );
  } catch (error) {
    console.error('Error fetching players:', error);
    return <p>Failed to load players</p>;
  }
}
