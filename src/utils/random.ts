import {
  Consonant,
  Letter,
  Vowel,
  consonantBag,
  vowelBag,
} from "@/utils/tiles";

export class MersenneTwisterGenerator {
  private m: number;
  private a: number;
  private c: number;
  private state: number;

  constructor(seed: number) {
    // LCG using GCC's constants
    this.m = 0x80000000; // 2**31;
    this.a = 1103515245;
    this.c = 12345;

    this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
  }

  nextInt(): number {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state;
  }

  nextFloat(): number {
    // returns in range [0,1]
    return this.nextInt() / (this.m - 1);
  }

  nextRange(start: number, end: number): number {
    // returns in range [start, end): including start, excluding end
    // can't modulu nextInt because of weak randomness in lower bits
    const rangeSize = end - start;
    const randomUnder1 = this.nextInt() / this.m;
    return start + Math.floor(randomUnder1 * rangeSize);
  }

  choice<T>(array: T[]): T {
    return array[this.nextRange(0, array.length)];
  }
}

function chooseAndRemove<T>(
  array: T[],
  generator: MersenneTwisterGenerator,
): { choice: T; remaining: T[] } {
  const index = generator.nextRange(0, array.length);
  const choice = array[index];
  const remaining = [...array];
  remaining.splice(index, 1);
  return { choice, remaining };
}

function shuffleArray(
  array: Letter[],
  generator: MersenneTwisterGenerator,
): Letter[] {
  const arrayToShuffle = [...array];
  for (let i = arrayToShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(generator.nextFloat() * (i + 1));
    const temp = arrayToShuffle[i];
    arrayToShuffle[i] = arrayToShuffle[j];
    arrayToShuffle[j] = temp;
  }
  return arrayToShuffle;
}

export function pickTiles(
  count: number,
  generator: MersenneTwisterGenerator,
): Letter[] {
  const pickedConsonants: Consonant[] = [];
  let consonantTiles = [...consonantBag];
  const totalConsonants = Math.floor(0.6 * count);
  for (let i = 0; i < totalConsonants; i++) {
    const { choice, remaining } = chooseAndRemove(consonantTiles, generator);
    consonantTiles = remaining;
    pickedConsonants.push(choice);
  }

  const pickedVowels: Vowel[] = [];
  let vowelTiles = [...vowelBag];
  const totalVowels = count - totalConsonants;
  for (let i = 0; i < totalVowels; i++) {
    const { choice, remaining } = chooseAndRemove(vowelTiles, generator);
    vowelTiles = remaining;
    pickedVowels.push(choice);
  }

  const qTiles = pickedConsonants.filter((tile) => tile === "Q");
  const uTiles = pickedVowels.filter((tile) => tile === "U");
  if (qTiles.length > uTiles.length) {
    for (let i = 0; i < qTiles.length - uTiles.length; i++) {
      pickedVowels[i] = "U";
    }
  }

  return shuffleArray([...pickedConsonants, ...pickedVowels], generator);
}
