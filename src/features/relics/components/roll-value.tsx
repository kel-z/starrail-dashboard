import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Info } from "lucide-react";
import {
  getSubstatDisplayText,
  getSubstatRollValue,
  getSubstatValue,
} from "../utils/relic-stat-utils";
import { Relic, RelicSubstat } from "@/types/user-data/hsr-scanner-types";

interface RollValueProps {
  relic: Relic;
  substat: RelicSubstat;
}
function RollValue({ relic, substat }: RollValueProps) {
  const value: number | number[] = getSubstatRollValue(substat, relic.rarity);

  if (!Array.isArray(value)) {
    return <>{(value * 100).toFixed(0)}%</>;
  }

  return (
    <Popover>
      <PopoverTrigger className="flex flex-wrap">
        <Info className="my-auto mr-1 inline-block h-3 w-3 text-muted-foreground" />
        <div>
          ~
          {((value.reduce((a, b) => a + b, 0) / value.length) * 100).toFixed(0)}
          %
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-1 font-bold">
            <div>Ambiguous substat roll value</div>
            <AlertTriangle className="inline-block h-3 w-3 text-muted-foreground" />
          </div>
          <Separator />
          <div className="text-center">
            <span className="font-semibold">
              {substat.key.replace("_", "")} {getSubstatDisplayText(substat)}
            </span>{" "}
            is one of
            <div className="flex flex-col rounded border p-2 font-semibold">
              {value.map((v) => (
                <div key={v} className="flex items-center justify-between">
                  {getSubstatValue(substat, relic.rarity, v).map((v) => (
                    <div key={v}>{v.toFixed(1)}</div>
                  ))}
                  <div>{v * 100}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default RollValue;
