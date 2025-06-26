'use client';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '~/components/ui/table';
import type { MyGame } from '~/types';
import StatusSelect from './StatusSelect';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SeasonSelector } from '../_components/SeasonSelector';
import { generateICS } from '~/lib/utils';
import { useUser } from '@clerk/nextjs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import GameForm from './GameForm';

export default function GamesTable({ games }: { games: MyGame[] }) {
  const router = useRouter();
  const [selectedSeason, setSelectedSeason] = useState('2025-2026');
  const [displayedGames, setDisplayedGames] = useState(
    games?.filter((game) => game.games.season === selectedSeason)
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useUser();

  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes('admin');

  const handleSuccess = () => {
    setDialogOpen(false);
    router.refresh();
  };

  useEffect(() => {
    setDisplayedGames(games?.filter((game) => game.games.season === selectedSeason));
  }, [selectedSeason, games]);

  const handleExport = () => {
    try {
      const icsContent = generateICS(displayedGames);
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });

      // For modern browsers
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      // Set up link properties
      link.href = url;
      link.download = 'vilv-games.ics';
      link.style.display = 'none';

      // For iOS Safari
      if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      document.body.appendChild(link);

      // Trigger click and cleanup
      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 0);
    } catch (error) {
      console.error('Error exporting calendar:', error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <div className="flex gap-4">
          <h1 className="pb-4 text-xl font-semibold text-vilvBlue">Inschrijven op wedstrijden</h1>
          <SeasonSelector selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} />
        </div>

        <div className="flex space-x-4">
          <button onClick={handleExport} className="rounded-md bg-vilvBlue p-2 text-white">
            Export
          </button>
          {isAdmin && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <button className="rounded-md bg-vilvGreen p-2 text-white">
                  Wedstrijd toevoegen
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-vilvBlue">Wedstrijd toevoegen</DialogTitle>
                </DialogHeader>
                <GameForm onSuccess={handleSuccess} method="POST" />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {displayedGames?.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-vilvBlue">Datum</TableHead>
              <TableHead className="text-vilvBlue">Uur</TableHead>
              <TableHead className="text-vilvBlue">Thuisploeg</TableHead>
              <TableHead className="text-vilvBlue">Uitploeg</TableHead>
              <TableHead className="hidden text-vilvBlue md:table-cell">Type wedstrijd</TableHead>
              <TableHead className="text-vilvBlue">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedGames?.map((game) => (
              <TableRow key={game.games.id}>
                <TableCell onClick={() => router.push(`/games/${game.games.id}`)}>
                  {game.games.date.split('-').reverse().join('-')}
                </TableCell>
                <TableCell onClick={() => router.push(`/games/${game.games.id}`)}>
                  {game.games.time.slice(0, 5)}
                </TableCell>
                <TableCell onClick={() => router.push(`/games/${game.games.id}`)}>
                  {game.games.home_team}
                </TableCell>
                <TableCell onClick={() => router.push(`/games/${game.games.id}`)}>
                  {game.games.away_team}
                </TableCell>
                <TableCell
                  className="hidden md:table-cell"
                  onClick={() => router.push(`/games/${game.games.id}`)}
                >
                  {game.games.type}
                </TableCell>
                <TableCell>
                  <StatusSelect status={game.status} game_id={game.games.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Er zijn nog geen wedstrijden voor dit seizoen.</p>
      )}
    </>
  );
}
