import { LightConeDetails } from "@/features/light-cones";
import { HsrDataContext } from "@/stores/database-store";
import { LightCone } from "@/types/user-data/hsr-scanner-types";
import { HTMLAttributes, useContext } from "react";

interface CharacterLightConeProps {
  lightCone: LightCone;
  props?: HTMLAttributes<HTMLDivElement>;
}
function CharacterLightCone({ lightCone }: CharacterLightConeProps) {
  const { gameData } = useContext(HsrDataContext);
  const metadata = gameData.light_cones[lightCone.key];

  return (
    <div className="flex flex-col items-center rounded border bg-background/50 p-3">
      <img
        src={metadata.mini_icon}
        alt={metadata.desc}
        className="h-20 w-20 rounded"
      />
      <LightConeDetails lightCone={lightCone} />
    </div>
  );
}

export default CharacterLightCone;
