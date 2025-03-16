"use client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table";
import type { Player } from "~/types";
import ActiveSelect from "./ActiveSelect";

export default function PlayersTable({ players }: { players: Player[] }) {


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-vilvBlue">Naam</TableHead>
          <TableHead className="text-vilvBlue">Email</TableHead>
          <TableHead className="text-vilvBlue">Rol</TableHead>
          <TableHead className="text-vilvBlue">Actief</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players?.map((player) => (
        <TableRow key={player.id}>
          <TableCell>{player.fullName}</TableCell>
          <TableCell>{player.primaryEmailAddress}</TableCell>
          <TableCell>{player.roles}</TableCell>
          <TableCell><ActiveSelect active={player.active} user_id={player.id}/></TableCell>
        </TableRow>))}
      </TableBody>
    </Table>
  );
  }