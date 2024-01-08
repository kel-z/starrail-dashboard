import { LightCone } from "@/types/user-data/hsr-scanner-types";
import { GameData, LightConeMetadata } from "@/types/game-data-types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getRarityTextStyle } from "@/utils/style-utils";
import LightConeDetails from "./light-cone-details";
import CharacterSelect from "@/components/select-character";
import { useContext } from "react";
import { HsrDataContext } from "@/stores/database-store";
import { X } from "lucide-react";

interface LightConeCardProps {
  lightCone: LightCone;
}
function LightConeCard({ lightCone }: LightConeCardProps) {
  const { userData, setUserData, gameData } = useContext(HsrDataContext);
  const metadata = gameData.light_cones[lightCone.key] as LightConeMetadata;

  const deleteLightCone = () => {
    userData.light_cones = userData.light_cones.filter(
      (lc) => lc !== lightCone,
    );
    setUserData({ ...userData });
  };

  const onCharacterSelect = (
    character: (keyof GameData["characters"] & string) | null,
  ) => {
    if (!character) {
      lightCone.location = "";
      setUserData({ ...userData });
      return;
    }

    // If the character already has a light cone, swap them
    const prevLightCone = userData.light_cones.find(
      (lc) => lc.location === character,
    );
    if (prevLightCone) {
      prevLightCone.location = lightCone.location || "";
    }
    lightCone.location = character;

    setUserData({ ...userData });
  };

  return (
    <HoverCard>
      <div className="relative flex flex-col justify-between overflow-hidden">
        <X
          className="absolute right-2 top-2 h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          onClick={deleteLightCone}
        />
        <HoverCardTrigger className="my-auto">
          <div className="flex flex-row items-center px-2 pt-2">
            <img
              className="h-28 w-24 rounded"
              src={metadata.icon}
              alt={lightCone.key}
            />
            <div className="flex flex-1 flex-col p-2">
              <div
                className={`font-semibold ${getRarityTextStyle(
                  metadata.rarity,
                )}`}
              >
                {lightCone.key}
              </div>
              <div className="text-xl font-bold">
                Lv. {lightCone.level} / {20 + 10 * lightCone.ascension}
              </div>
              <div className="text-xs text-muted-foreground">
                Superimposition {lightCone.superimposition}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <CharacterSelect
          selected={lightCone.location}
          onCharacterSelect={onCharacterSelect}
        />
      </div>
      <HoverCardContent>
        <LightConeDetails {...{ lightCone, metadata }} />
      </HoverCardContent>
    </HoverCard>
  );
}

export default LightConeCard;
