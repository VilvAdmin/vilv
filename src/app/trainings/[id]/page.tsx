import { asc, eq } from 'drizzle-orm';
import { db } from '~/server/db';
import { availabilities, trainings } from '~/server/db/schema';
import TrainingHeader from './TrainingHeader';
import type { Training } from '~/types';
import { validate as isUuid } from 'uuid';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import UnconfirmedTable from './UnconfirmedTable';
import fetchTeam from '~/lib/fetchTeam';
import TrainingTable from './TrainingTable';

interface TrainingProps {
  params: Promise<{ id: string }>;
}

export type availabilitiesTrainingType = {
  id: string;
  status: 'Beschikbaar' | 'Niet beschikbaar' | 'Geblesseerd' | null;
  game_id: string;
  user_id: string;
  player_name: string;
};

export default async function Training({ params }: TrainingProps) {
  const { id } = await params;
  const { userId } = await auth();

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

  const thisTraining: Training | undefined = await db.query.trainings.findFirst({
    where: eq(trainings.id, id),
  });

  const availabilitiesTraining: availabilitiesTrainingType[] =
    (await db.query.availabilities.findMany({
      where: eq(availabilities.game_id, id),
      orderBy: asc(availabilities.status),
    })) || [];

  const team = await fetchTeam({ onlyActive: true });
  const unconfirmedPlayers = team.filter(
    (player) => !availabilitiesTraining.some((availability) => availability.user_id === player.id)
  );

  return (
    <>
      {thisTraining ? (
        <>
          <TrainingHeader training={thisTraining} />
          <h2 className="pb-4 text-lg font-semibold text-vilvBlue">Gegevens</h2>
          <div className="grid grid-cols-[max-content_1fr] gap-2 pb-4">
            <p className="font-semibold">Datum</p>
            <p>{thisTraining?.date}</p>
            <p className="font-semibold">Uur</p>
            <p>{thisTraining?.time.slice(0, 5)}</p>
            <p className="font-semibold">Veld</p>
            <p>{thisTraining?.pitch}</p>
            <p className="font-semibold">Aantal spelers</p>
            <p>{availabilitiesTraining.length}</p>
          </div>
          <h2 className="pb-4 text-lg font-semibold text-vilvBlue">Selectie</h2>
          {availabilitiesTraining.length === 0 ? (
            <p>Er zijn nog geen spelers ingeschreven voor deze training.</p>
          ) : (
            <TrainingTable availabilitiesTraining={availabilitiesTraining} />
          )}
          <UnconfirmedTable players={unconfirmedPlayers} />
        </>
      ) : (
        <div>
          <h1>Invalid Training ID</h1>
          <p>The provided training ID is not valid.</p>
        </div>
      )}
    </>
  );
}
