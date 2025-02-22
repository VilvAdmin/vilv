import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import GameForm from "./GameForm"

export default function AddGameButton() {
  return (
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
  )
}
