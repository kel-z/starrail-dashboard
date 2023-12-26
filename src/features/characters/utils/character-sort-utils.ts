import { Character } from "@/types/user-data/hsr-scanner-types";
import { CharacterSortOption } from "../types/character-sort-type";
import { CharacterMetadata } from "@/types/game-data-types";

export const calculateScore = (
  sortBy: CharacterSortOption,
  character: Character,
  metadata: CharacterMetadata,
): number => {
  switch (sortBy.value) {
    case "level":
      return character.level * 100 + character.ascension * 10 + metadata.rarity;
    case "rarity":
      return metadata.rarity * 100 + character.level * 10 + character.ascension;
    default:
      return 0;
  }
};
