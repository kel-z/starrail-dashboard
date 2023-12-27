import { HsrDataContext } from "@/stores/database-store";
import { RelicSlot } from "@/types/game-data-types";
import { Relic } from "@/types/user-data/hsr-scanner-types";
import { getRarityBorderColor } from "@/utils/style-utils";
import { useContext } from "react";

interface CharacterRelicProps {
  relic: Relic;
}
function CharacterRelic({ relic }: CharacterRelicProps) {
  const { gameData } = useContext(HsrDataContext);
  const relicMetadata =
    gameData.relic_sets[relic.set].pieces[relic.slot as RelicSlot];

  return (
    <div
      key={relic.slot}
      className={`flex items-center justify-center rounded border bg-background/50 p-3 ${getRarityBorderColor(
        relic.rarity,
      )}`}
    >
      <img
        src={relicMetadata?.icon}
        alt={relicMetadata?.name}
        className="w-20"
      />
    </div>
  );
}

export default CharacterRelic;
