export default function getAbundanceTraceClasses(
  traceKey: string,
  skillClass: string,
  traceClass: string,
  activatedClass: string,
  iconWidths: { skill: string; ability: string; stat: string }
) {
  switch (traceKey) {
    case "basic":
      return `ml-[32%] mt-[48%] ${iconWidths.skill} ${skillClass}`;
    case "skill":
      return `ml-[68%] mt-[48%] ${iconWidths.skill} ${skillClass}`;
    case "ult":
      return `ml-[50%] mt-[52%] ${iconWidths.skill} ${skillClass}`;
    case "talent":
      return `ml-[50%] mt-[33%] ${iconWidths.skill} ${skillClass}`;
    case "technique":
      return `ml-[50%] mt-[70%] ${iconWidths.skill} ${skillClass}`;
    case "ability_1":
      return `ml-[72%] mt-[78%] ${iconWidths.ability} ${traceClass} ${activatedClass}`;
    case "ability_2":
      return `ml-[28%] mt-[78%] ${iconWidths.ability} ${traceClass} ${activatedClass}`;
    case "ability_3":
      return `ml-[50%] mt-[13%] ${iconWidths.ability} ${traceClass} ${activatedClass}`;
    case "stat_1":
      return `ml-[59%] mt-[87%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_2":
      return `ml-[85%] mt-[65%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_3":
      return `ml-[93%] mt-[52%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_4":
      return `ml-[81%] mt-[40%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_5":
      return `ml-[15%] mt-[65%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_6":
      return `ml-[7%] mt-[52%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_7":
      return `ml-[19%] mt-[40%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_8":
      return `ml-[68%] mt-[18%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_9":
      return `ml-[32%] mt-[18%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_10":
      return `ml-[41%] mt-[87%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    default:
      return "";
  }
}
