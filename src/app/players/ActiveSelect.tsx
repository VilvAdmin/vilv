"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

export default function ActiveSelect( { active, user_id }: { active: boolean, user_id: string }) {
  const [selectedActive, setSelectedActive] = useState(active);
  const [isLoading, setIsLoading] = useState(false);

  const handleActiveChange = async (value: string) => {
    setIsLoading(true);
    const newActive = value === "true";

    try {
      const response = await fetch('/api/users', {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user_id,
          active: newActive,
        }),
      });
    }
    catch (error) {
      console.error('Error updating availability:', error);
      setSelectedActive(active);
    }
    finally {
      setSelectedActive(newActive);
      setIsLoading(false);
    }
  }

  return (
    <Select value={selectedActive.toString()} onValueChange={handleActiveChange} disabled={isLoading}>
      <SelectTrigger className="w-full min-w-16 max-w-32">
        <SelectValue>{selectedActive ? "Actief" : "Inactief"}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            <SelectItem value="true">Actief</SelectItem>
            <SelectItem value="false">Inactief</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
  }