import { SortOption } from "@/features/select-sort";
import { LightConeMetadata } from "@/types/game-data-types";
import { LightCone } from "@/types/user-data/hsr-scanner-types";

export interface LightConeSortOption
  extends SortOption<keyof LightCone | keyof LightConeMetadata> {}
