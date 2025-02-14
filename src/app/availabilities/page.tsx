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
        <TableRow>
          <TableCell>{dummydata.data.teamCalendar[0]?.startTime.slice(0,10)}</TableCell>
          <TableCell>{dummydata.data.teamCalendar[0]?.startTime.slice(11,16)}</TableCell>
          <TableCell>{dummydata.data.teamCalendar[0]?.homeTeam.name}</TableCell>
          <TableCell>{dummydata.data.teamCalendar[0]?.awayTeam.name}</TableCell>
          <TableCell>Competitie</TableCell>
          <TableCell></TableCell>
          <TableCell>Edit</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </>
  );
}