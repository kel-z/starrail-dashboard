import { Relic, RelicSubstat } from "@/types/user-data/hsr-scanner-types";
import {
  RelicSubstatRollValues,
  RelicValues,
} from "../constants/relic-constants";

export const getMainstatValue = (relic: Relic) => {
  const possibleMainstats =
    RelicValues.main[relic.rarity as keyof typeof RelicValues.main][relic.slot];

  if (Object.keys(possibleMainstats).includes(relic.mainstat)) {
    return (
      possibleMainstats[relic.mainstat as keyof typeof possibleMainstats][
        "base"
      ] +
      possibleMainstats[relic.mainstat as keyof typeof possibleMainstats][
        "step"
      ] *
        relic.level
    );
  }

  return -1;
};

export const getMainstatDisplayValue = (relic: Relic) => {
  const mainstatValue = getMainstatValue(relic);
  return hasFlatMainstat(relic)
    ? Math.floor(mainstatValue)
    : getPercentageString(mainstatValue);
};

export const getPercentageString = (value: number) => {
  const thousands = Math.floor(value * 10000);
  let percentage = Math.floor(thousands / 10) / 10;
  if (thousands % 10 === 9) {
    percentage = Math.ceil(thousands / 10) / 10;
  }

  return `${percentage.toFixed(1)}%`;
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
