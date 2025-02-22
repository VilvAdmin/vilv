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

type Game = {
    date: Date;
    time: string;
    home_team: string;
    away_team: string;
    type: 'Competitie' | 'Beker' | 'Vriendschappelijk';
  };

export default function GameForm() {
  const form = useForm<Game>({
    defaultValues: {
      date: new Date(),
      time: "",
      home_team: "",
      away_team: "",
      type: "Competitie",
    },
  })

  const onSubmit = async (data: any) => {
    console.log(data)
    try {
        const res = await fetch('/api/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
  
        const responseData = await res.json();
  
        if (!res.ok) throw new Error(responseData.error || 'Failed to add game');
  
        form.reset();
      } catch (err: any) {
        console.error('Failed to add game', err);
      }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Datum</FormLabel>
                <Popover>
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
                      onSelect={field.onChange}
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
            name="home_team"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thuisploeg</FormLabel>
                <FormControl>
                  <Input placeholder="Vul thuisploeg in" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="away_team"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Uitploeg</FormLabel>
                <FormControl>
                  <Input type="away_team" placeholder="Vul uitploeg in" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type wedstrijd</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Type wedstrijd" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Competitie">Competitie</SelectItem>
                    <SelectItem value="Beker">Beker</SelectItem>
                    <SelectItem value="Vriendschappelijk">Vriendschappelijk</SelectItem>
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

