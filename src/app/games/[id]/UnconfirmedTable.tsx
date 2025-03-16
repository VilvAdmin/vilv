"use client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table";
import { useRouter } from "next/navigation";
import { Player } from "~/types";

export default function UnconfirmedTable({ players }: { players: Player[] }) {
    const router = useRouter();

    return (
        <>
        {players.length === 0 ? (<></>) : (<>
        <h2 className="text-vilvBlue text-lg font-semibold pb-4">Nog niet gereageerd</h2>
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-vilvBlue">Speler</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {players?.map((player) => (
            <TableRow key={player.id}>
            <TableCell>{player.fullName}</TableCell>
            </TableRow>))}
        </TableBody>
        </Table></>)}
        </>
    );
  }