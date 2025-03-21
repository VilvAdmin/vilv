import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

export function SeasonSelector({ selectedSeason, setSelectedSeason }: { selectedSeason: string, setSelectedSeason: (value: string) => void }) {
    return (
        <Select value={selectedSeason} onValueChange={setSelectedSeason}>
            <SelectTrigger className="w-[8rem]">
                <SelectValue defaultValue={selectedSeason} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                    <SelectItem value="2022-2023">2022-2023</SelectItem>
                    <SelectItem value="2021-2022">2021-2022</SelectItem>
                    <SelectItem value="2020-2021">2020-2021</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}