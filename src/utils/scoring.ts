import { Letter, SCORES } from "@/utils/tiles";

export const MIN_LETTER_BONUS = 1;
export const MAX_LETTER_BONUS = 2;
export const GRID_SPOT_BONUS = 1.5;

export function getScore(word: string, bonus: number): number {
  return Math.round(getBaseScore(word, bonus) * calculateBonus(word));
}

export function getGridSpotBonusScore(letterScore: number): number {
  return Math.round(letterScore * GRID_SPOT_BONUS);
}

function getBaseScore(word: string, bonusLetter: number): number {
  return word.split("").reduce((sum, letter, index) => {
    const letterScore = SCORES[letter as Letter];
    const withBonus =
      bonusLetter === index ? getGridSpotBonusScore(letterScore) : letterScore;
    return sum + withBonus;
  }, 0);
}

export function calculateBonus(word: string | number[]) {
  return Math.max(
    Math.min((word.length + 1) / 4, MAX_LETTER_BONUS),
    MIN_LETTER_BONUS,
  );
}

export function formatBonus(word: string | number[]) {
  const relativeBonus = (calculateBonus(word) - 1) * 100;
  if (relativeBonus === 0) return "0%";
  return relativeBonus < 0
    ? `- ${Math.abs(relativeBonus)}%`
    : `+ ${relativeBonus}%`;
}
