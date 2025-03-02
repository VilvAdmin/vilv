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
import { MyGame } from "~/types";
import { generateICS } from "~/lib/utils";

export default function GamesHeader({ games }: { games: MyGame[] }) {
  const { user } = useUser();
  
  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes("admin");

  const handleExport = () => {
    const icsContent = generateICS(games);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'vilv-games.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-between items-center pb-4">
      <h1 className="text-vilvBlue text-xl font-semibold pb-4">Inschrijven op wedstrijden</h1>

      <div className="flex space-x-4">
      <button onClick={handleExport} className="bg-vilvBlue text-white p-2 rounded-md">
      Export
      </button>
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
    </div>
  )
}
