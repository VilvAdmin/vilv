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

  try {
    const clerk = await clerkClient();
    const { data } = await clerk.users.getUserList({limit: 1000});
    
    const players: Player[] = data.map(user => ({
      id: user.id,
      fullName: user.fullName ?? "N/A",
      primaryEmailAddress: user.primaryEmailAddress?.emailAddress ?? "N/A",
      roles: user.publicMetadata.roles as string,
      active: !!user.publicMetadata.active
    }));

    return (
      <>
      <PlayersHeader />
      <PlayersTable players={players} />
      </>
    );
  } catch (error) {
    console.error('Error fetching players:', error);
    return <p>Failed to load players</p>;
  }
}
