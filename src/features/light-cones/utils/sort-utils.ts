import { LightConeMetadata } from "@/types/game-data-types";
import { LightCone } from "@/types/user-data/hsr-scanner-types";
import { LightConeSortOption } from "../types/sort-types";

export const calculateScore = (
  sortBy: LightConeSortOption,
  item: LightCone,
  metadata: LightConeMetadata,
): number => {
  switch (sortBy.value) {
    case "level":
      return item.level * 100 + metadata.rarity * 10 + item.ascension;
    case "rarity":
      return metadata.rarity * 100 + item.level * 10 + item.ascension;
    default:
      return 0;
  }
};
