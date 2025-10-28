'use client';

import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '~/components/ui/table';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PlayerAvailability {
  id: string;
  status: 'Beschikbaar' | 'Niet beschikbaar' | 'Geblesseerd' | null;
  game_id: string;
  user_id: string;
  player_name: string;
  selected: boolean;
}

interface SelectionTableProps {
  availabilities: PlayerAvailability[];
  isAdmin: boolean;
}

export default function SelectionTable({ availabilities, isAdmin }: SelectionTableProps) {
  const [selections, setSelections] = useState<Record<string, boolean>>(
    availabilities.reduce(
      (acc, player) => ({
        ...acc,
        [player.id]: player.selected,
      }),
      {}
    )
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleCheckboxChange = (playerId: string, checked: boolean) => {
    setSelections((prev) => ({
      ...prev,
      [playerId]: checked,
    }));
  };

  const handleSaveSelection = async () => {
    setIsSaving(true);
    try {
      const selectionUpdates = Object.entries(selections).map(([availability_id, selected]) => ({
        availability_id,
        selected,
      }));

      const response = await fetch('/api/availabilities', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selections: selectionUpdates,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update selections');
      }

      toast.success('Selectie succesvol opgeslagen!');
      // Refresh the page to show updated selections
      window.location.reload();
    } catch (error) {
      console.error('Error saving selections:', error);
      toast.error('Er ging iets mis bij het opslaan van de selectie');
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges = availabilities.some((player) => selections[player.id] !== player.selected);
  const availableCount = availabilities.filter((a) => a.status === 'Beschikbaar').length;
  const selectedCount = Object.values(selections).filter(Boolean).length;

  return (
    <>
      <ToastContainer />
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            {isAdmin && <TableHead className="w-[50px] text-vilvBlue"></TableHead>}
            <TableHead className="text-vilvBlue">Speler</TableHead>
            <TableHead className="text-vilvBlue">{`Status (${availableCount})`}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {availabilities.map((player) => {
            const isAvailable = player.status === 'Beschikbaar';
            const isSelected = selections[player.id];

            return (
              <TableRow key={player.id}>
                {isAdmin && (
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(player.id, checked as boolean)
                      }
                      disabled={!isAvailable}
                      aria-label={`Selecteer ${player.player_name}`}
                    />
                  </TableCell>
                )}
                <TableCell>{player.player_name}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    {player.status}
                    {isSelected && <span className="text-yellow-500">⭐ Geselecteerd</span>}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {isAdmin && hasChanges && (
        <div className="mb-4 flex items-center gap-4">
          <Button onClick={handleSaveSelection} disabled={isSaving}>
            {isSaving ? 'Bezig met opslaan...' : 'Selectie opslaan'}
          </Button>
          <span className="text-sm text-gray-600">{selectedCount} speler(s) geselecteerd</span>
        </div>
      )}
    </>
  );
}
