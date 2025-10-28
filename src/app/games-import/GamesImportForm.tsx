'use client';

import { Input } from '~/components/ui/input';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '~/components/ui/table';
import TypeSelect from './TypeSelect';
import type { Game, GameImport } from '~/types';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GamesImportForm({ data }: { data: GameImport[] }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const defaultGames: {
    date: string;
    time: string;
    home_team: string;
    away_team: string;
    type: 'Beker' | 'Vriendschappelijk' | 'Competitie';
    season: string;
  }[] = data.map((game) => ({
    date: format(new Date(game.startTime), 'yyyy-MM-dd'),
    time: game.startTime.slice(11, 16),
    home_team: game.homeTeam.name,
    away_team: game.awayTeam.name,
    type: game.eventType.includes('cup')
      ? 'Beker'
      : game.eventType === 'championship'
        ? 'Competitie'
        : 'Vriendschappelijk',
    season:
      new Date(game.startTime).getMonth() < 7
        ? `${new Date(game.startTime).getFullYear() - 1}-${new Date(game.startTime).getFullYear()}`
        : `${new Date(game.startTime).getFullYear()}-${new Date(game.startTime).getFullYear() + 1}`,
  }));

  const form = useForm<{ games: Game[] }>({
    defaultValues: {
      games: defaultGames,
    },
  });

  const onSubmit = async ({ games }: { games: Game[] }) => {
    setLoading(true);
    try {
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(games),
      });
      form.reset();
      setLoading(false);
      router.push('/games');
    } catch (error: unknown) {
      console.error('Failed to add game:', error);
    }
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between pb-4">
          <h1 className="pb-4 text-xl font-semibold text-vilvBlue">
            Wedstrijden importeren van Voetbal Vlaanderen
          </h1>

          <Dialog>
            <DialogTrigger asChild>
              <button className="rounded-md bg-vilvGreen p-2 text-white">Importeer</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-vilvBlue">Wedstrijden importeren</DialogTitle>
              </DialogHeader>
              <p>
                Weet je zeker dat je al deze wedstrijden wilt importeren? We kunnen dit niet
                ongedaan maken.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="rounded-md bg-vilvGreen p-2 text-white"
                  type="submit"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={loading}
                >
                  Importeren
                </button>
                <DialogClose asChild>
                  <button className="rounded-md bg-vilvRed p-2 text-white" disabled={loading}>
                    Annuleer
                  </button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>

          {/* <button type="submit" className="rounded bg-vilvGreen p-2 text-white">
            Importeer
          </button> */}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-vilvBlue">Datum</TableHead>
              <TableHead className="text-vilvBlue">Uur</TableHead>
              <TableHead className="text-vilvBlue">Thuisploeg</TableHead>
              <TableHead className="text-vilvBlue">Uitploeg</TableHead>
              <TableHead className="text-vilvBlue">Type wedstrijd</TableHead>
              <TableHead className="text-vilvBlue">Seizoen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {defaultGames.map((game, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    type="date"
                    {...form.register(`games.${index}.date` as const)}
                    defaultValue={format(game.date, 'yyyy-MM-dd')}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="time"
                    {...form.register(`games.${index}.time` as const)}
                    defaultValue={game.time}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    {...form.register(`games.${index}.home_team` as const)}
                    defaultValue={game.home_team}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    {...form.register(`games.${index}.away_team` as const)}
                    defaultValue={game.away_team}
                  />
                </TableCell>
                <TableCell>
                  <TypeSelect
                    status={form.watch(`games.${index}.type`)}
                    onChange={(value: 'Beker' | 'Vriendschappelijk' | 'Competitie') =>
                      form.setValue(`games.${index}.type` as const, value)
                    }
                  />
                </TableCell>
                <TableCell className="w-[8rem]">
                  <Input {...form.register(`games.${index}.season`)} defaultValue={game.season} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </form>
    </>
  );
}
