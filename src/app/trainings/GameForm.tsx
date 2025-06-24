"use client"
import { CalendarIcon, Clock } from "lucide-react"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { useForm } from "react-hook-form"
import { useState } from "react"

export type GameForm = {
  date: Date;
  time: string;
  pitch: 'Sportkot Piste' | 'Sportkot Alma 3' | 'Bouwdewijnstadion' | 'Jeugdvoetbalcentrum';
  players: string;
  season: string;
};

interface GameFormProps {
  game?: GameForm;
  onSuccess: () => void;
  method: 'POST' | 'PATCH';
  game_id?: string;
}

export default function GameForm({ game, onSuccess, method, game_id }: GameFormProps) {
  const [dateOpen, setDateOpen] = useState(false);
  const date = new Date();
  const form = useForm<GameForm>({
    defaultValues: {
      date: game?.date ?? date,
      time: game?.time ?? "",
      players: game?.players ?? "To be determined", // Function to count the available players still needs to be implemented
      pitch: game?.pitch ?? "Sportkot Piste",
      season: game?.season ?? date.getMonth() < 5 ? `${date.getFullYear() - 1}-${date.getFullYear()}` : `${date.getFullYear()}-${date.getFullYear() + 1}`, // start showing new season in June
    },
  })

  interface ApiError {
    error: string;
    status: number;
  }

  interface ApiResponse {
    message: string;
    game: GameForm;
  }

  const onSubmit = async (data: GameForm) => {
    const endpoint = method === 'POST'
      ? '/api/games'
      : `/api/games/${game_id}`;
    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([data]),
      });

      const responseData = await res.json() as ApiResponse | ApiError;

      if (!res.ok) throw new Error('error' in responseData ? responseData.error : 'Failed to add game');

      onSuccess();
      form.reset();
    } catch (error: unknown) {
      console.error('Failed to add game:', error);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="season"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seizoen</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Datum</FormLabel>
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? field.value.toLocaleDateString() : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => { field.onChange(date); setDateOpen(false) }}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Uur</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type="time" placeholder="Select time" {...field} className="pl-10" />
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pitch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Veld</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Veld" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Sportkot Piste">Sportkot Piste</SelectItem>
                    <SelectItem value="Sportkot Alma 3">Sportkot Alma 3</SelectItem>
                    <SelectItem value="Bouwdewijnstadion">Bouwdewijnstadion</SelectItem>
                    <SelectItem value="Jeugdvoetbalcentrum">Jeugdvoetbalcentrum</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-vilvGreen text-white p-2 rounded-md">
            Opslaan
          </Button>
        </form>
      </Form>
    </div>
  )
}

