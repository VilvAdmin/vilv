"use client";
import { useUser } from "@clerk/nextjs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table";
import type { Player } from "~/types";

export default function UnconfirmedTable({ players }: { players: Player[] }) {
    const { user } = useUser();

    const userRoles = user?.publicMetadata?.roles as string[] | undefined;
    const isAdmin = userRoles?.includes("admin");

    const handleClick = async () => {
        try {
            const res = await fetch(`/api/reminder-mail/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(players.filter(player => player.primaryEmailAddress !== "N/A").map(player => player.primaryEmailAddress)),
            });

            if (res.ok) {
                return
            } else {
                console.error('Failed to send reminder mails:', res.statusText);
            }

        } catch (error: unknown) {
            console.error('Failed to send reminder mails:', error);
        }
    }
    return (
        players.length === 0 ? (<></>) : (<>
            <div className="flex justify-between items-center">
                <h2 className="text-vilvBlue text-lg font-semibold pb-4">Nog niet gereageerd</h2>
                {isAdmin && <button className="bg-vilvGreen text-white p-2 rounded-md" onClick={handleClick}>Stuur herinnering</button>}
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