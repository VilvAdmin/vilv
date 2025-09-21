'use client';
import { CalendarIcon, Clock } from 'lucide-react';

import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import type { Training } from '~/types';

type TrainingForm = Omit<Training, 'date'> & {
  date: Date;
};

interface TrainingFormProps {
  training?: TrainingForm;
  onSuccess: () => void;
  method: 'POST' | 'PATCH';
  training_id?: string;
}

export default function TrainingForm({
  training,
  onSuccess,
  method,
  training_id,
}: TrainingFormProps) {
  const [dateOpen, setDateOpen] = useState(false);
  const date = new Date();
  const form = useForm<TrainingForm>({
    defaultValues: {
      date: training?.date ?? date,
      time: training?.time ?? '',
      pitch: training?.pitch ?? 'Sportkot Piste',
      season:
        training?.season ??
        (date.getMonth() < 5
          ? `${date.getFullYear() - 1}-${date.getFullYear()}`
          : `${date.getFullYear()}-${date.getFullYear() + 1}`), // start showing new season in June
    },
  });

  interface ApiError {
    error: string;
    status: number;
  }

  interface ApiResponse {
    message: string;
    training: TrainingForm;
  }

  const onSubmit = async (data: TrainingForm) => {
    const endpoint = method === 'POST' ? '/api/trainings' : `/api/trainings/${training_id}`;
    const payload = { ...data, date: data.date.toDateString() };

    try {
      console.log('Submitting training data:', data);
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([payload]),
      });

      const responseData = (await res.json()) as ApiResponse | ApiError;

      if (!res.ok)
        throw new Error('error' in responseData ? responseData.error : 'Failed to add training');

      onSuccess();
      form.reset();
    } catch (error: unknown) {
      console.error('Failed to add training:', error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-6">
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
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
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
                      onSelect={(date) => {
                        field.onChange(date);
                        setDateOpen(false);
                      }}
                      disabled={(date) => date < new Date('1900-01-01')}
                      initialFocus
                      weekStartsOn={1} // This line should start the calendar view on Monday
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

          <Button type="submit" className="w-full rounded-md bg-vilvGreen p-2 text-white">
            Opslaan
          </Button>
        </form>
      </Form>
    </div>
  );
}
