"use client";

import { useUser } from "@clerk/nextjs";

export function SideNav() {
  const { user } = useUser();

  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes("admin");
  
  return (
    <nav className="flex items-end flex-col w-1/4 p-4 text-lg border-r border-vilvBlue">
      <p className="text-vilvBlue font-semibold">De Club</p>
      <a href="/nieuws">Nieuws</a>
      <a href="/integriteit">Club-API</a>
      <a href="/locatie">Locatie</a>
      <a href="/historiek">Historiek</a>
      <a href="/sponsors">Sponsors</a>
      {!!user && <>
        <p className="text-vilvBlue font-semibold pt-4">Sportief</p>
        <a href="/stats-season">Statistieken seizoen</a>
        <a href="/stats-historical">Statistieken sinds 2002</a>
        <p className="text-vilvBlue font-semibold pt-4">Leden</p>
        <a href="/availabilities">Inschrijven</a>
      </>
      }
      {isAdmin && 
      <>
        <p className="text-vilvBlue font-semibold pt-4">Admin</p>
        <a href="/players">Spelers</a>
        <a href="/games">Wedstrijden</a>
      </>
      }
    </nav>
  )
}
