import { HoverCardContent } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { RelicMetadata } from "@/types/game-data-types";
import { Relic } from "@/types/user-data/hsr-scanner-types";
import { getRarityStyle } from "@/utils/style-utils";
import { getMainstatDisplayValue } from "../utils/relic-format-utils";
import RollValue from "./roll-value";

interface RelicHoverCardContentProps {
  relic: Relic;
  metadata: RelicMetadata;
}
function RelicHoverCardContent({
  relic,
  metadata,
}: RelicHoverCardContentProps) {
  return (
    <HoverCardContent className="text-sm">
      <div className="flex flex-wrap justify-between gap-x-2">
        <div className={`font-semibold ${getRarityStyle(relic.rarity)}`}>
          {metadata.name}
        </div>
        <div className="text-muted-foreground">+{relic.level}</div>
      </div>
      <Separator />
      <div className="flex flex-row justify-between p-2 font-bold">
        <div>{relic.mainstat}</div>
        <div>{getMainstatDisplayValue(relic)}</div>
      </div>
      <div className="font-semibold">Substat distribution</div>
      <Separator />
      <div className="grid grid-cols-1 p-2 text-sm font-medium">
        {relic.substats.map((substat) => (
          <div key={substat.key} className="flex flex-row justify-between">
            <div>{substat.key.replace("_", "%")}</div>
            <div>
              <RollValue relic={relic} substat={substat} />
            </div>
          </div>
        ))}
      </div>
    </HoverCardContent>
  );
}

export default RelicHoverCardContent;
