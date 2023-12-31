export type GameData = {
  version: string;
  light_cones: {
    [key: string]: LightConeMetadata;
  };
  relic_sets: {
    [key: string]: RelicSetMetadata;
  };
  characters: {
    [key: string]: CharacterMetadata;
  };
};

export type StatIncrement = {
  // base value of the stat
  base: number;
  // how much the stat increases per level
  step: number;
};

export type LightConeMetadata = {
  path: CharacterPath;
  rarity: number;
  desc: string;
  // select index 0 if ascension is 0, index 1 if ascension is 1, etc.
  ascension: {
    hp: StatIncrement;
    atk: StatIncrement;
    def: StatIncrement;
  }[];
  ability: LightConeAbility;
  icon: string;
  image: string;
  mini_icon: string;
};

type LightConeAbility = {
  name: string;
  // desc has {0}, {1}, etc. to indicate where to insert the values
  desc: string;
  // select index 0 if superimposition is 1, index 1 if superimposition is 2, etc.
  // then replace {0}, {1}, etc. in desc with the values in the array
  params: string[][];
  modifiers: CharacterModifier[][];
};

export type RelicSlot =
  | "Head"
  | "Hands"
  | "Body"
  | "Feet"
  | "Planar Sphere"
  | "Link Rope";

type RelicSetMetadata = {
  pieces: {
    [key in RelicSlot]?: RelicMetadata;
  };
  // select index 0 if 2 pc set bonus and index 1 if 4 pc set bonus
  desc: string[];
  /*
  if the relic set bonus has a passive character modifier, it will be in this array
  so if the 2 pc set bonus is "Increases HP by 10%" and the 4 pc set bonus is "Increases HP by 20%",
  then the array will look like this:
  [
    [
      {
        type: "hp",
        value: 0.1,
      },
    ],
    [
      {
        type: "hp",
        value: 0.2,
      },
    ],
  ]
  */
  modifiers: CharacterModifier[][];
};

export type RelicMetadata = {
  name: string;
  icon: string;
};

export type CharacterMetadata = {
  rarity: number;
  path: CharacterPath;
  element: CharacterElement;
  // select index 0 if ascension is 0, index 1 if ascension is 1, etc.
  ascension: {
    [key in CharacterBaseStatKey]: StatIncrement;
  }[];
  // index 0 is eidolon 1, index 1 is eidolon 2, etc.
  eidolons: CharacterEidolon[];
  skills: {
    [key in CharacterSkillKey]: CharacterSkillData;
  };
  traces: {
    [key in AllCharacterTraceKey]: CharacterTraceData;
  };
  icon: string;
  splash: string;
  mini_icon: string;
};

export type CharacterBaseStatKey =
  | "hp"
  | "atk"
  | "def"
  | "spd"
  | "taunt"
  | "crit_rate"
  | "crit_dmg";

export type CharacterStatKey =
  | CharacterBaseStatKey
  | "fire"
  | "ice"
  | "wind"
  | "lightning"
  | "physical"
  | "quantum"
  | "imaginary"
  | "heal"
  | "break"
  | "energy"
  | "effect_hit"
  | "effect_res";

export type ModifierKey = CharacterStatKey | "hp_" | "atk_" | "def_" | "spd_";

export type AllCharacterBaseStats = {
  [key in CharacterBaseStatKey]: number;
};

export type AllCharacterStats = {
  [key in CharacterStatKey]: number;
};

export type CharacterPath =
  | "The Hunt"
  | "Erudition"
  | "Nihility"
  | "Harmony"
  | "Preservation"
  | "Destruction"
  | "Abundance";

type CharacterElement =
  | "Fire"
  | "Ice"
  | "Wind"
  | "Lightning"
  | "Physical"
  | "Quantum"
  | "Imaginary";

export type CharacterSkillKey = "basic" | "skill" | "ult" | "talent";

export type CharacterSkillData = {
  name: string;
  max_level: number;
  desc: string;
  params: string[][];
  icon: string;
};

export type AllCharacterTraceKey =
  | "technique"
  | "ability_1"
  | "ability_2"
  | "ability_3"
  | "stat_1"
  | "stat_2"
  | "stat_3"
  | "stat_4"
  | "stat_5"
  | "stat_6"
  | "stat_7"
  | "stat_8"
  | "stat_9"
  | "stat_10";

export type CharacterTraceData = {
  name: string;
  desc: string;
  modifiers?: CharacterModifier[];
  icon: string;
};

export type CharacterModifier = {
  type: ModifierKey;
  value: number;
};

type CharacterEidolon = {
  name: string;
  desc: string;
  // for eidolons 3 and 5
  level_up_skills?: {
    [key in CharacterSkillKey]?: number;
  };
  icon: string;
};
