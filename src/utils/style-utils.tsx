export const getRarityStyle = (rarity: number) => {
  switch (rarity) {
    case 1:
      return "text-gray-400";
    case 2:
      return "text-green-400";
    case 3:
      return "text-blue-400";
    case 4:
      return "text-purple-400";
    case 5:
      return "text-yellow-400";
  }
};
