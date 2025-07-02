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
  allSeasons = ['2025-2026', '2024-2025'],
}: {
  selectedSeason: string;
  setSelectedSeason: (value: string) => void;
  allSeasons?: string[];
}) {
  return (
    <Select value={selectedSeason} onValueChange={setSelectedSeason}>
      <SelectTrigger className="w-[8rem]">
        <SelectValue defaultValue={selectedSeason} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {allSeasons.map((season) => (
            <SelectItem key={season} value={season}>
              {season}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
