"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import type { Player } from "~/types";
// import { useRouter } from "next/navigation";


interface PlayerHeaderProps {
  player?: Player;
}

export default function PlayerHeader({ player }: PlayerHeaderProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useUser();
  //   const router = useRouter();

  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes("admin");

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
          {/* <GameForm game={{ ...game, date: new Date(game.date) }} onSuccess={() => {
            setDialogOpen(false)}} method="PATCH" game_id={game.id}/> */}
        </DialogContent>
      </Dialog>
    </div>
  )
}
