import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { db } from "~/server/db";
import { asc, eq } from 'drizzle-orm';
import { availabilities, games } from "~/server/db/schema";
import AddGameButton from "./addGameButton";
import { Game } from "~/types";
import GamesTable from "./GamesTable";
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
    <GamesTable games={allGames} />
    </>
  );
}