import { HsrDataContext } from "@/stores/database-store";
import { LightCone } from "@/types/user-data/hsr-scanner-types";
import { getRarityBorderColor } from "@/utils/style-utils";
import { useContext } from "react";

interface CharacterLightConeProps {
  lightCone: LightCone;
}
function CharacterLightCone({ lightCone }: CharacterLightConeProps) {
  const { gameData } = useContext(HsrDataContext);
  const metadata = gameData.light_cones[lightCone.key];

  return (
    <div>
      {lightCone.key}
      <img
        src={metadata.mini_icon}
        alt={metadata.desc}
        className={`h-20 w-20 rounded border ${getRarityBorderColor(
          metadata.rarity,
        )}`}
      />
    </div>
  );
}

export default CharacterLightCone;
