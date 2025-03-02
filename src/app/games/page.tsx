import { db } from "~/server/db";
import { asc, eq, and } from 'drizzle-orm';
import { availabilities, games } from "~/server/db/schema";
import { auth } from '@clerk/nextjs/server'
import GamesHeader from "./GamesHeader";
import GamesTable from "./GamesTable";
import { redirect } from "next/navigation";
//import dummydata from 'data-input.json'



export default async function Games() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/');
  }

  const allGames = await db.select({games, status: availabilities.status}).from(games).leftJoin(availabilities, and(eq(games.id, availabilities.game_id), eq(availabilities.user_id, userId))).orderBy(asc(games.date));

  return (
    <>
    
    <GamesHeader games={allGames} />
    <GamesTable games={allGames} />
    </>
  );
}
