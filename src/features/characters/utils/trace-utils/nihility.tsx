export default function getNihilityTraceClasses(
  traceKey: string,
  skillClass: string,
  traceClass: string,
  activatedClass: string,
  iconWidths: { skill: string; ability: string; stat: string },
) {
  switch (traceKey) {
    case "basic":
      return `ml-[32%] mt-[47%] ${iconWidths.skill} ${skillClass}`;
    case "skill":
      return `ml-[68%] mt-[47%] ${iconWidths.skill} ${skillClass}`;
    case "ult":
      return `ml-[50%] mt-[44%] ${iconWidths.skill} ${skillClass}`;
    case "talent":
      return `ml-[50%] mt-[27%] ${iconWidths.skill} ${skillClass}`;
    case "technique":
      return `ml-[50%] mt-[63%] ${iconWidths.skill} ${skillClass}`;
    case "ability_1":
      return `ml-[20%] mt-[36%] ${iconWidths.ability} ${traceClass} ${activatedClass}`;
    case "ability_2":
      return `ml-[80%] mt-[36%] ${iconWidths.ability} ${traceClass} ${activatedClass}`;
    case "ability_3":
      return `ml-[50%] mt-[14%] ${iconWidths.ability} ${traceClass} ${activatedClass}`;
    case "stat_1":
      return `ml-[50%] mt-[77%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_2":
      return `ml-[6.5%] mt-[48%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_3":
      return `ml-[19%] mt-[60%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_4":
      return `ml-[31%] mt-[72%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_5":
      return `ml-[93.5%] mt-[48%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_6":
      return `ml-[81%] mt-[60%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_7":
      return `ml-[69%] mt-[72%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_8":
      return `ml-[32%] mt-[17%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_9":
      return `ml-[68%] mt-[17%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    case "stat_10":
      return `ml-[50%] mt-[89%] ${iconWidths.stat} ${traceClass} ${activatedClass}`;
    default:
      return "";
  }
}
