import { useContext, useState } from "react";
import { RelicSortOption } from "../types/relic-sort-types";
import { HsrDataContext } from "@/stores/database-store";
import TabLayout from "@/components/layouts/tab-layout";
import Scrollable from "@/components/scrollable";
import { SelectSort } from "@/features/select-sort";
import RelicCard from "../components/relic-card";
import { calculateScore } from "../utils/relic-sort-utils";

const itemsPerPage = 36;

const sortOptions: RelicSortOption[] = [
  {
    value: "level",
    label: "Level",
  },
  {
    value: "rarity",
    label: "Rarity",
  },
  {
    value: "name",
    label: "Name",
  },
  {
    value: "set",
    label: "Set",
  },
];

function RelicsPage() {
  const { userData, gameData } = useContext(HsrDataContext);
  const [sortBy, setSortBy] = useState<RelicSortOption>(sortOptions[0]);
  const [sortAsc, setSortAsc] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const doneLoading = userData.relics.length <= pageNum * itemsPerPage;
  const displayedRelics = [...userData.relics]
    .sort((a, b) => {
      switch (sortBy.value) {
        case "name":
          const aMetadata = gameData.relic_sets[a.set].pieces[a.slot] || null;
          const bMetadata = gameData.relic_sets[b.set].pieces[b.slot] || null;
          if (!aMetadata || !bMetadata) {
            return 0;
          }
          return sortAsc
            ? aMetadata.name.localeCompare(bMetadata.name)
            : bMetadata.name.localeCompare(aMetadata.name);
        case "set":
          return sortAsc
            ? a.set.localeCompare(b.set)
            : b.set.localeCompare(a.set);
        default:
          const scoreA = calculateScore(sortBy, a);
          const scoreB = calculateScore(sortBy, b);
          return sortAsc ? scoreA - scoreB : scoreB - scoreA;
      }
    })
    .slice(0, pageNum * itemsPerPage);

  const loadMore = () => {
    setPageNum(pageNum + 1);
  };

  return (
    <TabLayout>
      <Scrollable loadMore={loadMore} doneLoading={doneLoading}>
        <div className="mb-2 flex flex-wrap justify-between sm:flex-row">
          <h1 className="rounded text-2xl font-bold">Relics</h1>
          <SelectSort
            sortOptions={sortOptions}
            sortBy={sortBy}
            sortAsc={sortAsc}
            setSortBy={setSortBy}
            setSortAsc={setSortAsc}
          />
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayedRelics.map((r, i) => (
            <RelicCard
              key={i}
              relic={r}
            />
          ))}
        </div>
      </Scrollable>
    </TabLayout>
  );
}

export default RelicsPage;
