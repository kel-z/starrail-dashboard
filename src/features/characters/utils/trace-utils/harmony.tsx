export default function getHarmonyTraceClasses(
  traceKey: string,
  skillClass: string,
  traceClass: string,
  activatedClass: string,
  iconWidths: { skill: string; ability: string; stat: string }
) {
  switch (traceKey) {
    case "basic":
      return `ml-[32%] mt-[43%] ${iconWidths.skill} ${skillClass}`;
    case "skill":
      return `ml-[68%] mt-[43%] ${iconWidths.skill} ${skillClass}`;
    case "ult":
      return `ml-[50%] mt-[57%] ${iconWidths.skill} ${skillClass}`;
    case "talent":
      return `ml-[50%] mt-[39%] ${iconWidths.skill} ${skillClass}`;
    case "technique":
      return `ml-[50%] mt-[75%] ${iconWidths.skill} ${skillClass}`;
    case "ability_1":
      return `ml-[16%] mt-[55%] ${iconWidths.ability} ${traceClass} ${activatedClass}`;
    case "ability_2":
      return `ml-[89%] mt-[55%] ${iconWidths.ability} ${traceClass} ${activatedClass}`;
    case "ability_3":
      return `ml-[50%] mt-[22%] ${iconWidths.ability} ${traceClass} ${activatedClass}`;
    case "stat_1":
      return `ml-[50%] mt-[87%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_2":
      return `ml-[7%] mt-[44%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_3":
      return `ml-[20%] mt-[35%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_4":
      return `ml-[33%] mt-[83%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_5":
      return `ml-[79.5%] mt-[69%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_6":
      return `ml-[68%] mt-[61%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_7":
      return `ml-[67%] mt-[83%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_8":
      return `ml-[50%] mt-[9%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_9":
      return `ml-[33%] mt-[12%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_10":
      return `ml-[67%] mt-[12%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    default:
      return "";
  }
}
