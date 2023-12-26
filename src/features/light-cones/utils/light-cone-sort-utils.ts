import { LightConeMetadata } from "@/types/game-data-types";
import { LightCone } from "@/types/user-data/hsr-scanner-types";
import { LightConeSortOption } from "../types/light-cone-sort-types";

export const calculateScore = (
  sortBy: LightConeSortOption,
  lightCone: LightCone,
  metadata: LightConeMetadata,
): number => {
  switch (sortBy.value) {
    case "level":
      return lightCone.level * 100 + metadata.rarity * 10 + lightCone.ascension;
    case "rarity":
      return metadata.rarity * 100 + lightCone.level * 10 + lightCone.ascension;
    default:
      return 0;
  }
};
