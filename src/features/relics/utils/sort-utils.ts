import { Relic } from "@/types/user-data/hsr-scanner-types";
import { RelicSortOption } from "..";

export const calculateScore = (
  sortBy: RelicSortOption,
  relic: Relic,
): number => {
  switch (sortBy.value) {
    case "level":
      return relic.level * 100 + relic.rarity * 10;
    case "rarity":
      return relic.rarity * 100 + relic.level * 10;
    default:
      return 0;
  }
};
