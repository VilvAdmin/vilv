import { db } from '~/server/db';
import { asc, eq, and, sql } from 'drizzle-orm';
import { availabilities, trainings } from '~/server/db/schema';
import { auth } from '@clerk/nextjs/server';
import TrainingsTable from './TrainingsTable';
import { redirect } from 'next/navigation';

export default async function Trainings() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const playersSubquery = db
    .select({
      game_id: availabilities.game_id,
      players: sql<number>`count(*)`.mapWith(Number).as('players'),
    })
    .from(availabilities)
    .where(eq(availabilities.status, 'Beschikbaar'))
    .groupBy(availabilities.game_id)
    .as('players_count');

  const allTrainings = await db
    .select({ trainings, status: availabilities.status, players: playersSubquery.players })
    .from(trainings)
    .leftJoin(
      availabilities,
      and(eq(trainings.id, availabilities.game_id), eq(availabilities.user_id, userId))
    )
    .leftJoin(playersSubquery, and(eq(trainings.id, playersSubquery.game_id)))
    .orderBy(asc(trainings.date));

  return <TrainingsTable trainings={allTrainings} />;
}
