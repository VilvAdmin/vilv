import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { db } from "~/server/db";
import { asc } from 'drizzle-orm';
import { games } from "~/server/db/schema";
import AddGameButton from "./addGameButton";
//import dummydata from 'data-input.json'


export default async function Availabilities() {
  const allGames = await db.query.games.findMany(
    { orderBy: [asc(games.date)] }
  )

  return (
    <>
    <div className="flex justify-between items-center pb-4">
      <h1 className="text-vilvBlue text-xl font-semibold pb-4">Inschrijven op wedstrijden</h1>
      <AddGameButton />
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-vilvBlue">Datum</TableHead>
          <TableHead className="text-vilvBlue">Uur</TableHead>
          <TableHead className="text-vilvBlue">Thuisploeg</TableHead>
          <TableHead className="text-vilvBlue">Uitploeg</TableHead>
          <TableHead className="text-vilvBlue">Type wedstrijd</TableHead>
          <TableHead className="text-vilvBlue">Status</TableHead>
          <TableHead className="text-vilvBlue">Bewerken</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allGames?.map((game) => (
        <TableRow key={game.id}>
          <TableCell>{game.date}</TableCell>
          <TableCell>{game.time.slice(0,5)}</TableCell>
          <TableCell>{game.home_team}</TableCell>
          <TableCell>{game.away_team}</TableCell>
          <TableCell>{game.type}</TableCell>
          <TableCell></TableCell>
          <TableCell><button>edit</button></TableCell>
        </TableRow>))}
      </TableBody>
    </Table>
    </>
  );
}