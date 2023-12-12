import { useContext, useState } from "react";
import { RelicSortOption } from "../types/sort-types";
import { HsrDataContext } from "@/stores/database-store";
import TabLayout from "@/components/layouts/tab-layout";
import Scrollable from "@/components/scrollable";
import { SelectSort } from "@/features/select-sort";
import RelicCard from "../components/relic-card";

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
  const displayedRelics = [...userData.relics].slice(0, pageNum * itemsPerPage);

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
              metadata={
                gameData.relic_sets[r.set as keyof typeof gameData.relic_sets][
                  "pieces"
                ][r.slot] || null
              }
            />
          ))}
        </div>
      </Scrollable>
    </TabLayout>
  );
}

export default RelicsPage;
