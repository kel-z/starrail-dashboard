import {
  CharacterSkillKey,
  AllCharacterTraceKey,
  RelicSlot,
} from "../game-data-types";

export type UserData = {
  source: string;
  version: number;
  light_cones: LightCone[];
  relics: Relic[];
  characters: Character[];
};

export type LightCone = {
  key: string;
  level: number;
  ascension: number;
  superimposition: number;
  location: string;
  lock: boolean;
};

export type Relic = {
  set: string;
  slot: RelicSlot;
  rarity: RelicRarityKey;
  level: number;
  mainstat: RelicMainstatKey;
  substats: RelicSubstat[];
  location: string;
  lock: boolean;
};

export type Character = {
  key: string;
  level: number;
  ascension: number;
  eidolon: number;
  skills: {
    [key in CharacterSkillKey]: number;
  };
  traces: {
    [key in CharacterTraceKey]: boolean;
  };
};

export type CharacterTraceKey = Exclude<AllCharacterTraceKey, "technique">;

export type RelicMainstatKey =
  | "HP"
  | "ATK"
  | "DEF"
  | "SPD"
  | "Effect Hit Rate"
  | "CRIT Rate"
  | "CRIT DMG"
  | "Wind DMG Boost"
  | "Fire DMG Boost"
  | "Ice DMG Boost"
  | "Lightning DMG Boost"
  | "Quantum DMG Boost"
  | "Imaginary DMG Boost"
  | "Physical DMG Boost"
  | "Energy Regeneration Rate"
  | "Outgoing Healing Boost"
  | "Break Effect";

export type RelicSubstatKey =
  | "HP"
  | "HP_"
  | "ATK"
  | "ATK_"
  | "DEF"
  | "DEF_"
  | "SPD"
  | "Effect Hit Rate_"
  | "Effect RES_"
  | "CRIT Rate_"
  | "CRIT DMG_"
  | "Break Effect_";

export type RelicSubstat = {
  key: RelicSubstatKey;
  value: number;
};

export type RelicRarityKey = 2 | 3 | 4 | 5;
