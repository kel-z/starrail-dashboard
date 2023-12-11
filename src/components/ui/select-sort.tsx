import { Button } from "./button";
import { SortOption } from "@/types/app";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface SelectSortProps {
  sortOptions: SortOption[];
  sortBy: SortOption;
  sortAsc: boolean;
  setSortBy: (sortBy: SortOption) => void;
  setSortAsc: (asc: boolean) => void;
}
function SelectSort({
  sortOptions,
  sortBy,
  sortAsc,
  setSortBy,
  setSortAsc,
}: SelectSortProps) {
  const onSortChange = (value: string) => {
    const sortOption = sortOptions.find((option) => option.value === value);
    if (!sortOption) return;
    setSortBy(sortOption);
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="text-sm">Sort by:</div>
      <Select value={sortBy.value} onValueChange={onSortChange}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="outline" onClick={() => setSortAsc(!sortAsc)}>
        {sortAsc ? "Ascending" : "Descending"}
      </Button>
    </div>
  );
}

export default SelectSort;
