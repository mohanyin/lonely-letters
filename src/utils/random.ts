import { Letter, VOWEL, tileBag, vowelBag } from "@/utils/tiles";

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

export function pickTiles(
  count: number,
  generator: MersenneTwisterGenerator,
): Letter[] {
  const pickedTiles: Letter[] = [];
  let tiles = [...tileBag];
  for (let i = 0; i < count; i++) {
    const { choice, remaining } = chooseAndRemove(tiles, generator);
    tiles = remaining;
    pickedTiles.push(choice);
  }

  const vowels = Object.keys(VOWEL);
  for (let i = 0; i < pickedTiles.length; i += 5) {
    const segment = pickedTiles.slice(i, i + 5);

    const hasVowel = segment.some((letter) => vowels.includes(letter));
    if (!hasVowel) {
      const vowel = generator.choice(vowelBag);
      const replacement = generator.nextRange(i, i + 5);
      pickedTiles[replacement] = vowel;
    }
  }

  return pickedTiles;
}
