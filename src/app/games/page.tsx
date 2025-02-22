import { db } from "~/server/db";
import { asc, eq, and } from 'drizzle-orm';
import { availabilities, games } from "~/server/db/schema";
import AddGameButton from "./addGameButton";
import GamesTable from "./GamesTable";
//import dummydata from 'data-input.json'



export default async function Games() {
  const userId = "1";
  
  const allGames = await db.select({games, status: availabilities.status}).from(games).leftJoin(availabilities, and(eq(games.id, availabilities.game_id), eq(availabilities.user_id, userId))).orderBy(asc(games.date));

  return (
    <>
    
    <AddGameButton />
    <GamesTable games={allGames} />
    </>
  );
}
