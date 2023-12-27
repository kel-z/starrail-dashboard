import { HoverCardContent } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { getLightConeStats } from "@/features/light-cones/utils/light-cone-stat-utils";
import { getRarityTextStyle } from "@/utils/style-utils";
import { LightConeMetadata } from "@/types/game-data-types";
import { LightCone } from "@/types/user-data/hsr-scanner-types";
import { formatDesc } from "@/utils/format-utils";

interface LightConeHoverCardContentProps {
  lightCone: LightCone;
  metadata: LightConeMetadata;
}
function LightConeHoverCardContent({
  lightCone,
  metadata,
}: LightConeHoverCardContentProps) {
  const stats = getLightConeStats(
    metadata,
    lightCone.level,
    lightCone.ascension,
  );

  return (
    <HoverCardContent className="text-sm">
      <div className="flex flex-wrap justify-between gap-x-2">
        <div className={`font-semibold ${getRarityTextStyle(metadata.rarity)}`}>
          {lightCone.key}
        </div>
        <div className="text-muted-foreground">
          Lv. {lightCone.level} / {20 + 10 * lightCone.ascension}
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 grid-rows-3 p-2 font-medium">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="flex flex-row justify-between">
            <div>{key.toUpperCase()}</div>
            <div>{Math.floor(value)}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="font-semibold">{metadata.ability.name}</div>
        <div className="text-muted-foreground">
          S{lightCone.superimposition}
        </div>
      </div>
      <Separator />
      <div className="p-2 text-xs">
        {formatDesc(
          metadata.ability.desc,
          metadata.ability.params[lightCone.superimposition - 1],
        )}
      </div>
    </HoverCardContent>
  );
}

export default LightConeHoverCardContent;
