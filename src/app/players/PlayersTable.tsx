"use client";

import { User } from "@clerk/nextjs/server";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table";
import { Player } from "~/types";

export default function PlayersTable({ players }: { players: Player[] }) {


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-vilvBlue">Naam</TableHead>
          <TableHead className="text-vilvBlue">Email</TableHead>
          <TableHead className="text-vilvBlue">Rol</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players?.map((player) => (
        <TableRow key={player.id}>
          <TableCell>{player.fullName}</TableCell>
          <TableCell>{player.primaryEmailAddress}</TableCell>
          <TableCell>{player.roles}</TableCell>
        </TableRow>))}
      </TableBody>
    </Table>
  );
  }