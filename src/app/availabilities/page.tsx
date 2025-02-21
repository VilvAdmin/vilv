import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import dummydata from 'data-input.json'


export default async function Availabilities() {
  return (
    <>
    <h1 className="text-vilvBlue text-xl font-semibold pb-4">Inschrijven op wedstrijden</h1>
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
        {dummydata.data.teamCalendar?.map((game) => (
        <TableRow key={game.id}>
          <TableCell>{game.startTime.slice(0,10)}</TableCell>
          <TableCell>{game.startTime.slice(11,16)}</TableCell>
          <TableCell>{game.homeTeam.name}</TableCell>
          <TableCell>{game.awayTeam.name}</TableCell>
          <TableCell>Competitie</TableCell>
          <TableCell></TableCell>
          <TableCell><button>edit</button></TableCell>
        </TableRow>))}
      </TableBody>
    </Table>
    </>
  );
}