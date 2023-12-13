import { HsrDataContext } from "@/stores/database-store";
import { useContext, useState } from "react";
import { GameData } from "@/types/game-data-types";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, UserRoundMinus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

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
  const [open, setOpen] = useState(false);
  const characters = userData.characters
    .map((character) => character.key)
    .sort();
  const placeholder = (
    <div className="text-muted transition-colors group-hover:text-muted-foreground">
      Not equipped
    </div>
  );

  const selectText = (character: keyof GameData["characters"] & string) => {
    return (
      <div className="flex items-center gap-1 font-medium">
        <div className="relative h-8 w-8 overflow-hidden rounded-full border">
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
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="group w-full justify-between">
            {selected ? selectText(selected) : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search characters..." />
            <CommandEmpty>No characters found.</CommandEmpty>
            <ScrollArea className="h-[50vh]">
              <CommandGroup>
                {characters.map((character, i) => (
                  <CommandItem
                    key={i}
                    value={character}
                    onSelect={(value) => {
                      onCharacterSelect(
                        value.toLowerCase() === selected.toLowerCase()
                          ? null
                          : character,
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        character === selected ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {selectText(character)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
      {selected && (
        <Button
          variant="outline"
          className="group aspect-square p-0"
          onClick={() => onCharacterSelect(null)}
        >
          <UserRoundMinus
            size={20}
            strokeWidth={1}
            className={cn("text-muted-foreground transition-colors")}
          />
        </Button>
      )}
    </div>
  );
}

export default CharacterSelect;
