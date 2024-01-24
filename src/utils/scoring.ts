export function calculateBonus(word: string | number[]) {
  return (word.length + 1) / 4;
}

export function formatBonus(word: string | number[]) {
  const relativeBonus = (calculateBonus(word) - 1) * 100;
  if (relativeBonus === 0) return "0%";
  return relativeBonus < 0
    ? `- ${Math.abs(relativeBonus)}%`
    : `+ ${relativeBonus}%`;
}
