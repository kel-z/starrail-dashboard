import { useContext, useState } from "react";
import { HsrDataContext } from "@/stores/database-store";
import TabLayout from "@/components/layouts/tab-layout";
import Scrollable from "@/components/scrollable";
import { SelectSort } from "@/features/select-sort";
import { CharacterSortOption } from "../types/character-sort-type";
import { calculateScore } from "../utils/character-sort-utils";
import CharacterCard from "../components/character-card";

const itemsPerPage = 4;

const sortOptions: CharacterSortOption[] = [
  {
    value: "level",
    label: "Level",
  },
  {
    value: "rarity",
    label: "Rarity",
  },
  {
    value: "key",
    label: "Name",
  },
];

function CharactersPage() {
  const { userData, gameData, isTrailblazerFemale } =
    useContext(HsrDataContext);
  const [sortBy, setSortBy] = useState<CharacterSortOption>(sortOptions[0]);
  const [sortAsc, setSortAsc] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const doneLoading = userData.characters.length <= pageNum * itemsPerPage;
  const displayedCharacters = [...userData.characters]
    .sort((a, b) => {
      const aKey = a.key.startsWith("Trailblazer")
        ? a.key + (isTrailblazerFemale ? "#F" : "#M")
        : a.key;
      const bKey = b.key.startsWith("Trailblazer")
        ? b.key + (isTrailblazerFemale ? "#F" : "#M")
        : b.key;
      const aMetadata = gameData.characters[aKey];
      const bMetadata = gameData.characters[bKey];

      if (sortBy.value === "key") {
        return sortAsc
          ? a.key.localeCompare(b.key)
          : b.key.localeCompare(a.key);
      }

      const scoreA = calculateScore(sortBy, a, aMetadata);
      const scoreB = calculateScore(sortBy, b, bMetadata);

      return sortAsc ? scoreA - scoreB : scoreB - scoreA;
    })
    .slice(0, pageNum * itemsPerPage);

  const loadMore = () => {
    setPageNum(pageNum + 1);
  };

  return (
    <TabLayout>
      <Scrollable loadMore={loadMore} doneLoading={doneLoading}>
        <div className="mb-2 flex flex-wrap justify-between gap-2 sm:flex-row">
          <h1 className="rounded text-2xl font-bold">Characters</h1>
          <SelectSort
            sortOptions={sortOptions}
            sortBy={sortBy}
            sortAsc={sortAsc}
            setSortBy={setSortBy}
            setSortAsc={setSortAsc}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          {displayedCharacters.map((character, i) => {
            return <CharacterCard key={i} character={character} />;
          })}
        </div>
      </Scrollable>
    </TabLayout>
  );
}

export default CharactersPage;
