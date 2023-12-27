import { Relic } from "@/types/user-data/hsr-scanner-types";
import { GameData, RelicMetadata } from "@/types/game-data-types";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { getRarityTextStyle } from "@/utils/style-utils";
import CharacterSelect from "@/components/select-character";
import { useContext } from "react";
import { HsrDataContext } from "@/stores/database-store";
import { X } from "lucide-react";
import RelicSubstats from "./relic-substats";
import { Separator } from "@/components/ui/separator";
import RelicHoverCardContent from "./relic-hover";

interface LightConeCardProps {
  relic: Relic;
}
function RelicCard({ relic }: LightConeCardProps) {
  const { userData, setUserData, gameData } = useContext(HsrDataContext);
  const metadata = gameData.relic_sets[
    relic.set as keyof typeof gameData.relic_sets
  ]["pieces"][relic.slot] as RelicMetadata;

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
    const prevRelic = userData.relics.find(
      (r) => r.location === character && r.slot === relic.slot,
    );
    if (prevRelic) {
      prevRelic.location = relic.location || "";
    }
    relic.location = character;

    setUserData({ ...userData });
  };

  return (
    <HoverCard>
      <div className="relative flex flex-col justify-between overflow-hidden rounded border">
        <X
          className="absolute right-2 top-2 h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          onClick={deleteRelic}
        />
        <HoverCardTrigger className="flex h-full flex-col justify-between gap-2">
          <div className="my-auto flex flex-row items-center px-2 pt-2">
            <img
              className="h-24 w-24 rounded"
              src={metadata.icon}
              alt={metadata.name}
            />
            <div className="flex flex-1 flex-col p-2">
              <div
                className={`text-sm font-semibold ${getRarityTextStyle(
                  relic.rarity,
                )}`}
              >
                {metadata.name}
              </div>
              <div className="text-lg font-bold">{relic.mainstat}</div>
              <div className="text-xs text-muted-foreground">
                {relic.slot} +{relic.level}
              </div>
            </div>
          </div>
          <Separator />
          <RelicSubstats {...{ relic }} />
        </HoverCardTrigger>
        <CharacterSelect
          selected={relic.location}
          onCharacterSelect={onCharacterSelect}
        />
      </div>
      <RelicHoverCardContent {...{ relic, metadata }} />
    </HoverCard>
  );
}

export default RelicCard;
