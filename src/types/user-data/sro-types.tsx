export type SroData = {
  format: string;
  source: string;
  version: 1;
  characters?: ICharacter[];
  relics?: IRelic[];
  lightCones?: ILightCone[];
};

export interface IRelic {
  setKey: string;
  slotKey: SroRelicSlotKey;
  level: number;
  rarity: number;
  mainStatKey: SroRelicMainKey;
  location: string;
  lock: boolean;
  substats: ISubstat[];
}

export type SroRelicMainKey =
  | "hp"
  | "atk"
  | "hp_"
  | "atk_"
  | "def_"
  | "crit_"
  | "crit_dmg_"
  | "heal_"
  | "eff_"
  | "spd"
  | "physical_dmg_"
  | "fire_dmg_"
  | "ice_dmg_"
  | "lightning_dmg_"
  | "wind_dmg_"
  | "quantum_dmg_"
  | "imaginary_dmg_"
  | "brEff_"
  | "enerRegen_";

export type SroRelicSubKey =
  | "hp"
  | "atk"
  | "def"
  | "hp_"
  | "atk_"
  | "def_"
  | "spd"
  | "crit_"
  | "crit_dmg_"
  | "eff_"
  | "eff_res_"
  | "brEff_";

export type SroRelicSlotKey =
  | "head"
  | "hand"
  | "body"
  | "feet"
  | "sphere"
  | "rope";

export interface ISubstat {
  key: SroRelicSubKey;
  value: number;
}

export interface ILightCone {
  key: string;
  level: number;
  ascension: number;
  superimpose: number;
  location: string;
  lock: boolean;
}

export interface ICharacter {
  key: string;
  level: number;
  eidolon: number;
  ascension: number;
  basic: number;
  skill: number;
  ult: number;
  talent: number;
  bonusAbilities: Partial<Record<number, boolean>>;
  statBoosts: Partial<Record<number, boolean>>;
}
