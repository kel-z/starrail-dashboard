export const getRarityTextStyle = (rarity: number) => {
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

export const getRarityBorderColor = (rarity: number) => {
  switch (rarity) {
    case 1:
      return "border-gray-400";
    case 2:
      return "border-green-400";
    case 3:
      return "border-blue-400";
    case 4:
      return "border-purple-400";
    case 5:
      return "border-yellow-400";
  }
};
