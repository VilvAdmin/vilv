import { db } from '~/server/db';
import { asc, eq, and } from 'drizzle-orm';
import { availabilities, trainings } from '~/server/db/schema';
import { auth } from '@clerk/nextjs/server';
import TrainingsTable from './TrainingsTable';
import { redirect } from 'next/navigation';

export default async function Trainings() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const allTrainings = await db
    .select({ trainings, status: availabilities.status })
    .from(trainings)
    .leftJoin(
      availabilities,
      and(eq(trainings.id, availabilities.game_id), eq(availabilities.user_id, userId))
    )
    .orderBy(asc(trainings.date));

  return <TrainingsTable trainings={allTrainings} />;
}
