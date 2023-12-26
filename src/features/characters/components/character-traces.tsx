import getHarmonyTraceClasses from "../utils/trace-utils/harmony";
import getDestructionTraceClasses from "../utils/trace-utils/destruction";
import getHuntTraceClasses from "../utils/trace-utils/hunt";
import getPreservationTraceClasses from "../utils/trace-utils/preservation";
import getAbundanceTraceClasses from "../utils/trace-utils/abundance";
import getNihilityTraceClasses from "../utils/trace-utils/nihility";
import getEruditionTraceClasses from "../utils/trace-utils/erudition";
import {
  Character,
  CharacterTraceKey,
} from "@/types/user-data/hsr-scanner-types";
import {
  AllCharacterTraceKey,
  CharacterMetadata,
  CharacterSkillKey,
} from "@/types/game-data-types";
import abundanceBg from "../assets/images/trace-abundance.png";
import destructionBg from "../assets/images/trace-destruction.png";
import eruditionBg from "../assets/images/trace-erudition.png";
import harmonyBg from "../assets/images/trace-harmony.png";
import huntBg from "../assets/images/trace-hunt.png";
import nihilityBg from "../assets/images/trace-nihility.png";
import preservationBg from "../assets/images/trace-preservation.png";
import abilityOverlay from "../assets/images/ability-overlay.png";

interface CharacterTracesProps {
  character: Character;
  metadata: CharacterMetadata;
}
export default function CharacterTraces({
  character,
  metadata,
}: CharacterTracesProps) {
  const getImageClassName = (
    traceKey: AllCharacterTraceKey | CharacterSkillKey,
  ) => {
    let toggleClass = "";
    if (
      traceKey in character.traces &&
      !character.traces[traceKey as CharacterTraceKey]
    ) {
      toggleClass = "opacity-50";
    }
    switch (traceKey) {
      case "basic":
      case "skill":
      case "ult":
      case "talent":
      case "technique":
        return "scale-[95%]";
      case "ability_1":
      case "ability_2":
      case "ability_3":
        return `scale-[85%] ${toggleClass}`;
    }
    return toggleClass;
  };
  const skillLevels = { ...character.skills };
  const maxSkillLevels: { [key in CharacterSkillKey]: number } = {
    basic: 6,
    skill: 10,
    ult: 10,
    talent: 10,
  };
  const leveledUpSkills = new Set<string>();
  if (character.eidolon >= 5) {
    Object.entries(metadata.eidolons[4].level_up_skills!).forEach(
      ([skill, level]) => {
        skillLevels[skill as CharacterSkillKey] += level;
        maxSkillLevels[skill as CharacterSkillKey] += level;
        leveledUpSkills.add(skill);
      },
    );
  }
  if (character.eidolon >= 3) {
    Object.entries(metadata.eidolons[2].level_up_skills!).forEach(
      ([skill, level]) => {
        skillLevels[skill as CharacterSkillKey] += level;
        maxSkillLevels[skill as CharacterSkillKey] += level;
        leveledUpSkills.add(skill);
      },
    );
  }

  const getTraceClasses = (traceKey: AllCharacterTraceKey) => {
    const skillClass = "border border-neutral-400 bg-neutral-900";
    const traceClass = "invert";
    let activatedClass = "";
    if (traceKey in character.traces) {
      activatedClass = character.traces[traceKey as CharacterTraceKey]
        ? "bg-neutral-900"
        : "bg-neutral-500";
    }
    const iconWidths = {
      skill: "w-[9%]",
      ability: "w-[11%]",
      stat: "w-[5.5%]",
    };

    let traceFn: Function;
    switch (metadata.path) {
      case "Harmony":
        traceFn = getHarmonyTraceClasses;
        break;
      case "Destruction":
        traceFn = getDestructionTraceClasses;
        break;
      case "The Hunt":
        traceFn = getHuntTraceClasses;
        break;
      case "Preservation":
        traceFn = getPreservationTraceClasses;
        break;
      case "Abundance":
        traceFn = getAbundanceTraceClasses;
        break;
      case "Nihility":
        traceFn = getNihilityTraceClasses;
        break;
      case "Erudition":
        traceFn = getEruditionTraceClasses;
        break;
      default:
        return "";
    }
    return traceFn(
      traceKey,
      skillClass,
      traceClass,
      activatedClass,
      iconWidths,
    );
  };

  const getTraceBackground = (path: string) => {
    switch (path) {
      case "Harmony":
        return harmonyBg;
      case "Destruction":
        return destructionBg;
      case "The Hunt":
        return huntBg;
      case "Preservation":
        return preservationBg;
      case "Abundance":
        return abundanceBg;
      case "Nihility":
        return nihilityBg;
      case "Erudition":
        return eruditionBg;
      default:
        return "";
    }
  };

  return (
    <div className="relative my-auto h-fit w-fit">
      <div className="absolute h-full w-full">
        {["skills", "traces"].map((traceType) => {
          return Object.entries((metadata as any)[traceType]).map(
            ([traceKey, trace]: [any, any]) => {
              let imgClass = "";
              if (
                traceKey in character.traces &&
                !character.traces[traceKey as CharacterTraceKey]
              ) {
                imgClass = "opacity-50 grayscale";
              }
              return (
                <div
                  key={traceKey}
                  className={`${getTraceClasses(
                    traceKey,
                  )} absolute -translate-x-1/2 -translate-y-1/2 transform rounded-full`}
                >
                  {traceKey.startsWith("ability") && (
                    <img
                      src={abilityOverlay}
                      alt={`ability overlay icon`}
                      className={`${imgClass} absolute scale-125 invert`}
                    />
                  )}
                  <img
                    src={trace.icon}
                    alt={`${character.key} ${traceKey} icon`}
                    className={`${getImageClassName(traceKey)}`}
                    title={`${trace.name} (${traceKey})\n${trace.desc}`}
                  />
                  {["basic", "skill", "ult", "talent"].includes(traceKey) && (
                    <div className="absolute h-[50%] w-[300%] -translate-x-1/3 transform text-center font-din-alternate font-bold">
                      <div
                        className={`mx-auto h-6 w-fit -translate-y-1 transform px-1 text-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ${
                          leveledUpSkills.has(traceKey) && "text-cyan-300"
                        }`}
                      >
                        {skillLevels[traceKey as CharacterSkillKey]}/
                        {maxSkillLevels[traceKey as CharacterSkillKey]}
                      </div>
                    </div>
                  )}
                </div>
              );
            },
          );
        })}
      </div>

      <img
        id="traces-background"
        src={getTraceBackground(metadata.path)}
        className="-z-10 object-contain"
        alt={`${metadata.path} trace background`}
      />
    </div>
  );
}
