import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ActiveSelect from "../ActiveSelect";
import PlayerHeader from "./PlayerHeader";

interface PlayerProps {
  params: Promise<{ id: string }>;
}

export default async function Player({ params }: PlayerProps) {
  const { id } = await params;
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
    const thisPlayer = await clerk.users.getUser(id);

    return (
      <>
        <PlayerHeader />
        <h2 className="text-vilvBlue text-lg font-semibold pb-4">Gegevens</h2>
        <div className="grid grid-cols-[max-content_1fr] gap-2 pb-4">
          <p className="font-semibold">Naam</p><p>{thisPlayer?.fullName}</p>
          <p className="font-semibold">Email</p><p>{thisPlayer?.emailAddresses ? thisPlayer.emailAddresses[0]?.emailAddress : "no email"}</p>
          <p className="font-semibold">Rol</p><p>{thisPlayer?.publicMetadata?.roles as string}</p>
          <p className="font-semibold">Actief</p><p><ActiveSelect active={!!thisPlayer?.publicMetadata?.active} user_id={thisPlayer.id} /></p>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching player:', error);
    return <p>Failed to load players</p>;
  }
}