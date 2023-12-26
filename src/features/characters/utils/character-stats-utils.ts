import { getLightConeStats } from "@/features/light-cones/utils/light-cone-stat-utils";
import {
  getMainstatValue,
  getSubstatRollValue,
  getSubstatValue,
} from "@/features/relics/utils/relic-stat-utils";
import { HsrDataContext } from "@/stores/database-store";
import {
  AllCharacterBaseStats,
  AllCharacterStats,
  CharacterBaseStatKey,
  CharacterMetadata,
  CharacterModifier,
  CharacterPath,
  CharacterStatKey,
  ModifierKey,
} from "@/types/game-data-types";
import {
  Character,
  LightCone,
  Relic,
  RelicMainstatKey,
  RelicSubstatKey,
} from "@/types/user-data/hsr-scanner-types";
import { useContext } from "react";

const subToCharacterStatKeyMap: Record<RelicSubstatKey, CharacterStatKey> =
  Object.freeze({
    HP: "hp",
    HP_: "hp",
    ATK: "atk",
    ATK_: "atk",
    DEF: "def",
    DEF_: "def",
    SPD: "spd",
    "Effect Hit Rate_": "effect_hit",
    "Effect RES_": "effect_res",
    "CRIT Rate_": "crit_rate",
    "CRIT DMG_": "crit_dmg",
    "Break Effect_": "break",
  });

const mainToCharacterStatKeyMap: Record<RelicMainstatKey, CharacterStatKey> =
  Object.freeze({
    HP: "hp",
    ATK: "atk",
    DEF: "def",
    SPD: "spd",
    "Effect Hit Rate": "effect_hit",
    "CRIT Rate": "crit_rate",
    "CRIT DMG": "crit_dmg",
    "Wind DMG Boost": "wind",
    "Fire DMG Boost": "fire",
    "Ice DMG Boost": "ice",
    "Lightning DMG Boost": "lightning",
    "Quantum DMG Boost": "quantum",
    "Imaginary DMG Boost": "imaginary",
    "Physical DMG Boost": "physical",
    "Energy Regeneration Rate": "energy",
    "Outgoing Healing Boost": "heal",
    "Break Effect": "break",
  });

const modifierToCharacterStatKeyMap: Record<ModifierKey, CharacterStatKey> =
  Object.freeze({
    hp: "hp",
    atk: "atk",
    def: "def",
    spd: "spd",
    taunt: "taunt",
    crit_rate: "crit_rate",
    crit_dmg: "crit_dmg",
    fire: "fire",
    ice: "ice",
    wind: "wind",
    lightning: "lightning",
    physical: "physical",
    quantum: "quantum",
    imaginary: "imaginary",
    heal: "heal",
    break: "break",
    energy: "energy",
    effect_hit: "effect_hit",
    effect_res: "effect_res",
    hp_: "hp",
    atk_: "atk",
    def_: "def",
    spd_: "spd",
  });

const getCharacterBaseStats = (
  character: Character,
  metadata: CharacterMetadata,
  equippedLightCone: LightCone | null,
): AllCharacterBaseStats => {
  const res = {
    hp: 0,
    atk: 0,
    def: 0,
    spd: 0,
    taunt: 0,
    crit_rate: 0,
    crit_dmg: 0,
  };
  Object.entries(metadata.ascension[character.ascension]).forEach(
    ([stat, statIncrements]) => {
      res[stat as CharacterBaseStatKey] =
        statIncrements.base + statIncrements.step * (character.level - 1);
    },
  );

  if (equippedLightCone) {
    const lightConeMetadata =
      useContext(HsrDataContext).gameData.light_cones[equippedLightCone.key];
    const { hp, atk, def } = getLightConeStats(
      lightConeMetadata,
      equippedLightCone.level,
      equippedLightCone.ascension,
    );
    res.hp += hp;
    res.atk += atk;
    res.def += def;
  }

  return res;
};

const addRelicStatsToCharacterStats = (
  equippedRelics: Relic[],
  characterBaseStats: AllCharacterBaseStats,
  res: AllCharacterStats,
) => {
  equippedRelics.forEach((relic) => {
    const mainstatValue = getMainstatValue(relic);
    if (relic.slot === "Head" || relic.slot === "Hands") {
      res[mainToCharacterStatKeyMap[relic.mainstat]] += mainstatValue;
    } else {
      switch (relic.mainstat) {
        case "HP":
        case "ATK":
        case "DEF":
          res[mainToCharacterStatKeyMap[relic.mainstat]] +=
            characterBaseStats[
              mainToCharacterStatKeyMap[relic.mainstat] as CharacterBaseStatKey
            ] * mainstatValue;
          break;
        case "SPD":
        case "Effect Hit Rate":
        case "CRIT Rate":
        case "CRIT DMG":
        case "Wind DMG Boost":
        case "Fire DMG Boost":
        case "Ice DMG Boost":
        case "Lightning DMG Boost":
        case "Quantum DMG Boost":
        case "Imaginary DMG Boost":
        case "Physical DMG Boost":
        case "Energy Regeneration Rate":
        case "Outgoing Healing Boost":
        case "Break Effect":
          res[mainToCharacterStatKeyMap[relic.mainstat]] += mainstatValue;
          break;
        default:
          break;
      }
    }

    relic.substats.forEach((substat) => {
      let rollValue = getSubstatRollValue(substat, relic.rarity);
      if (Array.isArray(rollValue)) {
        rollValue = rollValue.reduce((a, b) => a + b, 0) / rollValue.length;
      }
      const value = getSubstatValue(substat, relic.rarity, rollValue);
      switch (substat.key) {
        case "HP":
        case "ATK":
        case "DEF":
        case "SPD":
        case "Effect Hit Rate_":
        case "Effect RES_":
        case "CRIT Rate_":
        case "CRIT DMG_":
        case "Break Effect_":
          res[subToCharacterStatKeyMap[substat.key]] += value;
          break;
        case "HP_":
        case "ATK_":
        case "DEF_":
          res[subToCharacterStatKeyMap[substat.key]] +=
            characterBaseStats[
              subToCharacterStatKeyMap[substat.key] as CharacterBaseStatKey
            ] * value;
          break;
        default:
          break;
      }
    });
  });
};

