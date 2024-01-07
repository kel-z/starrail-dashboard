import { Separator } from "@/components/ui/separator";
import { RelicMetadata } from "@/types/game-data-types";
import { Relic } from "@/types/user-data/hsr-scanner-types";
import { getRarityTextStyle } from "@/utils/style-utils";
import { getMainstatDisplayValue } from "../utils/relic-format-utils";
import RollValue from "./roll-value";
import { useContext } from "react";
import { HsrDataContext } from "@/stores/database-store";

interface RelicDetailsProps {
  relic: Relic;
}
function RelicDetails({ relic }: RelicDetailsProps) {
  const { gameData } = useContext(HsrDataContext);
  const metadata = gameData.relic_sets[
    relic.set as keyof typeof gameData.relic_sets
  ]["pieces"][relic.slot] as RelicMetadata;

  return (
    <div className="text-sm">
      <div className="flex flex-wrap justify-between gap-x-2">
        <div className={`font-semibold ${getRarityTextStyle(relic.rarity)}`}>
          {metadata.name}
        </div>
        <div className="text-muted-foreground">+{relic.level}</div>
      </div>
      <Separator />
      <div className="m-2 flex flex-row justify-between bg-muted/25 font-bold">
        <div>{relic.mainstat}</div>
        <div>{getMainstatDisplayValue(relic)}</div>
      </div>
      <div className="font-semibold">Substat distribution</div>
      <Separator />
      <div className="grid grid-cols-1 p-2 text-sm font-medium">
        {relic.substats.map((substat, index) => (
          <div
            key={substat.key}
            className={`flex flex-row justify-between ${
              index % 2 === 0 ? "bg-muted/25" : ""
            }`}
          >
            <div>{substat.key.replace("_", "%")}</div>
            <div>
              <RollValue relic={relic} substat={substat} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelicDetails;
