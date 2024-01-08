import atkIcon from "@/assets/images/atk.png";
import defIcon from "@/assets/images/def.png";
import hpIcon from "@/assets/images/hp.png";
import spdIcon from "@/assets/images/spd.png";
import critDmgIcon from "@/assets/images/crit-dmg.png";
import critRateIcon from "@/assets/images/crit-rate.png";
import breakIcon from "@/assets/images/break.png";
import effectHitIcon from "@/assets/images/effect-hit.png";
import effectResIcon from "@/assets/images/effect-res.png";
import {
  RelicSubstat,
  RelicSubstatKey,
} from "@/types/user-data/hsr-scanner-types";

interface SubstatIconProps {
  substat: RelicSubstat;
}
export default function SubstatIcon({ substat }: SubstatIconProps) {
  const iconMap: Record<RelicSubstatKey, string> = {
    HP: hpIcon,
    HP_: hpIcon,
    ATK: atkIcon,
    ATK_: atkIcon,
    DEF: defIcon,
    DEF_: defIcon,
    SPD: spdIcon,
    "CRIT Rate_": critRateIcon,
    "CRIT DMG_": critDmgIcon,
    "Effect Hit Rate_": effectHitIcon,
    "Effect RES_": effectResIcon,
    "Break Effect_": breakIcon,
  };

  return (
    <img src={iconMap[substat.key]} alt={substat.key} className="h-6 w-6" />
  );
}
