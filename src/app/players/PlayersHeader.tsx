"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { useUser } from "@clerk/nextjs";
import PlayerForm from "./PlayerForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PlayersHeader() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const userRoles = user?.publicMetadata?.roles as string[] | undefined;
  const isAdmin = userRoles?.includes("admin");

  const handleSuccess = () => {
    setDialogOpen(false);
    router.refresh();
  }

  return (
    <div className="flex justify-between items-center pb-4">
      <h1 className="text-vilvBlue text-xl font-semibold pb-4">Spelers</h1>

      {isAdmin &&
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button className="bg-vilvGreen text-white p-2 rounded-md">Speler toevoegen</button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-vilvBlue">Speler toevoegen</DialogTitle>
            </DialogHeader>
            <PlayerForm onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      }
    </div>
  )
}
