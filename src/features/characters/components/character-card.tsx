import { Character, Relic } from "@/types/user-data/hsr-scanner-types";
import { CharacterMetadata, RelicSlot } from "@/types/game-data-types";
import { useContext, useRef } from "react";
import { HsrDataContext } from "@/stores/database-store";
import { Download, X } from "lucide-react";
import { toPng } from "html-to-image";
import CharacterTraces from "./character-traces";
import CharacterStats from "./character-stats";
import CharacterLightCone from "./character-light-cone";
import CharacterRelic from "./character-relic";
import CharacterSetBonuses from "./character-set-bonuses";
import CharacterEidolons from "./character-eidolons";

interface CharacterCardProps {
  character: Character;
}
function CharacterCard({ character }: CharacterCardProps) {
  const { userData, setUserData, gameData, isTrailblazerFemale } =
    useContext(HsrDataContext);

  const characterKey = character.key.startsWith("Trailblazer")
    ? character.key + (isTrailblazerFemale ? "#F" : "#M")
    : character.key;
  const metadata = gameData.characters[characterKey] as CharacterMetadata;
  const componentRef = useRef<HTMLDivElement>(null);
  const displayName = character.key.startsWith("Trailblazer")
    ? "Trailblazer"
    : character.key;

  const deleteCharacter = () => {
    userData.characters = userData.characters.filter((c) => c !== character);
    setUserData({ ...userData });
  };

  const downloadImage = () => {
    if (!componentRef.current) {
      return;
    }

    const fileName = `${character.key}.png`;
    toPng(componentRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    });
  };

  const equippedLightCone = userData.light_cones.find(
    (lc) => lc.location === character.key,
  );

  const equippedRelics: Record<RelicSlot, Relic | null> = {
    Head: null,
    Hands: null,
    Body: null,
    Feet: null,
    "Planar Sphere": null,
    "Link Rope": null,
  };

  userData.relics.forEach((relic) => {
    if (relic.location === character.key) {
      equippedRelics[relic.slot] = relic;
    }
  });

  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded border font-din-alternate font-bold">
      <X
        className="absolute right-2 top-2 z-50 h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
        onClick={deleteCharacter}
      />
      <Download
        className="absolute right-12 top-2 z-50 h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
        onClick={downloadImage}
      />
      <div
        className="flex h-fit flex-col overflow-hidden bg-background lg:flex-row"
        ref={componentRef}
      >
        <div className="relative mx-auto h-96 scale-150 md:w-64 lg:h-auto lg:scale-100 xl:w-[30rem]">
          <img
            className="absolute left-1/2 top-1/2 aspect-square h-full min-w-fit -translate-x-1/2 -translate-y-1/2 transform"
            src={metadata.splash}
            alt={character.key}
          />
        </div>
        <div className="z-10 flex h-full flex-1 flex-col gap-1 bg-background/75 p-3 backdrop-blur-lg">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <div className="text-2xl">{displayName}</div>
              <div className="flex flex-wrap gap-1 text-lg">
                Lv. {character.level}
                <p className="text-muted-foreground">
                  / {20 + 10 * character.ascension}
                </p>
              </div>
            </div>
            <CharacterEidolons {...{ character, metadata }} />
          </div>
          <div className="flex flex-col gap-1 lg:flex-row">
            <div className=" flex-1 rounded border bg-background/50 p-3">
              <CharacterStats {...{ character, metadata }} />
            </div>
            <div className="flex items-center rounded border bg-background/50 p-3 lg:w-[24rem]">
              <CharacterTraces {...{ character, metadata }} />
            </div>
          </div>
          {equippedLightCone && (
            <div className="grid gap-1 rounded md:grid-cols-4 md:grid-rows-2">
              <div className="col-start-1 row-span-2 row-start-1">
                <CharacterLightCone lightCone={equippedLightCone} />
              </div>
              {Object.entries(equippedRelics).map(([slot, relic]) => {
                if (!relic) {
                  return null;
                }
                return <CharacterRelic key={slot} relic={relic} />;
              })}
            </div>
          )}
          <CharacterSetBonuses relics={Object.values(equippedRelics)} />
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
