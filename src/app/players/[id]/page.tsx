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

  // const userSchema = z.object({
  //   firstName: z.string().min(2, "Voornaam moet minstens 2 karakters bevatten"),
  //   lastName: z.string().min(2, "Voornaam moet minstens 2 karakters bevatten"),
  //   emailAddress: z.string().email("Ongeldig emailadres"),
  //   username: z.string().min(3, "Gebruikersnaam moet minstens 3 karakters bevatten"),
  //   password: z.string().min(8, "Wachtwoord moet minstens 8 karakters bevatten"),
  //   publicMetadata: z.object({
  //     roles: z.array(z.string()).optional(),
  //     active: z.boolean().optional().default(true),
  //   }),
  // });

  // export type PlayerForm = z.infer<typeof userSchema>;

  try {
    const thisPlayer = await clerk.users.getUser(id);

    return (
      <>
        <PlayerHeader user_id={thisPlayer?.id} player={{
          firstName: thisPlayer?.firstName ?? "",
          lastName: thisPlayer?.lastName ?? "",
          emailAddress: thisPlayer?.emailAddresses?.[0]?.emailAddress?.toString() ?? "",
          username: thisPlayer?.username ?? "",
          password: "",
          publicMetadata: {
            roles: Array.isArray(thisPlayer?.publicMetadata?.roles) ? thisPlayer.publicMetadata.roles as string[] : undefined,
            active: typeof thisPlayer?.publicMetadata?.active === 'boolean' ? thisPlayer.publicMetadata.active : false,
          }
        }} />
        <h2 className="text-vilvBlue text-lg font-semibold pb-4">Gegevens</h2>
        <div className="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-4 items-center pb-4">
          <p className="font-semibold">Naam</p><p>{thisPlayer?.fullName}</p>
          <p className="font-semibold">Username</p><p>{thisPlayer?.username}</p>
          <p className="font-semibold">Email</p><p>{thisPlayer?.emailAddresses ? thisPlayer.emailAddresses[0]?.emailAddress : "no email"}</p>
          <p className="font-semibold">Rol</p><p>{thisPlayer?.publicMetadata?.roles as string ?? "Geen"}</p>
          <p className="font-semibold">Actief</p><p><ActiveSelect active={!!thisPlayer?.publicMetadata?.active} user_id={thisPlayer.id} /></p>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching player:', error);
    return <p>Failed to load players</p>;
  }
}