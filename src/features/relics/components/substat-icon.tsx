import atkIcon from "@/assets/images/atk.png";
import defIcon from "@/assets/images/def.png";
import hpIcon from "@/assets/images/hp.png";
import spdIcon from "@/assets/images/spd.png";
import critDmgIcon from "@/assets/images/crit-dmg.png";
import critRateIcon from "@/assets/images/crit-rate.png";
import breakIcon from "@/assets/images/break.png";
import EffectHitIcon from "@/assets/images/effect-hit.png";
import EffectResIcon from "@/assets/images/effect-res.png";
import {
  RelicSubstat,
  RelicSubstatKey,
} from "@/types/user-data/hsr-scanner-types";

interface SubstatIconProps {
  substat: RelicSubstat;
}
export default function SubstatIcon({ substat }: SubstatIconProps) {
  const iconMap: Partial<Record<RelicSubstatKey, string>> = {
    HP: hpIcon,
    HP_: hpIcon,
    ATK: atkIcon,
    ATK_: atkIcon,
    DEF: defIcon,
    DEF_: defIcon,
    SPD: spdIcon,
    "CRIT Rate_": critRateIcon,
    "CRIT DMG_": critDmgIcon,
    "Effect Hit Rate_": EffectHitIcon,
    "Effect RES_": EffectResIcon,
    "Break Effect_": breakIcon,
  };

  return (
    <img
      src={iconMap[substat.key]}
      alt={substat.key}
      className="mr-1 h-5 w-5"
    />
  );
}
