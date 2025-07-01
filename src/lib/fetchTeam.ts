import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Player } from "~/types";

export default async function fetchTeam(options?: { onlyActive: boolean }) {
  const onlyActive = options?.onlyActive;
  const { userId } = await auth()

  if (!userId) {
    redirect('/');
  }

  try {
    const clerk = await clerkClient();
    const { data } = await clerk.users.getUserList({ limit: 1000 });
    
    // Fetch all users with pagination
    const players: Player[] = []; 
    for (let page = 1; ; page++) {
      const { data } = await clerk.users.getUserList({ limit: 100 });
      players.push(
        ...data.map(user => ({
          id: user.id,
          fullName: user.fullName ?? "N/A",
          primaryEmailAddress: user.primaryEmailAddress?.emailAddress ?? "N/A",
          roles: user.publicMetadata.roles as string,
          active: !!user.publicMetadata.active,
        }))
      );
      if (data.length < 100) break;
    }
    return onlyActive ? players.filter(p => p.active) : players;

  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
}