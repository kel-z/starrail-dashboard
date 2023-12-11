import { HsrDataContext } from "@/stores/database-store";
import { useContext, useState } from "react";
import LightConeCard from "./components/LightConeCard";
import TabLayout from "@/components/layouts/tab-layout";
import LightConeHoverCardContent from "./components/LightConeHoverContent";
import Scrollable from "@/components/ui/scrollable";
import { SortOption } from "@/types/app";
import SelectSort from "@/components/ui/select-sort";

const itemsPerPage = 24;

const sortOptions: SortOption[] = [
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
];

function LightCones() {
  const { userData, gameData } = useContext(HsrDataContext);
  const [sortBy, setSortBy] = useState<SortOption>(sortOptions[0]);
  const [sortAsc, setSortAsc] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const loadMore = () => {
    setPageNum(pageNum + 1);
  };
  const doneLoading = userData.light_cones.length <= pageNum * itemsPerPage;

  let displayedLightCones = [...userData.light_cones];
  displayedLightCones = displayedLightCones
    .sort((a, b) => {
      const aMetadata =
        gameData.light_cones[a.key as keyof typeof gameData.light_cones];
      const bMetadata =
        gameData.light_cones[b.key as keyof typeof gameData.light_cones];

      switch (sortBy.value) {
        case "level":
          return sortAsc
            ? a.level * 100 +
                aMetadata.rarity -
                (b.level * 100 + bMetadata.rarity)
            : b.level * 100 +
                bMetadata.rarity -
                (a.level * 100 + aMetadata.rarity);
        case "rarity":
          return sortAsc
            ? aMetadata.rarity * 100 +
                a.level -
                (bMetadata.rarity * 100 + b.level)
            : bMetadata.rarity * 100 +
                b.level -
                (aMetadata.rarity * 100 + a.level);
        case "name":
          return sortAsc
            ? a.key.localeCompare(b.key)
            : b.key.localeCompare(a.key);
        default:
          return 0;
      }
    })
    .slice(0, pageNum * itemsPerPage);

  return (
    <TabLayout>
      <Scrollable loadMore={loadMore} doneLoading={doneLoading}>
        <div className="mb-2 flex flex-wrap justify-between sm:flex-row">
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
          {displayedLightCones.map((lc, i) => (
            <LightConeCard
              key={i}
              lc={lc}
              metadata={
                gameData.light_cones[
                  lc.key as keyof typeof gameData.light_cones
                ]
              }
            />
          ))}
        </div>
      </Scrollable>
    </TabLayout>
  );
}

export { LightConeHoverCardContent };
export default LightCones;
