"use client";
import { useUser } from "@clerk/nextjs";

export default function EditGameButton() {
  const { user } = useUser();
  
  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes("admin");

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-vilvBlue text-xl font-semibold pb-4">Wedstrijddetails</h1>

      {isAdmin && <button className="bg-vilvGreen text-white p-2 rounded-md">Aanpassen</button>}

    </div>
  )
}
