'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '~/components/ui/navigation-menu';

export function SideNav() {
  const { user, isSignedIn } = useUser();

  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes('admin');

  return (
    <nav className="flex h-full w-1/5 flex-col items-end border-r border-vilvBlue p-4 text-lg">
      <p className="font-semibold text-vilvBlue">De Club</p>
      <Link href="/nieuws">Nieuws</Link>
      <Link href="/bestuur">Bestuur</Link>
      <Link href="/integriteit">Club-API</Link>
      <Link href="/locatie">Locatie</Link>
      <Link href="/historiek">Historiek</Link>
      <Link href="/sponsors">Sponsors</Link>
      {isSignedIn && (
        <>
          <p className="pt-4 font-semibold text-vilvBlue">Sportief</p>
          <Link href="/stats-season" className="text-right">
            Statistieken seizoen
          </Link>
          <Link href="/stats-historical" className="text-right">
            Statistieken sinds 2002
          </Link>
          <p className="pt-4 font-semibold text-vilvBlue">Leden</p>
          <Link href="/games">Wedstrijden</Link>
          <Link href="/trainings">Trainingen</Link>
        </>
      )}
      {isAdmin && (
        <>
          <p className="pt-4 font-semibold text-vilvBlue">Admin</p>
          <Link href="/players" className="text-right">
            Spelers
          </Link>
          <Link href="/games-import" className="text-right">
            Wedstrijden importeren
          </Link>
        </>
      )}
    </nav>
  );
}

export function SideNavMobile() {
  const { user, isSignedIn } = useUser();

  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes('admin');

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex w-screen flex-row flex-wrap justify-center">
        <NavigationMenuItem>
          <NavigationMenuTrigger>De Club</NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col space-y-4 p-2">
            <Link href="/nieuws">Nieuws</Link>
            <Link href="/bestuur">Bestuur</Link>
            <Link href="/integriteit">Club-API</Link>
            <Link href="/locatie">Locatie</Link>
            <Link href="/historiek">Historiek</Link>
            <Link href="/sponsors">Sponsors</Link>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {isSignedIn && (
          <>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Sportief</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col space-y-4 p-2">
                <Link href="/stats-season" className="text-right">
                  Statistieken seizoen
                </Link>
                <Link href="/stats-historical" className="text-right">
                  Statistieken sinds 2002
                </Link>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Leden</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col space-y-4 p-2">
                <Link href="/games">Wedstrijden</Link>
                <Link href="/trainings">Trainingen</Link>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </>
        )}

        {isAdmin && (
          <>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col space-y-4 p-2">
                <Link href="/players" className="text-right">
                  Spelers
                </Link>
                <Link href="/games-import" className="text-right">
                  Wedstrijden importeren
                </Link>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
