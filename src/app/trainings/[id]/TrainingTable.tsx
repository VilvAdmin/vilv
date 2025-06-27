'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { availabilitiesTrainingType } from './page';
import { useUser } from '@clerk/nextjs';
import { Trash2 } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useRouter } from 'next/navigation';

export default function TrainingTable({
  availabilitiesTraining,
}: {
  availabilitiesTraining: availabilitiesTrainingType[];
}) {
  const { user } = useUser();
  const router = useRouter();
  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes('admin');

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, playerId: string) => {
    e.preventDefault();

    if (!playerId) return;

    const payload = { availability_id: playerId };

    try {
      const res = await fetch(`/api/availabilities`, {
        method: 'DELETE',
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.refresh();
      } else {
        console.error('Failed to delete guest player:', res.statusText);
      }
    } catch (error) {
      console.error('Failed to delete guest player:', error);
    }
  };
  return (
    <Table className="mb-4">
      <TableHeader>
        <TableRow>
          {isAdmin && <TableHead className="w-1 whitespace-nowrap"></TableHead>}
          <TableHead className="text-vilvBlue">Speler</TableHead>
          <TableHead className="text-vilvBlue">{`Status (${availabilitiesTraining.filter((a) => a.status === 'Beschikbaar').length})`}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {availabilitiesTraining?.map((player, idx) => (
          <TableRow key={player.id}>
            {isAdmin &&
              (player.user_id == 'GUEST' ? (
                <TableCell className="w-1 whitespace-nowrap">
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={(e) => handleDelete(e, player.id)}
                  >
                    <span className="sr-only">Delete guest player</span>
                    <Trash2 />
                  </Button>
                </TableCell>
              ) : (
                <TableCell></TableCell>
              ))}
            <TableCell>{player.player_name}</TableCell>
            <TableCell>{player.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
