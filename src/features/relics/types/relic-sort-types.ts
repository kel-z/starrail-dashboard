import { SortOption } from "@/features/select-sort";
import { RelicMetadata } from "@/types/game-data-types";
import { Relic } from "@/types/user-data/hsr-scanner-types";

export interface RelicSortOption
  extends SortOption<keyof Relic | keyof RelicMetadata> {}
