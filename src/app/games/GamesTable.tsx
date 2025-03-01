"use client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table";
import { MyGame } from "~/types";
import StatusSelect from "./StatusSelect";
import { useRouter } from "next/navigation";

export default function GamesTable( { games }: { games: MyGame[] }) {
    const router = useRouter();

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
          <TableRow key={game.games.id} onClick={() =>  router.push(`/games/${game.games.id}`)}>
            <TableCell>{game.games.date}</TableCell>
            <TableCell>{game.games.time.slice(0,5)}</TableCell>
            <TableCell>{game.games.home_team}</TableCell>
            <TableCell>{game.games.away_team}</TableCell>
            <TableCell>{game.games.type}</TableCell>
            <TableCell><StatusSelect status={game.status} game_id={game.games.id}/></TableCell>
          </TableRow>))}
        </TableBody>
      </Table>
    );
  }