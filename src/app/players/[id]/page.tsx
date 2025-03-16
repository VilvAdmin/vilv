// import { auth, clerkClient } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import ActiveSelect from "../ActiveSelect";

// interface GameProps {
//   params: Promise<{ id: string }>;
// }

// export default async function Player({ params }: GameProps) {
//   const { id } = await params;
//   const { userId } = await auth()

//   if (!userId) {
//     redirect('/');
//   }

//   try {
//     const clerk = await clerkClient();
//     const thisPlayer = await clerk.users.getUser(id);

//     return (
//         <>
//         <PlayerHeader user={thisPlayer} />
//         <h2 className="text-vilvBlue text-lg font-semibold pb-4">Gegevens</h2>
//         <div className="grid grid-cols-[max-content_1fr] gap-2 pb-4">
//           <p className="font-semibold">Naam</p><p>{thisPlayer?.fullName}</p>
//           <p className="font-semibold">Email</p><p>{thisPlayer?.primaryEmailAddress?.toString() ?? ""}</p>
//           <p className="font-semibold">Rol</p><p>{thisPlayer?.publicMetadata?.roles as string}</p>
//           <p className="font-semibold">Actief</p><p><ActiveSelect active={!!thisPlayer?.publicMetadata?.active} user_id={thisPlayer.id}/></p>
//         </div>
//         </>
//     );
//   } catch (error) {
//     console.error('Error fetching player:', error);
//     return <p>Failed to load players</p>;
//   }
// }