import { Relic } from "@/types/user-data/hsr-scanner-types";
import { getMainstatValue, hasFlatMainstat } from "./relic-stat-utils";

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
