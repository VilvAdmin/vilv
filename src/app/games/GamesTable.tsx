"use client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table";
import { Game } from "~/types";

export default async function GamesTable({ games }: { games: Game[] }) {

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-vilvBlue">Datum</TableHead>
            <TableHead className="text-vilvBlue">Uur</TableHead>
            <TableHead className="text-vilvBlue">Thuisploeg</TableHead>
            <TableHead className="text-vilvBlue">Uitploeg</TableHead>
            <TableHead className="text-vilvBlue">Type wedstrijd</TableHead>
            <TableHead className="text-vilvBlue">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games?.map((game) => (
          <TableRow key={game.id} onClick={() => window.location.href = `/games/${game.id}`}>
            <TableCell>{game.date}</TableCell>
            <TableCell>{game.time.slice(0,5)}</TableCell>
            <TableCell>{game.home_team}</TableCell>
            <TableCell>{game.away_team}</TableCell>
            <TableCell>{game.type}</TableCell>
            <TableCell></TableCell>
          </TableRow>))}
        </TableBody>
      </Table>
    );
  }