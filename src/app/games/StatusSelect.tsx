"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { statusEnum } from "~/server/db/schema";

export default function StatusSelect( { game_id, status }: { game_id: string, status: (string)}) {
  const { user } = useUser();
  const statusValues = Object.values(statusEnum.enumValues);
  const [selectedStatus, setSelectedStatus] = useState(status ?? "");

  const handleStatusChange = async (value: string) => {
    setSelectedStatus(value);

    const method = status === null ? 'POST' : 'PATCH';
    const response = await fetch('/api/availabilities', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        game_id,
        user_id: user?.id,
        status: value,
        player_name: user?.fullName ?? user?.username ?? user?.id
      }),
    });
  }

  return (
    <Select value={selectedStatus} onValueChange={(value) => handleStatusChange(value)}>
      <SelectTrigger className="w-full">
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