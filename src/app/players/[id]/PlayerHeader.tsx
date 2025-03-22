"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import PlayerFormModal, { UpdatePlayerForm } from "../PlayerForm";
import { useRouter } from "next/navigation";


interface PlayerHeaderProps {
  player?: UpdatePlayerForm;
  user_id: string;
}

export default function PlayerHeader({ player, user_id }: PlayerHeaderProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    setDialogOpen(false);
    router.refresh();
  }

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-vilvBlue text-xl font-semibold pb-4">Spelerdetails</h1>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button className="bg-vilvGreen text-white p-2 rounded-md">Aanpassen</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-vilvBlue">Speler aanpassen</DialogTitle>
          </DialogHeader>
          <PlayerFormModal
            onSuccess={handleSuccess}
            method="PATCH"
            player={player}
            user_id={user_id}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
