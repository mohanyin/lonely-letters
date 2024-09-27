import { Letter, SCORES } from "@/utils/tiles";

export const MIN_LETTER_BONUS = 1;
export const MAX_LETTER_BONUS = 3;
export const GRID_SPOT_BONUS = 2;

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

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function calculateBonus(word: string | number[]) {
  const bonusLength = Math.max(0, word.length - 3);
  return clamp(1 + bonusLength * 0.5, MIN_LETTER_BONUS, MAX_LETTER_BONUS);
}

export function formatBonus(bonus: number) {
  const relativeBonus = Math.round((bonus - 1) * 100);
  if (relativeBonus === 0) return "0%";
  return relativeBonus < 0
    ? `- ${Math.abs(relativeBonus)}%`
    : `+ ${relativeBonus}%`;
}
