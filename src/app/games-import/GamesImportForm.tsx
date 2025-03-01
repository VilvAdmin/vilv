"use client";

import { Input } from "~/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table";
import TypeSelect from "./TypeSelect";
import { Game, GameImport } from "~/types";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

export default function GamesImportForm({ data }: { data: GameImport[] }) {
    const defaultGames: { date: string; time: string; home_team: string; away_team: string; type: "Beker" | "Vriendschappelijk" | "Competitie" }[] = data.map(game => ({
      date: format(new Date(game.startTime), 'yyyy-MM-dd'),
      time: game.startTime.slice(11, 16),
      home_team: game.homeTeam.name,
      away_team: game.awayTeam.name,
      type: game.series.name.includes("Beker") ? "Beker" : 
            game.series.name === "Recrea" ? "Vriendschappelijk" : "Competitie"
    }));

    const form = useForm<{ games: Game[] }>({
      defaultValues: {
        games: defaultGames
      }
    });

    const onSubmit = async ({ games }: { games: Game[] }) => {
      try {
        const res = await fetch('/api/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(games),
        });
  
        const responseData = await res.json();
  
        if (!res.ok) throw new Error('error' in responseData ? responseData.error : 'Failed to add game');
  
        form.reset();
      } catch (error: unknown) {
        console.error('Failed to add game:', error);
      }
    }

    return (
      <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-vilvBlue text-xl font-semibold pb-4">Inschrijven op wedstrijden</h1>
        <button type="submit" className="bg-vilvGreen text-white p-2 rounded">Importeer</button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-vilvBlue">Datum</TableHead>
            <TableHead className="text-vilvBlue">Uur</TableHead>
            <TableHead className="text-vilvBlue">Thuisploeg</TableHead>
            <TableHead className="text-vilvBlue">Uitploeg</TableHead>
            <TableHead className="text-vilvBlue">Type wedstrijd</TableHead>
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
                  onChange={(value: "Beker" | "Vriendschappelijk" | "Competitie") => 
                    form.setValue(`games.${index}.type` as const, value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </form>
      </>

    );
  }