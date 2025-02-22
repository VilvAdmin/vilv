import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/server/db";
import { games } from "@/server/db/schema";
import dummydata from 'data-input.json'


export default async function Availabilities() {
  const allGames = await db.select().from(games);

  return (
    <>
    <div className="flex justify-between items-center pb-4">
      <h1 className="text-vilvBlue text-xl font-semibold pb-4">Inschrijven op wedstrijden</h1>
      <button className="bg-vilvGreen text-white p-2 rounded-md">Wedstrijd toevoegen</button>
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
          <TableCell>{game.hour}</TableCell>
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