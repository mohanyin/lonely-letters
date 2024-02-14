export type Vowel = keyof typeof VOWEL;
export type Consonant = keyof typeof CONSONANT;
export type Letter = keyof typeof DISTRIBUTION;

export const VOWEL = {
  A: 9,
  E: 12,
  I: 9,
  O: 8,
  U: 4,
};
export const CONSONANT = {
  B: 2,
  C: 2,
  D: 4,
  F: 2,
  G: 3,
  H: 2,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1,
};

export const DISTRIBUTION = { ...VOWEL, ...CONSONANT };

function createBag(distribution: { [key: string]: number }): Letter[] {
  return Object.entries(distribution).flatMap(([letter, count]) =>
    Array(count).fill(letter),
  );
}
export const tileBag = createBag(DISTRIBUTION);
export const vowelBag = createBag(VOWEL) as Vowel[];
export const consonantBag = createBag(CONSONANT) as Consonant[];

export const SCORES: Record<Letter, number> = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};
