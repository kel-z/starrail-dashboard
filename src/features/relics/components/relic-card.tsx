import { Relic } from "@/types/user-data/hsr-scanner-types";
import { GameData, RelicMetadata } from "@/types/game-data-types";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { getRarityStyle } from "@/utils/style-utils";
import CharacterSelect from "@/components/select-character";
import { useContext } from "react";
import { HsrDataContext } from "@/stores/database-store";

interface LightConeCardProps {
  relic: Relic;
  metadata: RelicMetadata | null;
}
function RelicCard({ relic, metadata }: LightConeCardProps) {
  const { userData, setUserData } = useContext(HsrDataContext);
  if (!metadata) {
    return null;
  }

  const deleteRelic = () => {
    userData.relics = userData.relics.filter((r) => r !== relic);
    setUserData({ ...userData });
  };

  const onCharacterSelect = (
    character: (keyof GameData["characters"] & string) | null,
  ) => {
    if (!character) {
      relic.location = "";
      setUserData({ ...userData });
      return;
    }

    // If the character already has a relic, swap them
    const prevRelic = userData.relics.find((r) => r.location === character);
    if (prevRelic) {
      prevRelic.location = relic.location || "";
    }
    relic.location = character;

    setUserData({ ...userData });
  };

  return (
    <HoverCard>
      <div className="relative flex flex-col justify-between overflow-hidden rounded border">
        <div
          className="absolute right-2 top-1 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          onClick={deleteRelic}
        >
          ✕
        </div>
        <HoverCardTrigger className="my-auto">
          <div className="flex flex-row items-center px-2 pt-2">
            <img
              className="h-24 w-24 rounded"
              src={metadata.icon}
              alt={metadata.name}
            />
            <div className="flex flex-1 flex-col p-2 text-sm">
              <div
                className={`text-base font-semibold ${getRarityStyle(
                  relic.rarity,
                )}`}
              >
                {metadata.name}
              </div>
              <div className="font-medium">+{relic.level}</div>
            </div>
          </div>
        </HoverCardTrigger>
        <CharacterSelect
          selected={relic.location}
          onCharacterSelect={onCharacterSelect}
        />
      </div>
      {/* <LightConeHoverCardContent {...{ lc, metadata }} /> */}
    </HoverCard>
  );
}

export default RelicCard;
