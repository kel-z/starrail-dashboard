import { Separator } from "@/components/ui/separator";
import { getSubstatDisplayText, SubstatIcon } from "@/features/relics";
import { getMainstatDisplayValue } from "@/features/relics/utils/relic-format-utils";
import { HsrDataContext } from "@/stores/database-store";
import { RelicSlot } from "@/types/game-data-types";
import { Relic } from "@/types/user-data/hsr-scanner-types";
import { getRarityTextStyle } from "@/utils/style-utils";
import { useContext } from "react";

interface CharacterRelicProps {
  relic: Relic;
}
function CharacterRelic({ relic }: CharacterRelicProps) {
  const { gameData } = useContext(HsrDataContext);
  const metadata =
    gameData.relic_sets[relic.set].pieces[relic.slot as RelicSlot];

  return (
    <div className="flex flex-col gap-1 rounded border bg-background/50 p-3">
      <div
        className={`flex items-center justify-between gap-x-2 text-sm ${getRarityTextStyle(
          relic.rarity,
        )}`}
      >
        <div>{relic.slot}</div>
        <div className="text-muted-foreground">+{relic.level}</div>
      </div>
      <Separator />
      <div className="my-1 flex items-center justify-center gap-2 rounded py-1">
        <img src={metadata?.icon} alt={metadata?.name} className="w-14" />
        <div className="text-sm">
          <div>{relic.mainstat}</div>
          <div>{getMainstatDisplayValue(relic)}</div>
        </div>
      </div>
      {Object.values(relic.substats).map((substat, index) => {
        return (
          <div
            key={substat.key}
            className={`flex flex-row items-center justify-between text-sm ${
              index % 2 === 0 ? "bg-muted/25" : ""
            }`}
          >
            <div className="flex">
              <SubstatIcon substat={substat} />
              {substat.key.replace("_", "")}
            </div>
            {getSubstatDisplayText(substat)}
          </div>
        );
      })}
    </div>
  );
}

export default CharacterRelic;
