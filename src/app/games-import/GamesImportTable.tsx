import { Table, TableHeader, TableRow, TableHead, TableBody } from "~/components/ui/table";
import GameImportRow from "./GameImportRow";

const fetchTeamCalendar = async (vilvId: string) => {
  const response = await fetch('https://datalake-prod2018.rbfa.be/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      operationName: 'GetTeamCalendar',
      variables: {
        teamId: vilvId,
        language: 'nl',
        sortByDate: 'asc'
      },
      extensions: {
        persistedQuery: {
          version: 1,
          sha256Hash: '63e80713dbe3f057aafb53348ebb61a2c52d3d6cda437d8b7e7bd78191990487'
        }
      }
    })
  });
  const data = await response.json();
  return data?.data?.teamCalendar
}

type GameImport = {
    id: string,
    startTime: string,
    channel: string,
    homeTeam: {
      id: string,
      name: string,
      clubId: string,
      logo: string,
      __typename: string,
    },
    awayTeam: {
      id: string,
      name: string,
      clubId: string,
      logo: string,
      __typename: string,
    },
    outcome: {
        status: string,
        homeTeamGoals: number,
        homeTeamPenaltiesScored: number | null,
        awayTeamGoals: number,
        awayTeamPenaltiesScored: number | null,
        subscript: null,
        __typename: string
    },
    series: {
        id: string,
        name: string,
        __typename: string
    },
    officials: [
      {
        lastName: string | null,
        firstName: string | null,
        status: string,
        personAssigned: boolean,
        __typename: string,
      }
    ],
    showScore: boolean,
    state: string,
    startDateTimeInThePassed: boolean,
    ageGroup: string,
    __typename: string,
}

export default async function GamesImportTable() {
  const vilvId = "310028"
  const data: GameImport[] = await fetchTeamCalendar(vilvId);

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-vilvBlue">Datum</TableHead>
            <TableHead className="text-vilvBlue">Uur</TableHead>
            <TableHead className="text-vilvBlue">Thuisploeg</TableHead>
            <TableHead className="text-vilvBlue">Uitploeg</TableHead>
            <TableHead className="text-vilvBlue">Type wedstrijd</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((game: GameImport) => (
            <GameImportRow 
              key={game.id} 
              id={game.id} 
              date={game.startTime.slice(0,10)}
              time={game.startTime.slice(11,16)}
              homeTeam={game.homeTeam.name}
              awayTeam={game.awayTeam.name}
              type={game.series.name.includes("Beker") ? "Beker" : game.series.name == "Recrea" ? "Vriendschappelijk" : "Competitie"}
            />
          ))}
        </TableBody>
      </Table>
    );
  }