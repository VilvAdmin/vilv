import { auth, clerkClient } from '@clerk/nextjs/server'
import AddPlayerButton from './addPlayerButton';
import { redirect } from 'next/navigation';
import PlayersTable from './PlayersTable';
import { Player } from '~/types';


export default async function Players() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/');
  }

  // const { data } = await (await clerkClient()).users.getUserList({limit: 1000});
  
  // const players: Player[] = data.map(user => ({
  //   id: user.id,
  //   fullName: user.fullName || "N/A",
  //   primaryEmailAddress: user.primaryEmailAddress?.emailAddress || "N/A",
  //   roles: user.publicMetadata.roles as string
  // }));

  return (
    <>
    <p></p>
    <AddPlayerButton />
    {/* <PlayersTable {...players} /> */}
    </>
  );
}
