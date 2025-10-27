import { asc, eq } from 'drizzle-orm';
import { db } from '~/server/db';
import { availabilities, games } from '~/server/db/schema';
import GameHeader from './GameHeader';
import type { Game } from '~/types';
import { validate as isUuid } from 'uuid';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import UnconfirmedTable from './UnconfirmedTable';
import fetchTeam from '~/lib/fetchTeam';
import SelectionTable from './SelectionTable';

interface GameProps {
  params: Promise<{ id: string }>;
}

export default async function Games({ params }: GameProps) {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  // Get user's admin status from Clerk
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const isAdmin = (user.publicMetadata as { roles?: string[] }).roles?.includes('admin') ?? false;

  if (!isUuid(id)) {
    return (
      <div>
        <h1>Invalid Game ID</h1>
        <p>The provided game ID is not valid.</p>
      </div>
    );
  }

  const thisGame: Game | undefined = await db.query.games.findFirst({
    where: eq(games.id, id),
  });

  const availabilitiesGame: {
    id: string;
    status: 'Beschikbaar' | 'Niet beschikbaar' | 'Geblesseerd' | null;
    game_id: string;
    user_id: string;
    player_name: string;
    selected: boolean;
  }[] =
    (await db.query.availabilities.findMany({
      where: eq(availabilities.game_id, id),
      orderBy: asc(availabilities.status),
    })) || [];

  const team = await fetchTeam({ onlyActive: true });
  const unconfirmedPlayers = team.filter(
    (player) => !availabilitiesGame.some((availability) => availability.user_id === player.id)
  );

  return (
    <>
      {thisGame ? (
        <>
          <GameHeader game={thisGame} />
          <h2 className="pb-4 text-lg font-semibold text-vilvBlue">Gegevens</h2>
          <div className="grid grid-cols-[max-content_1fr] gap-2 pb-4">
            <p className="font-semibold">Datum</p>
            <p>{thisGame?.date.split('-').reverse().join('-')}</p>
            <p className="font-semibold">Uur</p>
            <p>{thisGame?.time.slice(0, 5)}</p>
            <p className="font-semibold">Thuisploeg</p>
            <p>{thisGame?.home_team}</p>
            <p className="font-semibold">Uitploeg</p>
            <p>{thisGame?.away_team}</p>
            <p className="font-semibold">Type wedstrijd</p>
            <p>{thisGame?.type}</p>
          </div>
          <h2 className="pb-4 text-lg font-semibold text-vilvBlue">Selectie</h2>
          {availabilitiesGame.length === 0 ? (
            <p>Er zijn nog geen spelers ingeschreven voor deze wedstrijd</p>
          ) : (
            <SelectionTable availabilities={availabilitiesGame} isAdmin={isAdmin} />
          )}
          <UnconfirmedTable players={unconfirmedPlayers} />
        </>
      ) : (
        <div>
          <h1>Invalid Game ID</h1>
          <p>The provided game ID is not valid.</p>
        </div>
      )}
    </>
  );
}
