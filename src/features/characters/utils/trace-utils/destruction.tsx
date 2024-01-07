export default function getDestructionTraceClasses(
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
      return `ml-[50%] mt-[75%] ${iconWidths.skill} ${skillClass}`;
    case "ability_1":
      return `ml-[32%] mt-[80%] ${iconWidths.ability} ${traceClass} ${activatedClass}`;
    case "ability_2":
      return `ml-[68%] mt-[80%] ${iconWidths.ability} ${traceClass} ${activatedClass}`;
    case "ability_3":
      return `ml-[50%] mt-[20%] ${iconWidths.ability} ${traceClass} ${activatedClass}`;
    case "stat_1":
      return `ml-[50%] mt-[87%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_2":
      return `ml-[18%] mt-[68%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_3":
      return `ml-[7%] mt-[57%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_4":
      return `ml-[18%] mt-[45%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_5":
      return `ml-[82%] mt-[68%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_6":
      return `ml-[93%] mt-[57%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_7":
      return `ml-[82%] mt-[45%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
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
