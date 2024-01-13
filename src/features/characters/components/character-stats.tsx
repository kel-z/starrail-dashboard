import { Character } from "@/types/user-data/hsr-scanner-types";
import { CharacterMetadata, CharacterStatKey } from "@/types/game-data-types";
import {
  getAllCharacterStats,
  getRelicSpdSubsRange,
} from "../utils/character-stats-utils";
import {
  getStatDisplayValue,
  statsDisplayIconMap as getStatsDisplayIconMap,
  statsDisplayTextMap,
} from "../utils/character-display-utils";
import { useContext } from "react";
import { HsrDataContext } from "@/stores/database-store";

interface CharacterStatsProps {
  character: Character;
  metadata: CharacterMetadata;
}
function CharacterStats({ character, metadata }: CharacterStatsProps) {
  const { userData, gameData } = useContext(HsrDataContext);
  const equippedRelics = userData.relics.filter(
    (relic) => relic.location === character.key,
  );
  // get spd without subs
  const { spd } = getAllCharacterStats(
    character,
    metadata,
    userData,
    gameData,
    false,
  );
  const stats = getAllCharacterStats(character, metadata, userData, gameData);
  const paths = [
    "quantum",
    "physical",
    "lightning",
    "wind",
    "ice",
    "fire",
    "imaginary",
  ];
  const spdSubsRange = getRelicSpdSubsRange(equippedRelics);

  return (
    <div className="flex h-full w-full flex-col">
      {Object.entries(stats)
        .filter(
          ([key]) =>
            !paths.includes(key) || key === metadata.element.toLowerCase(),
        )
        .map(([key, value], index) => {
          return (
            <div
              key={key}
              className={`flex flex-row items-center justify-between gap-2 p-0.5 ${
                index % 2 === 0 ? "bg-muted/25" : ""
              }`}
            >
              <div className="flex flex-row items-center gap-0.5">
                {getStatsDisplayIconMap(key as CharacterStatKey)}
                <div>{statsDisplayTextMap[key as CharacterStatKey]}</div>
              </div>
              {(key !== "spd" && (
                <div>{getStatDisplayValue(key as CharacterStatKey, value)}</div>
              )) || (
                <div>
                  {Math.floor(spd + spdSubsRange["min"])}
                  {Math.floor(spdSubsRange["min"]) !==
                    Math.floor(spdSubsRange["max"]) &&
                    "~" + Math.floor(spd + spdSubsRange["max"])}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default CharacterStats;
