import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

export function SeasonSelector({
  selectedSeason,
  setSelectedSeason,
}: {
  selectedSeason: string;
  setSelectedSeason: (value: string) => void;
}) {
  return (
    <Select value={selectedSeason} onValueChange={setSelectedSeason}>
      <SelectTrigger className="w-[8rem]">
        <SelectValue defaultValue={selectedSeason} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="2025-2026">2025-2026</SelectItem>
          <SelectItem value="2024-2025">2024-2025</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
