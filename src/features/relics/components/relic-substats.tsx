import { Relic } from "@/types/user-data/hsr-scanner-types";
import { getSubstatDisplayText } from "../utils/relic-stat-utils";

interface RelicSubstatsProps {
  relic: Relic;
}
function RelicSubstats({ relic }: RelicSubstatsProps) {
  return (
    <div className="grid grid-cols-2 flex-row flex-wrap justify-evenly gap-2 p-2 xl:flex">
      {relic.substats.map((substat, i) => {
        return (
          <div className="flex flex-col items-center" key={i}>
            <div className="text-xs">{substat.key.replace("_", "")}</div>
            <div className="font-semibold">
              {getSubstatDisplayText(substat)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RelicSubstats;
