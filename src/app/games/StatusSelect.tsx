"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { statusEnum } from "~/server/db/schema";

export default function StatusSelect({ game_id, status }: { game_id: string, status: (string | null) }) {
  const { user } = useUser();
  const statusValues = Object.values(statusEnum.enumValues);
  const [selectedStatus, setSelectedStatus] = useState(status ?? "");
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (value: string) => {
    setIsLoading(true);

    try {
      const method = selectedStatus === "" ? 'POST' : 'PATCH';
      const response = await fetch('/api/availabilities', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game_id,
          status: value,
          player_name: user?.fullName ?? user?.username ?? user?.id
        }),
      });
    }
    catch (error) {
      console.error('Error updating availability:', error);
      setSelectedStatus(status ?? "");
    }
    finally {
      setSelectedStatus(value);
      setIsLoading(false);
    }
  }

  return (
    <Select value={selectedStatus} onValueChange={(value) => handleStatusChange(value)} disabled={isLoading}>
      <SelectTrigger className="w-full min-w-40">
        <SelectValue>{selectedStatus}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statusValues.map((statusValue) => (
            <SelectItem key={statusValue} value={statusValue}>{statusValue}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}