export default function getPreservationTraceClasses(
  traceKey: string,
  skillClass: string,
  traceClass: string,
  activatedClass: string,
  iconWidths: { skill: string; ability: string; stat: string }
) {
  switch (traceKey) {
    case "basic":
      return `ml-[32%] mt-[55%] ${iconWidths.skill} ${skillClass}`;
    case "skill":
      return `ml-[68%] mt-[55%] ${iconWidths.skill} ${skillClass}`;
    case "ult":
      return `ml-[50%] mt-[52%] ${iconWidths.skill} ${skillClass}`;
    case "talent":
      return `ml-[50%] mt-[36%] ${iconWidths.skill} ${skillClass}`;
    case "technique":
      return `ml-[50%] mt-[70%] ${iconWidths.skill} ${skillClass}`;
    case "ability_1":
      return `ml-[30%] mt-[86%] ${iconWidths.ability} ${traceClass} ${activatedClass}`;
    case "ability_2":
      return `ml-[70%] mt-[86%] ${iconWidths.ability} ${traceClass} ${activatedClass}`;
    case "ability_3":
      return `ml-[50%] mt-[22%] ${iconWidths.ability} ${traceClass} ${activatedClass}`;
    case "stat_1":
      return `ml-[50%] mt-[83%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_2":
      return `ml-[18%] mt-[77%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_3":
      return `ml-[9%] mt-[68%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_4":
      return `ml-[20%] mt-[45%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_5":
      return `ml-[82%] mt-[77%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_6":
      return `ml-[91%] mt-[68%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_7":
      return `ml-[80%] mt-[45%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_8":
      return `ml-[50%] mt-[9%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_9":
      return `ml-[32%] mt-[13%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_10":
      return `ml-[68%] mt-[13%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    default:
      return "";
  }
}
