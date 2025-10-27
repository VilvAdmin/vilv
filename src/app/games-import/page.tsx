import type { GameImport } from '~/types';
import GamesImportForm from './GamesImportForm';
import { fetchTeamCalendar } from '~/lib/fetchTeamCalendar';

export default async function AddBulk() {
  const vilvId = '7669';
  const data: GameImport[] = await fetchTeamCalendar(vilvId);

  if (data.length === 0) {
    return <h1>Geen wedstrijden gevonden</h1>;
  }
  return <GamesImportForm data={data} />;
}
