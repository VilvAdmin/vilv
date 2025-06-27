'use client';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import { z } from 'zod';

const AddGuestPlayerSchema = z.object({
  guestPlayer: z.string().min(2, 'Gastspeler moet minstens 2 karakters bevatten'),
});

type AddGuestPlayerForm = z.infer<typeof AddGuestPlayerSchema>;

interface PlayerFormProps {
  training_id: string;
  onSuccess: () => void;
}

export default function GuestPlayerForm({ training_id, onSuccess }: PlayerFormProps) {
  const form = useForm<AddGuestPlayerForm>({
    resolver: zodResolver(AddGuestPlayerSchema),
    defaultValues: {
      guestPlayer: '',
    },
  });

  interface ApiError {
    error: string;
    status: number;
  }

  interface ApiResponse {
    message: string;
    availability: AddGuestPlayerForm;
  }

  const onSubmit = async (data: AddGuestPlayerForm) => {
    const addGuestPlayerError = (message: string) => toast('Error: ' + message, { type: 'error' });

    try {
      const payload = {
        game_id: training_id,
        status: 'Beschikbaar',
        player_name: data.guestPlayer,
        guest_player: true,
      };
      const res = await fetch('/api/availabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseData = (await res.json()) as ApiResponse | ApiError;

      if (!res.ok)
        throw new Error(
          'error' in responseData ? responseData.error : 'Failed to add guest player'
        );

      onSuccess();
      form.reset();
    } catch (error: unknown) {
      addGuestPlayerError(error instanceof Error ? error.message : 'Failed to add guest player');
      console.error('Failed to add guest player:', error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="guestPlayer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gastspeler</FormLabel>
                <FormControl>
                  <Input placeholder="Gastspeler" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full rounded-md bg-vilvGreen p-2 text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Bezig ...' : 'Toevoegen'}
          </Button>
        </form>
      </Form>
      <ToastContainer />
    </div>
  );
}
