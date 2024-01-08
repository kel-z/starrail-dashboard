import { RelicSortOption } from "./types/relic-sort-types";
import RelicsPage from "./routes/relics-page";
import { getSubstatDisplayText } from "./utils/relic-stat-utils";
import MainstatIcon from "./components/mainstat-icon";
import SubstatIcon from "./components/substat-icon";

export type { RelicSortOption };
export { RelicsPage, getSubstatDisplayText, SubstatIcon, MainstatIcon };
