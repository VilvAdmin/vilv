"use client";

import { Input } from "~/components/ui/input";
import { TableCell, TableRow } from "~/components/ui/table";
import TypeSelect from "./TypeSelect";

interface GameImportRowProps {
  id: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  type: string;
}

export default function GameImportRow({ id, date, time, homeTeam, awayTeam, type }: GameImportRowProps) {
  return (
    <TableRow key={id}>
      <TableCell>{date}</TableCell>
      <TableCell>{time}</TableCell>
      <TableCell><Input defaultValue={homeTeam} /></TableCell>
      <TableCell><Input defaultValue={awayTeam} /></TableCell>
      <TableCell><TypeSelect status={type} /></TableCell>
    </TableRow>
  );
}
