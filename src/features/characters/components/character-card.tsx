import { Character } from "@/types/user-data/hsr-scanner-types";
import { CharacterMetadata } from "@/types/game-data-types";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { useContext, useRef } from "react";
import { HsrDataContext } from "@/stores/database-store";
import { Download, X } from "lucide-react";
import { toPng } from "html-to-image";
import CharacterTraces from "./character-traces";
import { getAllCharacterStats } from "../utils/character-stats-utils";
import CharacterStats from "./character-stats";

interface CharacterCardProps {
  character: Character;
  metadata: CharacterMetadata;
}
function CharacterCard({ character, metadata }: CharacterCardProps) {
  const { userData, setUserData } = useContext(HsrDataContext);
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

  console.log(character.key, getAllCharacterStats(character, metadata));

  return (
    <HoverCard>
      <div className="relative flex flex-col justify-between overflow-hidden rounded border bg-background font-din-alternate font-bold">
        <X
          className="absolute right-2 top-2 z-50 h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          onClick={deleteCharacter}
        />
        <Download
          className="absolute right-12 top-2 z-50 h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          onClick={downloadImage}
        />
        <HoverCardTrigger className="my-auto">
          <div
            className="flex h-fit flex-row overflow-hidden p-2"
            ref={componentRef}
          >
            <div className="relative w-72">
              <img
                className="absolute left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 scale-[200%] transform"
                src={metadata.splash}
                alt={character.key}
              />
            </div>
            <div className="z-10 grid h-full flex-1 grid-cols-1 rounded bg-muted/50 p-2 backdrop-blur-lg">
              <div className="text-2xl">
                {displayName}
                {/* <div className="text-2xl font-medium text-yellow-400">
                  {"★".repeat(metadata.rarity)}
                </div> */}
              </div>
              <div className="text-lg">
                Lv. {character.level}{" "}
                <span className="text-muted-foreground">
                  / {20 + 10 * character.ascension}
                </span>
              </div>
              <div className="flex gap-2">
                <div className="w-1/2 rounded bg-background/50 p-3">
                  <CharacterStats {...{ character, metadata }} />
                </div>
                <div className="flex w-1/2 items-center rounded bg-background/50 p-3">
                  <CharacterTraces {...{ character, metadata }} />
                </div>
              </div>
            </div>
          </div>
        </HoverCardTrigger>
      </div>
    </HoverCard>
  );
}

export default CharacterCard;
