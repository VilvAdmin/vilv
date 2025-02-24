"use client";
import { useUser } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import GameForm from "../GameForm";
import { Game } from "~/types";

interface EditGameButtonProps {
  game: Game;
}

export default function EditGameButton({ game }: EditGameButtonProps) {
  const { user } = useUser();
  
  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes("admin");

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-vilvBlue text-xl font-semibold pb-4">Wedstrijddetails</h1>

      {isAdmin &&       
      <Dialog>
        <DialogTrigger asChild>
        <button className="bg-vilvGreen text-white p-2 rounded-md">Aanpassen</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-vilvBlue">Wedstrijd aanpassen</DialogTitle>
          </DialogHeader>
          <GameForm game={{ ...game, date: new Date(game.date) }} />
        </DialogContent>
      </Dialog>}
    </div>
  )
}
