import {
  Relic,
  RelicRarityKey,
  RelicSubstat,
} from "@/types/user-data/hsr-scanner-types";
import {
  RelicSubstatRollValues,
  RelicValues,
} from "../constants/relic-constants";

export const getMainstatValue = (relic: Relic) => {
  const possibleMainstats =
    RelicValues.main[relic.rarity as keyof typeof RelicValues.main][relic.slot];

  if (!Object.keys(possibleMainstats).includes(relic.mainstat)) {
    throw new Error("Invalid mainstat");
  }

  return (
    possibleMainstats[relic.mainstat as keyof typeof possibleMainstats][
      "base"
    ] +
    possibleMainstats[relic.mainstat as keyof typeof possibleMainstats][
      "step"
    ] *
      relic.level
  );
};

export const getSubstatRollValue = (
  substat: RelicSubstat,
  rarity: RelicRarityKey,
) => {
  let value = substat.value;
  if (substat.key === "SPD") {
    // SPD decimals not supported yet
    value = Math.floor(value);
  }
  return RelicSubstatRollValues[rarity][substat.key][value];
};

export const getSubstatValue = (
  substat: RelicSubstat,
  rarity: RelicRarityKey,
  rollValue: number,
) => {
  const step = RelicValues.sub[rarity][substat.key];
  if (substat.key !== "SPD") return [(step as number) * rollValue];

  const threshold = Math.floor(substat.value);
  type spdDict = {
    low: number;
    mid: number;
    high: number;
  };
  const spdVals = [
    [0.8, (step as spdDict)["low"]],
    [0.9, (step as spdDict)["mid"]],
    [1, (step as spdDict)["high"]],
  ];

  const result = new Set<number>();
  const backtrack = (remaining: number, current: number[]) => {
    const value = Math.round(current.reduce((a, b) => a + b, 0) * 10) / 10;
    if (Math.round(remaining * 10) / 10 === 0 && value >= threshold) {
      result.add(value);
      return;
    }
    if (remaining < 0) {
      return;
    }
    for (const [rv, val] of spdVals) {
      backtrack(remaining - rv, [...current, val]);
    }
  };
  backtrack(rollValue, []);

  return [...result].sort();
};

export const hasFlatMainstat = (relic: Relic) => {
  return (
    relic.slot === "Head" ||
    relic.slot === "Hands" ||
    (relic.mainstat === "SPD" && relic.slot === "Feet")
  );
};

export const getSubstatDisplayText = (substat: RelicSubstat) => {
  return substat.key.endsWith("_")
    ? substat.value.toFixed(1) + "%"
    : substat.value;
};
