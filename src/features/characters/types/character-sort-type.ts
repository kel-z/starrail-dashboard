import { SortOption } from "@/features/select-sort";
import { CharacterMetadata } from "@/types/game-data-types";
import { Character } from "@/types/user-data/hsr-scanner-types";

export interface CharacterSortOption
  extends SortOption<keyof Character | keyof CharacterMetadata> {}
