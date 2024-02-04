import { ImmerStateCreator } from "@/store/utils";
import { MersenneTwisterGenerator, pickTiles } from "@/utils/random";
import { Letter } from "@/utils/tiles";

interface Puzzle {
  id: number;
  tiles: Letter[];
  numTiles: number;
  bonusTiles: number[];
  blockedTiles: number[];
}

interface State {
  puzzle: Puzzle;
}

interface Actions {
  generate: (id: number) => void;
}

export type PuzzleSlice = State & Actions;

export const BASE_TILE_COUNT = 30;
const BLOCKED_TILE_CHANCE = 0.5;
const BONUS_TILE_CHANCE = 0.5;

const BASE_PUZZLE = {
  id: 0,
  tiles: [],
  numTiles: BASE_TILE_COUNT,
  bonusTiles: [],
  blockedTiles: [],
};

export const createPuzzleSlice: ImmerStateCreator<PuzzleSlice> = (set) => ({
  puzzle: BASE_PUZZLE,

  generate: (id: number) => {
    const puzzle: Puzzle = { ...BASE_PUZZLE, id };
    const generator = new MersenneTwisterGenerator(id);

    const gridSpots = Array.from({ length: 16 }, (_, i) => i);
    if (generator.nextFloat() < BONUS_TILE_CHANCE) {
      const bonusTile = generator.choice(gridSpots);
      puzzle.bonusTiles = [bonusTile];
      gridSpots.splice(gridSpots.indexOf(bonusTile), 1);
    }

    if (generator.nextFloat() < BLOCKED_TILE_CHANCE) {
      puzzle.blockedTiles = [generator.choice(gridSpots)];
    }

    puzzle.tiles = pickTiles(BASE_TILE_COUNT, generator);

    set((state) => {
      state.puzzle = puzzle;
    });
  },
});
