import atkIcon from "@/assets/images/atk.png";
import defIcon from "@/assets/images/def.png";
import hpIcon from "@/assets/images/hp.png";
import spdIcon from "@/assets/images/spd.png";
import critDmgIcon from "@/assets/images/crit-dmg.png";
import critRateIcon from "@/assets/images/crit-rate.png";
import breakIcon from "@/assets/images/break.png";
import effectHitIcon from "@/assets/images/effect-hit.png";
import windIcon from "@/assets/images/wind.png";
import fireIcon from "@/assets/images/fire.png";
import iceIcon from "@/assets/images/ice.png";
import lightningIcon from "@/assets/images/lightning.png";
import quantumIcon from "@/assets/images/quantum.png";
import imaginaryIcon from "@/assets/images/imaginary.png";
import physicalIcon from "@/assets/images/physical.png";
import energyIcon from "@/assets/images/energy.png";
import healIcon from "@/assets/images/heal.png";

import { RelicMainstatKey } from "@/types/user-data/hsr-scanner-types";

interface MainstatIconProps {
  mainstat: RelicMainstatKey;
}
export default function MainstatIcon({ mainstat }: MainstatIconProps) {
  const iconMap: Record<RelicMainstatKey, string> = {
    HP: hpIcon,
    ATK: atkIcon,
    DEF: defIcon,
    SPD: spdIcon,
    "CRIT Rate": critRateIcon,
    "CRIT DMG": critDmgIcon,
    "Effect Hit Rate": effectHitIcon,
    "Break Effect": breakIcon,
    "Wind DMG Boost": windIcon,
    "Fire DMG Boost": fireIcon,
    "Ice DMG Boost": iceIcon,
    "Lightning DMG Boost": lightningIcon,
    "Quantum DMG Boost": quantumIcon,
    "Imaginary DMG Boost": imaginaryIcon,
    "Physical DMG Boost": physicalIcon,
    "Energy Regeneration Rate": energyIcon,
    "Outgoing Healing Boost": healIcon,
  };

  return <img src={iconMap[mainstat]} alt={mainstat} className="h-6 w-6" />;
}
