import { eq } from "drizzle-orm";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table";
import { db } from "~/server/db";
import { availabilities, games } from "~/server/db/schema";
import EditGameButton from "./editGameButton";

interface GameProps {
  params: Promise<{ id: string }>;
}


export default async function Games({ params }: GameProps) {
    const { id } = await params;

     const thisGame = await db.query.games.findFirst({
        where: eq(games.id, id)
     })

     const availabilitiesGame: { id: string; status: "Beschikbaar" | "Niet beschikbaar" | "Geblesseerd" | null; game_id: string; user_id: string; }[] = await db.query.availabilities.findMany({
        where: eq(availabilities.game_id, id)
     }) || [];
  
    return (
      <>
      <EditGameButton />
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
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-vilvBlue">Speler</TableHead>
          <TableHead className="text-vilvBlue">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {availabilitiesGame?.map((player) => (
        <TableRow key={player.id}>
          <TableCell>{player.user_id}</TableCell>
          <TableCell>{player.status}</TableCell>
        </TableRow>))}
      </TableBody>
      </Table>)}
      </>
    );
  }