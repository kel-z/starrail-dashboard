import { LightConeMetadata } from "@/types/game-data-types";
import { LightCone } from "@/types/user-data/hsr-scanner-types";
import { LightConeSortOption } from "../types/sort-types";

export const calculateScore = (
  sortBy: LightConeSortOption,
  lc: LightCone,
  metadata: LightConeMetadata,
): number => {
  switch (sortBy.value) {
    case "level":
      return lc.level * 100 + metadata.rarity * 10 + lc.ascension;
    case "rarity":
      return metadata.rarity * 100 + lc.level * 10 + lc.ascension;
    default:
      return 0;
  }
};
