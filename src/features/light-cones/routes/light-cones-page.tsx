import { useContext, useState } from "react";
import { LightConeSortOption } from "../types/light-cone-sort-types";
import { HsrDataContext } from "@/stores/database-store";
import TabLayout from "@/components/layouts/tab-layout";
import { calculateScore } from "../utils/light-cone-sort-utils";
import Scrollable from "@/components/scrollable";
import { SelectSort } from "@/features/select-sort";
import LightConeCard from "../components/light-cone-card";

const itemsPerPage = 36;

const sortOptions: LightConeSortOption[] = [
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

function LightConesPage() {
  const { userData, gameData } = useContext(HsrDataContext);
  const [sortBy, setSortBy] = useState<LightConeSortOption>(sortOptions[0]);
  const [sortAsc, setSortAsc] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const doneLoading = userData.light_cones.length <= pageNum * itemsPerPage;
  const displayedLightCones = [...userData.light_cones]
    .sort((a, b) => {
      const aMetadata = gameData.light_cones[a.key];
      const bMetadata = gameData.light_cones[b.key];

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
          <h1 className="rounded text-2xl font-bold">Light Cones</h1>
          <SelectSort
            sortOptions={sortOptions}
            sortBy={sortBy}
            sortAsc={sortAsc}
            setSortBy={setSortBy}
            setSortAsc={setSortAsc}
          />
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayedLightCones.map((lightCone, i) => (
            <div key={i} className="rounded border">
              <LightConeCard lightCone={lightCone} />
            </div>
          ))}
        </div>
      </Scrollable>
    </TabLayout>
  );
}

export default LightConesPage;
