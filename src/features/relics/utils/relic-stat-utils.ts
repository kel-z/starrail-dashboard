import { Relic, RelicSubstat } from "@/types/user-data/hsr-scanner-types";
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

export const getSubstatRollValue = (substat: RelicSubstat, rarity: number) => {
  return RelicSubstatRollValues[rarity as keyof typeof RelicSubstatRollValues][
    substat.key
  ][substat.value];
};

export const getSubstatValue = (
  substat: RelicSubstat,
  rarity: number,
  rollValue: number,
) => {
  const step =
    RelicValues.sub[rarity as keyof typeof RelicValues.sub][substat.key];
  return step * rollValue;
};

export const hasFlatMainstat = (relic: Relic) => {
  return (
    relic.slot === "Head" ||
    relic.slot === "Hands" ||
    (relic.mainstat === "SPD" && relic.slot === "Feet")
  );
};
