"use client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table";
import type { Player } from "~/types";

export default function UnconfirmedTable({ players }: { players: Player[] }) {
    const handleClick = async () => {
        try {
            const res = await fetch(`/api/reminder-mail/`, {
                method: 'POST',
            });

            if (res.ok) {
                return
            } else {
                console.error('Failed to delete game:', res.statusText);
            }

        } catch (error: unknown) {
            console.error('Failed to delete game:', error);
        }
    }
    return (
        players.length === 0 ? (<></>) : (<>
            <div className="flex justify-between items-center">
                <h2 className="text-vilvBlue text-lg font-semibold pb-4">Nog niet gereageerd</h2>
                <button className="bg-vilvGreen text-white p-2 rounded-md" onClick={handleClick}>Stuur herinnering</button>
            </div>
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
            </Table></>)
    );
}