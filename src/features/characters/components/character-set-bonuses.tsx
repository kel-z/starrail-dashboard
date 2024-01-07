import { Relic } from "@/types/user-data/hsr-scanner-types";
import { getRelicSetDescriptions } from "../utils/character-stats-utils";
import { CheckCircle } from "lucide-react";

interface CharacterSetBonusesProps {
  relics: (Relic | null)[];
}
function CharacterSetBonuses({ relics }: CharacterSetBonusesProps) {
  relics = relics.filter((r) => r !== null);
  const setBonuses = getRelicSetDescriptions(relics as Relic[]);

  return Object.entries(setBonuses).map(([setName, setBonus]) => (
    <div
      className="flex flex-col rounded border bg-background/50 p-3"
      key={setName}
    >
      <p className="text-orange-400">{setName}</p>
      {setBonus.map((bonus, index) => (
        <div className="flex gap-1 text-sm text-green-300" key={index}>
          <CheckCircle className="mt-1 h-3 w-3 flex-shrink-0" />{" "}
          <p className="text-green-300">
            {(index + 1) * 2}-Pc: {bonus}
          </p>
        </div>
      ))}
    </div>
  ));
}

export default CharacterSetBonuses;
