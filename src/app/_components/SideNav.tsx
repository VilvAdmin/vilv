"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "~/components/ui/navigation-menu";

export function SideNav() {
  const { user, isSignedIn } = useUser();

  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes("admin");
  
  return (
    <nav className="flex items-end flex-col w-1/5 p-4 text-lg border-r border-vilvBlue h-full">
      <p className="text-vilvBlue font-semibold">De Club</p>
      <Link href="/nieuws">Nieuws</Link>
      <Link href="/bestuur">Bestuur</Link>
      <Link href="/integriteit">Club-API</Link>
      <Link href="/locatie">Locatie</Link>
      <Link href="/historiek">Historiek</Link>
      <Link href="/sponsors">Sponsors</Link>
      {isSignedIn && <>
        <p className="text-vilvBlue font-semibold pt-4">Sportief</p>
        <Link href="/stats-season" className="text-right">Statistieken seizoen</Link>
        <Link href="/stats-historical" className="text-right">Statistieken sinds 2002</Link>
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


export function SideNavMobile() {
  const { user, isSignedIn } = useUser();

  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes("admin");

  return (
      <NavigationMenu>
      <NavigationMenuList className="flex flex-row flex-wrap justify-center w-screen">
        <NavigationMenuItem>
          <NavigationMenuTrigger>De Club</NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col p-2 space-y-4">
            <Link href="/nieuws">Nieuws</Link>
            <Link href="/bestuur">Bestuur</Link>
            <Link href="/integriteit">Club-API</Link>
            <Link href="/locatie">Locatie</Link>
            <Link href="/historiek">Historiek</Link>
            <Link href="/sponsors">Sponsors</Link>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {isSignedIn && <>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Sportief</NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col p-2 space-y-4">
            <Link href="/stats-season" className="text-right">Statistieken seizoen</Link>
            <Link href="/stats-historical" className="text-right">Statistieken sinds 2002</Link>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Leden</NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col p-2 space-y-4">
            <Link href="/games">Inschrijven</Link>
          </NavigationMenuContent>
        </NavigationMenuItem>
        </>}

        {isAdmin && <>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col p-2 space-y-4">
            <Link href="/players" className="text-right">Spelers</Link>
          </NavigationMenuContent>
        </NavigationMenuItem>
        </>}
      </NavigationMenuList>
    </NavigationMenu>
  )
}