export const getRandomElements = <T>(array: T[], n: number): T[] => {
  return array.sort(() => 0.5 - Math.random()).slice(0, n);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength - 3) + "...";
  }
};
