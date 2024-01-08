import { CharacterStatKey } from "@/types/game-data-types";
import hpIcon from "@/assets/images/hp.png";
import atkIcon from "@/assets/images/atk.png";
import defIcon from "@/assets/images/def.png";
import spdIcon from "@/assets/images/spd.png";
import effectHitIcon from "@/assets/images/effect-hit.png";
import effectResIcon from "@/assets/images/effect-res.png";
import critRateIcon from "@/assets/images/crit-rate.png";
import critDmgIcon from "@/assets/images/crit-dmg.png";
import windIcon from "@/assets/images/wind.png";
import fireIcon from "@/assets/images/fire.png";
import iceIcon from "@/assets/images/ice.png";
import lightningIcon from "@/assets/images/lightning.png";
import quantumIcon from "@/assets/images/quantum.png";
import imaginaryIcon from "@/assets/images/imaginary.png";
import physicalIcon from "@/assets/images/physical.png";
import energyIcon from "@/assets/images/energy.png";
import healIcon from "@/assets/images/heal.png";
import breakIcon from "@/assets/images/break.png";
import { Target } from "lucide-react";

export const statsDisplayTextMap: Record<CharacterStatKey, string> = {
  hp: "HP",
  atk: "ATK",
  def: "DEF",
  spd: "SPD",
  effect_hit: "Effect Hit Rate",
  effect_res: "Effect RES",
  crit_rate: "CRIT Rate",
  crit_dmg: "CRIT DMG",
  wind: "Wind DMG Boost",
  fire: "Fire DMG Boost",
  ice: "Ice DMG Boost",
  lightning: "Lightning DMG Boost",
  quantum: "Quantum DMG Boost",
  imaginary: "Imaginary DMG Boost",
  physical: "Physical DMG Boost",
  energy: "Energy Regeneration Rate",
  heal: "Outgoing Healing Boost",
  break: "Break Effect",
  taunt: "Taunt",
};

export const statsDisplayIconMap = (statKey: CharacterStatKey) => {
  const iconMap: Partial<Record<CharacterStatKey, string>> = {
    hp: hpIcon,
    atk: atkIcon,
    def: defIcon,
    spd: spdIcon,
    effect_hit: effectHitIcon,
    effect_res: effectResIcon,
    crit_rate: critRateIcon,
    crit_dmg: critDmgIcon,
    wind: windIcon,
    fire: fireIcon,
    ice: iceIcon,
    lightning: lightningIcon,
    quantum: quantumIcon,
    imaginary: imaginaryIcon,
    physical: physicalIcon,
    energy: energyIcon,
    heal: healIcon,
    break: breakIcon,
  };

  switch (statKey) {
    case "taunt":
      return <Target strokeWidth={2} className="h-6 w-6 scale-[80%]" />;
    default:
      return <img src={iconMap[statKey]} className="h-6 w-6" />;
  }
};

export const getStatDisplayValue = (
  statKey: CharacterStatKey,
  value: number,
) => {
  switch (statKey) {
    case "effect_hit":
    case "effect_res":
    case "crit_rate":
    case "crit_dmg":
    case "energy":
    case "heal":
    case "break":
    case "wind":
    case "fire":
    case "ice":
    case "lightning":
    case "quantum":
    case "imaginary":
    case "physical":
      return `${(Math.floor(value * 1000) / 10).toFixed(1)}%`;
    default:
      return Math.floor(value).toString();
  }
};
