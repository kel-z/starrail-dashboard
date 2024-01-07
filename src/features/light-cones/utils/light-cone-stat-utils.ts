import { LightConeMetadata } from "@/types/game-data-types";

export const getLightConeStats = (
  metadata: LightConeMetadata,
  level: number,
  ascension: number,
): {
  hp: number;
  atk: number;
  def: number;
} => {
  const statIncrements = metadata.ascension[ascension];
  return {
    hp: statIncrements.hp.base + statIncrements.hp.step * (level - 1),
    atk: statIncrements.atk.base + statIncrements.atk.step * (level - 1),
    def: statIncrements.def.base + statIncrements.def.step * (level - 1),
  };
};
