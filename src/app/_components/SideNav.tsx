"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export function SideNav() {
  const { user } = useUser();

  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes("admin");
  
  return (
    <nav className="flex items-end flex-col w-1/5 p-4 text-lg border-r border-vilvBlue">
      <p className="text-vilvBlue font-semibold">De Club</p>
      <Link href="/nieuws">Nieuws</Link>
      <Link href="/integriteit">Club-API</Link>
      <Link href="/locatie">Locatie</Link>
      <Link href="/historiek">Historiek</Link>
      <Link href="/sponsors">Sponsors</Link>
      {!!user && <>
        <p className="text-vilvBlue font-semibold pt-4">Sportief</p>
        <Link href="/stats-season">Statistieken seizoen</Link>
        <Link href="/stats-historical">Statistieken sinds 2002</Link>
        <p className="text-vilvBlue font-semibold pt-4">Leden</p>
        <Link href="/games">Inschrijven</Link>
      </>
      }
      {isAdmin && 
      <>
        <p className="text-vilvBlue font-semibold pt-4">Admin</p>
        <Link href="/players">Spelers</Link>
      </>
      }
    </nav>
  )
}
