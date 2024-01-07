/**
 * Super rudimentary conversion from SRO data to HSR Scanner data.
 * This is mostly for testing purposes.
 */

import { RelicSlot } from "@/types/game-data-types";
import {
  Character,
  LightCone,
  Relic,
  RelicMainstatKey,
  RelicSubstatKey,
  UserData,
} from "@/types/user-data/hsr-scanner-types";
import {
  SroData,
  SroRelicMainKey,
  SroRelicSlotKey,
  SroRelicSubKey,
} from "@/types/user-data/sro-types";

const sroToHsrScannerMainMap: Record<SroRelicMainKey, RelicMainstatKey> = {
  hp: "HP",
  atk: "ATK",
  hp_: "HP",
  atk_: "ATK",
  def_: "DEF",
  crit_: "CRIT Rate",
  crit_dmg_: "CRIT DMG",
  heal_: "Outgoing Healing Boost",
  eff_: "Effect Hit Rate",
  spd: "SPD",
  physical_dmg_: "Physical DMG Boost",
  fire_dmg_: "Fire DMG Boost",
  ice_dmg_: "Ice DMG Boost",
  lightning_dmg_: "Lightning DMG Boost",
  wind_dmg_: "Wind DMG Boost",
  quantum_dmg_: "Quantum DMG Boost",
  imaginary_dmg_: "Imaginary DMG Boost",
  brEff_: "Break Effect",
  enerRegen_: "Energy Regeneration Rate",
};

const sroToHsrScannerSubMap: Record<SroRelicSubKey, RelicSubstatKey> = {
  hp: "HP",
  hp_: "HP_",
  atk: "ATK",
  atk_: "ATK_",
  def: "DEF",
  def_: "DEF_",
  spd: "SPD",
  crit_: "CRIT Rate_",
  crit_dmg_: "CRIT DMG_",
  eff_: "Effect Hit Rate_",
  eff_res_: "Effect RES_",
  brEff_: "Break Effect_",
};

const sroToHsrScannerSlotMap: Record<SroRelicSlotKey, RelicSlot> = {
  head: "Head",
  hand: "Hands",
  body: "Body",
  feet: "Feet",
  sphere: "Planar Sphere",
  rope: "Link Rope",
};

const formatLocation = (
  location: string,
  setIsTrailblazerFemale?: (isTrailblazerFemale: boolean) => void,
): string => {
  if (!location.startsWith("Trailblazer")) return location;

  if (setIsTrailblazerFemale) {
    setIsTrailblazerFemale(location.endsWith("F"));
  }

  return location.slice(0, -1);
};

export const convertSroToHsrScannerData = (
  sroData: SroData,
  setIsTrailblazerFemale: (isTrailblazerFemale: boolean) => void,
): UserData => {
  const result: UserData = {
    source: sroData.source,
    version: 3,
    light_cones: [],
    relics: [],
    characters: [],
  };

  const request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://raw.githubusercontent.com/kel-z/HSR-Data/main/output/min/sro_to_hsrs.json",
    false,
  );
  request.send();
  if (request.status !== 200) return result;

  const sroToHsrScannerData: {
    light_cones: Record<string, string>;
    relic_sets: Record<string, string>;
    characters: Record<string, string>;
  } = JSON.parse(request.responseText);

  if (sroData.lightCones) {
    for (const lc of sroData.lightCones) {
      const res: LightCone = {
        key: sroToHsrScannerData.light_cones[lc.key],
        level: lc.level,
        ascension: lc.ascension,
        superimposition: lc.superimpose,
        location: "",
        lock: lc.lock,
      };
      if (lc.location) {
        res.location =
          sroToHsrScannerData.characters[formatLocation(lc.location)];
      }
      result.light_cones.push(res);
    }
  }

  if (sroData.relics) {
    for (const r of sroData.relics) {
      const res: Relic = {
        level: r.level,
        mainstat: sroToHsrScannerMainMap[r.mainStatKey],
        set: sroToHsrScannerData.relic_sets[r.setKey],
        slot: sroToHsrScannerSlotMap[r.slotKey],
        rarity: r.rarity,
        substats: [],
        location: "",
        lock: r.lock,
      };
      if (r.location) {
        res.location =
          sroToHsrScannerData.characters[formatLocation(r.location)];
      }
      for (const sub of r.substats) {
        const substatKey = sroToHsrScannerSubMap[sub.key];
        if (!substatKey) continue;
        const substatValue = sub.key.endsWith("_")
          ? Math.round(sub.value * 1000) / 10
          : sub.value;
        res.substats.push({
          key: substatKey,
          value: substatValue,
        });
      }
      result.relics.push(res);
    }
  }

  if (sroData.characters) {
    for (const c of sroData.characters) {
      const res: Character = {
        key: sroToHsrScannerData.characters[
          formatLocation(c.key, setIsTrailblazerFemale)
        ],
        level: c.level,
        ascension: c.ascension,
        eidolon: c.eidolon,
        skills: {
          basic: c.basic,
          skill: c.skill,
          ult: c.ult,
          talent: c.talent,
        },
        traces: {
          ability_1: c.bonusAbilities[1] || false,
          ability_2: c.bonusAbilities[2] || false,
          ability_3: c.bonusAbilities[3] || false,
          stat_1: c.statBoosts[1] || false,
          stat_2: c.statBoosts[2] || false,
          stat_3: c.statBoosts[3] || false,
          stat_4: c.statBoosts[4] || false,
          stat_5: c.statBoosts[5] || false,
          stat_6: c.statBoosts[6] || false,
          stat_7: c.statBoosts[7] || false,
          stat_8: c.statBoosts[8] || false,
          stat_9: c.statBoosts[9] || false,
          stat_10: c.statBoosts[10] || false,
        },
      };

      result.characters.push(res);
    }
  }

  return result;
};
