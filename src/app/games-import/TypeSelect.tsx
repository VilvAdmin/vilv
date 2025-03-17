"use client";

import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { typeEnum } from "~/server/db/schema";

export default function TypeSelect({ status, onChange }: { status: string, onChange: (value: "Beker" | "Vriendschappelijk" | "Competitie") => void }) {
  const statusValues = Object.values(typeEnum.enumValues);
  const [selectedStatus, setSelectedStatus] = useState(status ?? "");

  const handleStatusChange = async (value: string) => {
    setSelectedStatus(value);
  }

  return (
    <Select value={selectedStatus} onValueChange={(value) => handleStatusChange(value)}>
      <SelectTrigger className="w-full">
        <SelectValue>{selectedStatus}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statusValues.map((statusValue) => (
            <SelectItem key={statusValue} value={statusValue} onChange={(e) => onChange((e.target as HTMLSelectElement).value as "Beker" | "Vriendschappelijk" | "Competitie")}></SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}