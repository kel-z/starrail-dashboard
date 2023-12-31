import { Character } from "@/types/user-data/hsr-scanner-types";
import { CharacterMetadata, CharacterStatKey } from "@/types/game-data-types";
import { getAllCharacterStats } from "../utils/character-stats-utils";
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
              <div>{getStatDisplayValue(key as CharacterStatKey, value)}</div>
            </div>
          );
        })}
    </div>
  );
}

export default CharacterStats;
