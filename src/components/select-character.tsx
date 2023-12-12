import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HsrDataContext } from "@/stores/database-store";
import { useContext } from "react";
import { GameData } from "@/types/game-data-types";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";

interface CharacterSelectProps {
  selected: keyof GameData["characters"] & string;
  onCharacterSelect: (
    key: (keyof GameData["characters"] & string) | null,
  ) => void;
}
function CharacterSelect({
  selected,
  onCharacterSelect,
}: CharacterSelectProps) {
  const { userData, gameData, isTrailblazerFemale } =
    useContext(HsrDataContext);
  const characters = userData.characters
    .map((character) => character.key)
    .sort();
  const placeholder = <div className="text-muted">Not equipped</div>;

  const selectText = (character: keyof GameData["characters"] & string) => {
    return (
      <div className="flex items-center gap-1 font-medium">
        <div className="relative hidden h-8 w-8 overflow-hidden rounded-full border md:block">
          <img
            className="absolute top-[40%] scale-[200%]"
            src={
              gameData.characters[
                character.includes("Trailblazer")
                  ? isTrailblazerFemale
                    ? character + "#F"
                    : character + "#M"
                  : character
              ]?.icon
            }
            alt={character}
          />
        </div>
        {character.includes("Trailblazer") ? "Trailblazer" : character}
      </div>
    );
  };

  return (
    <div className="flex gap-2 p-2">
      <Select value={selected} onValueChange={onCharacterSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder}>
            {selectText(selected)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {characters.map((character, i) => (
            <SelectItem key={i} value={character}>
              {selectText(character)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selected && (
        <Button
          variant="outline"
          className="group aspect-square"
          onClick={() => onCharacterSelect(null)}
        >
          <FontAwesomeIcon
            className="text-muted-foreground transition-colors group-hover:text-accent-foreground"
            icon={regular("circle-xmark")}
          />
        </Button>
      )}
    </div>
  );
}

export default CharacterSelect;
