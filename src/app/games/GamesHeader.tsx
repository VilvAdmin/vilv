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
import { useState } from "react";

export default function GamesHeader({ games }: { games: MyGame[] }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useUser();
  
  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes("admin");

  const handleExport = () => {
    try {
      const icsContent = generateICS(games);
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      
      // For modern browsers
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // Set up link properties
      link.href = url;
      link.download = 'vilv-games.ics';
      link.style.display = 'none';
      
      // For iOS Safari
      if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      document.body.appendChild(link);
      
      // Trigger click and cleanup
      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 0);
    } catch (error) {
      console.error('Error exporting calendar:', error);
    }
  };

  return (
    <div className="flex justify-between items-center pb-4">
      <h1 className="text-vilvBlue text-xl font-semibold pb-4">Inschrijven op wedstrijden</h1>

      <div className="flex space-x-4">
      <button onClick={handleExport} className="bg-vilvBlue text-white p-2 rounded-md">Export</button>
      {isAdmin &&
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button className="bg-vilvGreen text-white p-2 rounded-md">Wedstrijd toevoegen</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-vilvBlue">Wedstrijd toevoegen</DialogTitle>
          </DialogHeader>
          <GameForm onSuccess={() => {
            setDialogOpen(false)}} />
        </DialogContent>
      </Dialog>
      }
      </div>
    </div>
  )
}
