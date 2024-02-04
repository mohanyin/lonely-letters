import { Letter, SCORES } from "@/utils/tiles";

export const MIN_BONUS = 1;
export const MAX_BONUS = 2;

export function getScore(word: string, bonus: number): number {
  return Math.round(getBaseScore(word, bonus) * calculateBonus(word));
}

function getBaseScore(word: string, bonus: number): number {
  return word.split("").reduce((sum, letter, index) => {
    const bonusMultiplier = bonus === index ? 2 : 1;
    return sum + bonusMultiplier * SCORES[letter as Letter];
  }, 0);
}

export function calculateBonus(word: string | number[]) {
  return Math.max(Math.min((word.length + 1) / 4, MAX_BONUS), MIN_BONUS);
}

export function formatBonus(word: string | number[]) {
  const relativeBonus = (calculateBonus(word) - 1) * 100;
  if (relativeBonus === 0) return "0%";
  return relativeBonus < 0
    ? `- ${Math.abs(relativeBonus)}%`
    : `+ ${relativeBonus}%`;
}
