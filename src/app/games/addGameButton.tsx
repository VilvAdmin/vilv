"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import GameForm from "./GameForm"
import { useUser } from "@clerk/nextjs";

export default function AddGameButton() {
  const { user } = useUser();
  
  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes("admin");

  return (
    <div className="flex justify-between items-center pb-4">
      <h1 className="text-vilvBlue text-xl font-semibold pb-4">Inschrijven op wedstrijden</h1>

      {isAdmin &&
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-vilvGreen text-white p-2 rounded-md">Wedstrijd toevoegen</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-vilvBlue">Wedstrijd toevoegen</DialogTitle>
          </DialogHeader>
          <GameForm />
        </DialogContent>
      </Dialog>
      }
    </div>
  )
}
