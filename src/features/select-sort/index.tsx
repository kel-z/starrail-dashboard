import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { SortOption } from "./types/sort-types";

interface SelectSortProps<T> {
  sortOptions: SortOption<T>[];
  sortBy: SortOption<T>;
  sortAsc: boolean;
  setSortBy: (sortBy: SortOption<T>) => void;
  setSortAsc: (asc: boolean) => void;
}
function SelectSort<T extends string>({
  sortOptions,
  sortBy,
  sortAsc,
  setSortBy,
  setSortAsc,
}: SelectSortProps<T>) {
  const onSortChange = (value: string) => {
    const sortOption = sortOptions.find((option) => option.value === value);
    if (!sortOption) return;
    setSortBy(sortOption);
  };

  return (
    <div className="flex flex-row flex-wrap items-center gap-2">
      <div className="text-sm">Sort by:</div>
      <div className="flex flex-wrap gap-2">
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
    </div>
  );
}

export type { SortOption };
export default SelectSort;
