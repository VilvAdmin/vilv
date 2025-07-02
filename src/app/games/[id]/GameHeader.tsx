'use client';
import { useUser } from '@clerk/nextjs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import GameForm from '../GameForm';
import type { Game } from '~/types';
import { useRouter } from 'next/navigation';
import { DialogClose } from '@radix-ui/react-dialog';
import { useState } from 'react';

interface GameHeaderProps {
  game: Game;
}

export default function GameHeader({ game }: GameHeaderProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes('admin');

  const deleteGame = async () => {
    try {
      const res = await fetch(`/api/games/${game.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/games');
      } else {
        console.error('Failed to delete game:', res.statusText);
      }
    } catch (error: unknown) {
      console.error('Failed to delete game:', error);
    }
  };

  const handleSuccess = () => {
    setDialogOpen(false);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="pb-4 text-xl font-semibold text-vilvBlue">Wedstrijddetails</h1>

      {isAdmin && (
        <div className="flex space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="rounded-md bg-vilvRed p-2 text-white">Verwijderen</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-vilvBlue">Wedstrijd verwijderen</DialogTitle>
              </DialogHeader>
              <p>
                Weet je zeker dat je deze wedstrijd wil verwijderen? We kunnen dit niet ongedaan
                maken.
              </p>
              <div className="flex justify-end space-x-4">
                <button className="rounded-md bg-vilvRed p-2 text-white" onClick={deleteGame}>
                  Verwijder
                </button>
                <DialogClose asChild>
                  <button className="rounded-md bg-vilvGreen p-2 text-white">Annuleer</button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button className="rounded-md bg-vilvGreen p-2 text-white">Aanpassen</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-vilvBlue">Wedstrijd aanpassen</DialogTitle>
              </DialogHeader>
              <GameForm
                game={{ ...game, date: new Date(game.date).toLocaleDateString('nl-BE') }}
                onSuccess={handleSuccess}
                method="PATCH"
                game_id={game.id}
              />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
