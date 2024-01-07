import { CharacterMetadata } from "@/types/game-data-types";
import { Character } from "@/types/user-data/hsr-scanner-types";

interface CharacterEidolonsProps {
  character: Character;
  metadata: CharacterMetadata;
}
function CharacterEidolons({ character, metadata }: CharacterEidolonsProps) {
  const eidolonsActivated = character.eidolon;

  return (
    <div className="flex flex-wrap items-center gap-1">
      {metadata.eidolons.map((eidolon, index) => {
        return (
          <img
            src={eidolon.icon}
            alt={eidolon.name}
            className={`w-11 rounded-full border ${
              index < eidolonsActivated ? "" : "opacity-30"
            }`}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default CharacterEidolons;
