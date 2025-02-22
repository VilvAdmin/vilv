import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { db } from "~/server/db";
import { asc, eq } from 'drizzle-orm';
import { availabilities, games } from "~/server/db/schema";
import AddGameButton from "./addGameButton";
import { Game } from "~/types";
// import { useUser } from "@clerk/nextjs";
//import dummydata from 'data-input.json'



export default async function Games() {
  // const { user } = useUser();
  const allGames = await db.query.games.findMany(
    { orderBy: [asc(games.date)] }
  ) as Game[];

  // const allAvailabilities = await db.query.availabilities.findMany({
  //   where: eq(availabilities.user_id, user?.id)
  // })

  return (
    <>
    <AddGameButton />
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-vilvBlue">Datum</TableHead>
          <TableHead className="text-vilvBlue">Uur</TableHead>
          <TableHead className="text-vilvBlue">Thuisploeg</TableHead>
          <TableHead className="text-vilvBlue">Uitploeg</TableHead>
          <TableHead className="text-vilvBlue">Type wedstrijd</TableHead>
          <TableHead className="text-vilvBlue">Status</TableHead>
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
        </TableRow>))}
      </TableBody>
    </Table>
    </>
  );
}