export const getTraceModifiers = (
  character: Character,
  metadata: CharacterMetadata,
): CharacterModifier[] => {
  const res: CharacterModifier[] = [];
  Object.entries(character.traces).forEach(([traceKey, activated]) => {
    if (activated) {
      const traceMetadata =
        metadata.traces[traceKey as keyof typeof metadata.traces];
      if (traceMetadata.modifiers) {
        res.push(...traceMetadata.modifiers);
      }
    }
  });
  return res;
};

export const getLightConeModifiers = (
  lightCone: LightCone | null,
  characterPath: CharacterPath,
) => {
  if (!lightCone) return [];

  const lightConeMetadata =
    useContext(HsrDataContext).gameData.light_cones[lightCone.key];
  if (
    lightConeMetadata.path === characterPath &&
    lightConeMetadata.ability.modifiers
  ) {
    return lightConeMetadata.ability.modifiers[lightCone.superimposition - 1];
  }

  return [];
};

export const getRelicSetModifiers = (equippedRelics: Relic[]) => {
  const res: CharacterModifier[] = [];
  const relicSetCount: Record<string, number> = {};
  equippedRelics.forEach((relic) => {
    if (!relicSetCount[relic.set]) {
      relicSetCount[relic.set] = 0;
    }
    relicSetCount[relic.set] += 1;
  });

  Object.entries(relicSetCount).forEach(([set, count]) => {
    let setBonusIndex = Math.max(-1, Math.floor(count / 2) - 1);
    const setMetadata = useContext(HsrDataContext).gameData.relic_sets[set];
    while (setMetadata.modifiers && setBonusIndex >= 0) {
      res.push(...setMetadata.modifiers[setBonusIndex]);
      setBonusIndex -= 1;
    }
  });

  return res;
};

export const addModifiersToCharacterStats = (
  modifiers: CharacterModifier[],
  characterBaseStats: AllCharacterBaseStats,
  res: AllCharacterStats,
) => {
  modifiers.forEach((modifier) => {
    switch (modifier.type) {
      case "hp":
      case "atk":
      case "def":
      case "spd":
      case "taunt":
      case "crit_rate":
      case "crit_dmg":
      case "fire":
      case "ice":
      case "wind":
      case "lightning":
      case "physical":
      case "quantum":
      case "imaginary":
      case "heal":
      case "break":
      case "energy":
      case "effect_hit":
      case "effect_res":
        res[modifierToCharacterStatKeyMap[modifier.type]] += modifier.value;
        break;
      case "hp_":
      case "atk_":
      case "def_":
      case "spd_":
        res[modifierToCharacterStatKeyMap[modifier.type]] +=
          characterBaseStats[
            modifierToCharacterStatKeyMap[modifier.type] as CharacterBaseStatKey
          ] * modifier.value;
        break;
      default:
        break;
    }
  });
};

export const getAllCharacterStats = (
  character: Character,
  metadata: CharacterMetadata,
): AllCharacterStats => {
  const { userData } = useContext(HsrDataContext);
  const equippedLightCone =
    userData.light_cones.find(
      (lightCone) => lightCone.location === character.key,
    ) ?? null;
  const res = {
    hp: 0,
    atk: 0,
    def: 0,
    spd: 0,
    taunt: 0,
    crit_rate: 0,
    crit_dmg: 0,
    fire: 0,
    ice: 0,
    wind: 0,
    lightning: 0,
    physical: 0,
    quantum: 0,
    imaginary: 0,
    heal: 0,
    break: 0,
    energy: 1,
    effect_hit: 0,
    effect_res: 0,
  };
  const characterBaseStats = getCharacterBaseStats(
    character,
    metadata,
    equippedLightCone,
  );
  Object.entries(characterBaseStats).forEach(([stat, value]) => {
    res[stat as CharacterBaseStatKey] += value;
  });

  const equippedRelics = userData.relics.filter(
    (relic) => relic.location === character.key,
  );
  addRelicStatsToCharacterStats(equippedRelics, characterBaseStats, res);

  const modifiers: CharacterModifier[] = [];
  modifiers.push(...getTraceModifiers(character, metadata));
  modifiers.push(...getLightConeModifiers(equippedLightCone, metadata.path));
  modifiers.push(...getRelicSetModifiers(equippedRelics));
  addModifiersToCharacterStats(modifiers, characterBaseStats, res);

  return res;
};
