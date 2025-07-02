'use client';
import { useUser } from '@clerk/nextjs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '~/components/ui/dialog';
import type { Training } from '~/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TrainingForm from '../TrainingForm';
import GuestPlayerForm from './GuestPlayerForm';

interface TrainingHeaderProps {
  training: Training;
}

export default function TrainingHeader({ training }: TrainingHeaderProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [guestDialogOpen, setGuestDialogOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes('admin');

  const deleteTraining = async () => {
    try {
      const res = await fetch(`/api/trainings/${training.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/trainings');
      } else {
        console.error('Failed to delete training:', res.statusText);
      }
    } catch (error: unknown) {
      console.error('Failed to delete training:', error);
    }
  };

  const handleSuccess = () => {
    setDialogOpen(false);
    setGuestDialogOpen(false);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="pb-4 text-xl font-semibold text-vilvBlue">Trainingsdetails</h1>

      {isAdmin && (
        <div className="flex space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="rounded-md bg-vilvRed p-2 text-white">Verwijderen</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-vilvBlue">Training verwijderen</DialogTitle>
              </DialogHeader>
              <p>
                Weet je zeker dat je deze training wil verwijderen? We kunnen dit niet ongedaan
                maken.
              </p>
              <div className="flex justify-end space-x-4">
                <button className="rounded-md bg-vilvRed p-2 text-white" onClick={deleteTraining}>
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
                <DialogTitle className="text-vilvBlue">Training aanpassen</DialogTitle>
              </DialogHeader>
              <TrainingForm
                training={{ ...training, date: new Date(training.date) }}
                onSuccess={handleSuccess}
                method="PATCH"
                training_id={training.id}
              />
            </DialogContent>
          </Dialog>
          <Dialog open={guestDialogOpen} onOpenChange={setGuestDialogOpen}>
            <DialogTrigger asChild>
              <button className="rounded-md bg-vilvGreen p-2 text-white">
                Gastspeler toevoegen
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-vilvBlue">Gastspeler toevoegen</DialogTitle>
              </DialogHeader>
              <GuestPlayerForm training_id={training.id} onSuccess={handleSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
