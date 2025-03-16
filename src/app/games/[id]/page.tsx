import { eq } from "drizzle-orm";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table";
import { db } from "~/server/db";
import { availabilities, games } from "~/server/db/schema";
import GameHeader from "./GameHeader";
import { Game } from "~/types";
import { validate as isUuid } from 'uuid';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UnconfirmedTable from "./UnconfirmedTable";
import fetchTeam from "~/lib/fetchTeam";
import { only } from "node:test";

interface GameProps {
  params: Promise<{ id: string }>;
}

export default async function Games({ params }: GameProps) {
  const { id } = await params;
  const { userId } = await auth()

  if (!userId) {
    redirect('/');
  }
  
  if (!isUuid(id)) {
    return (
      <div>
        <h1>Invalid Game ID</h1>
        <p>The provided game ID is not valid.</p>
      </div>
    );
  }

  const thisGame: Game | undefined = await db.query.games.findFirst({
    where: eq(games.id, id)
  })

  const availabilitiesGame: { id: string; status: "Beschikbaar" | "Niet beschikbaar" | "Geblesseerd" | null; game_id: string; user_id: string, player_name: string; }[] = await db.query.availabilities.findMany({
    where: eq(availabilities.game_id, id)
  }) || [];

  const team = await fetchTeam({ onlyActive: true });
  const unconfirmedPlayers = team.filter(player => !availabilitiesGame.some(availability => availability.user_id === player.id));

  return (
    <>
    {thisGame ? (<>
    <GameHeader game={thisGame} />
    <h2 className="text-vilvBlue text-lg font-semibold pb-4">Gegevens</h2>
    <div className="grid grid-cols-[max-content_1fr] gap-2 pb-4">
      <p className="font-semibold">Datum</p><p>{thisGame?.date}</p>
      <p className="font-semibold">Uur</p><p>{thisGame?.time.slice(0,5)}</p>
      <p className="font-semibold">Thuisploeg</p><p>{thisGame?.home_team}</p>
      <p className="font-semibold">Uitploeg</p><p>{thisGame?.away_team}</p>
      <p className="font-semibold">Type wedstrijd</p><p>{thisGame?.type}</p>
    </div>
    <h2 className="text-vilvBlue text-lg font-semibold pb-4">Selectie</h2>
    {availabilitiesGame.length === 0 ? (<p>Er zijn nog geen spelers ingeschreven voor deze wedstrijd</p>) : (
    <Table className="mb-4">
    <TableHeader>
      <TableRow>
        <TableHead className="text-vilvBlue">Speler</TableHead>
        <TableHead className="text-vilvBlue">Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {availabilitiesGame?.map((player) => (
      <TableRow key={player.id}>
        <TableCell>{player.player_name}</TableCell>
        <TableCell>{player.status}</TableCell>
      </TableRow>))}
    </TableBody>
    </Table>)}
    <UnconfirmedTable players={unconfirmedPlayers} />
    </>
    ) : (
    <div>
    <h1>Invalid Game ID</h1>
    <p>The provided game ID is not valid.</p>
    </div>)}
    </>
  );
}