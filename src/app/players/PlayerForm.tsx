"use client"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ToastContainer, toast } from 'react-toastify';
import { z } from "zod"
import { Checkbox } from "~/components/ui/checkbox"
import { useEffect } from "react"

const userSchema = z.object({
  firstName: z.string().min(2, "Voornaam moet minstens 2 karakters bevatten"),
  lastName: z.string().min(2, "Voornaam moet minstens 2 karakters bevatten"),
  emailAddress: z.string().email("Ongeldig emailadres"),
  username: z.string().min(3, "Gebruikersnaam moet minstens 3 karakters bevatten"),
  publicMetadata: z.object({
    roles: z.array(z.string()).optional(),
    active: z.boolean().optional().default(true),
  }),
});

const createUserSchema = userSchema.extend({
  password: z.string().min(8, "Wachtwoord moet minstens 8 karakters bevatten")
})

const updateUserSchema = userSchema;

type CreatePlayerForm = z.infer<typeof createUserSchema>;
export type UpdatePlayerForm = z.infer<typeof updateUserSchema>;

interface PlayerFormProps {
  player?: CreatePlayerForm | UpdatePlayerForm;
  onSuccess: () => void;
  method: 'POST' | 'PATCH';
  user_id?: string;
}

export default function PlayerFormModal({ player, onSuccess, method, user_id }: PlayerFormProps) {
  const form = useForm<CreatePlayerForm | UpdatePlayerForm>({
    resolver: zodResolver(method === 'POST' ? createUserSchema : updateUserSchema),
    defaultValues: {
      firstName: player?.firstName ?? "",
      lastName: player?.lastName ?? "",
      emailAddress: player?.emailAddress ?? "",
      username: player?.username ?? "",
      ...(method === 'POST' ? { password: "" } : {}), //only included when creating a user
      publicMetadata: {
        active: player?.publicMetadata?.active ?? true,
        roles: player?.publicMetadata?.roles ?? []
      }
    }
  })

  interface ApiError {
    error: string;
    status: number;
  }

  interface ApiResponse {
    message: string;
    player: CreatePlayerForm | UpdatePlayerForm;
  }

  const onSubmit = async (data: CreatePlayerForm | UpdatePlayerForm) => {
    const addPlayerError = (message: string) => toast("Error: " + message, { type: "error" });

    try {
      const payload = method === 'PATCH' ? { ...data, userId: user_id } : data;

      const res = await fetch('/api/users', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json() as ApiResponse | ApiError;

      if (!res.ok) throw new Error('error' in responseData ? responseData.error : 'Failed to add player');

      onSuccess();
      form.reset();
    } catch (error: unknown) {
      addPlayerError(error instanceof Error ? error.message : "Failed to add player");
      console.error('Failed to add player:', error);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voornaam</FormLabel>
                <FormControl>
                  <Input placeholder="Voornaam" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Achternaam</FormLabel>
                <FormControl>
                  <Input placeholder="Achternaam" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emailadres</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Emailadres" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {method === 'POST' ?
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> : <></>
          }

          <FormField
            control={form.control}
            name="publicMetadata.roles"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center">
                <FormLabel>Admin</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes('admin')}
                    onCheckedChange={(checked) => {
                      const roles = checked ? ['admin'] : [];
                      field.onChange(roles)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-vilvGreen text-white p-2 rounded-md" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Bezig ...' : method === 'POST' ? 'Toevoegen' : 'Opslaan'}
          </Button>
        </form>
      </Form>
      <ToastContainer />
    </div>
  )
}