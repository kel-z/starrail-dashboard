import { LightCone } from "@/types/user-data/hsr-scanner-types";
import { GameData, LightConeMetadata } from "@/types/game-data-types";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { getRarityStyle } from "@/utils/style-utils";
import LightConeHoverCardContent from "./light-cone-hover";
import CharacterSelect from "@/components/select-character";
import { useContext } from "react";
import { HsrDataContext } from "@/stores/database-store";
import { X } from "lucide-react";

interface LightConeCardProps {
  lc: LightCone;
  metadata: LightConeMetadata;
}
function LightConeCard({ lc, metadata }: LightConeCardProps) {
  const { userData, setUserData } = useContext(HsrDataContext);

  const deleteLightCone = () => {
    userData.light_cones = userData.light_cones.filter(
      (lightCone) => lightCone !== lc,
    );
    setUserData({ ...userData });
  };

  const onCharacterSelect = (
    character: (keyof GameData["characters"] & string) | null,
  ) => {
    if (!character) {
      lc.location = "";
      setUserData({ ...userData });
      return;
    }

    // If the character already has a light cone, swap them
    const prevLightCone = userData.light_cones.find(
      (lc) => lc.location === character,
    );
    if (prevLightCone) {
      prevLightCone.location = lc.location || "";
    }
    lc.location = character;

    setUserData({ ...userData });
  };

  return (
    <HoverCard>
      <div className="relative flex flex-col justify-between overflow-hidden rounded border">
        <X
          className="absolute right-2 top-2 h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          onClick={deleteLightCone}
        />
        <HoverCardTrigger className="my-auto">
          <div className="flex flex-row items-center px-2 pt-2">
            <img
              className="h-28 w-24 rounded"
              src={metadata.icon}
              alt={lc.key}
            />
            <div className="flex flex-1 flex-col p-2">
              <div
                className={`text-sm font-semibold ${getRarityStyle(
                  metadata.rarity,
                )}`}
              >
                {lc.key}
              </div>
              <div className="text-xl font-bold">
                Lv. {lc.level} / {20 + 10 * lc.ascension}
              </div>
              <div className="text-xs text-muted-foreground">
                Superimposition {lc.superimposition}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <CharacterSelect
          selected={lc.location}
          onCharacterSelect={onCharacterSelect}
        />
      </div>
      <LightConeHoverCardContent {...{ lc, metadata }} />
    </HoverCard>
  );
}

export default LightConeCard;
