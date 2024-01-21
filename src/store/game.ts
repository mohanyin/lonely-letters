import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { MersenneTwisterGenerator } from "@/utils/random";
import { tileBag } from "@/utils/tiles";

interface GameStore {
  score: number;
  remainingTiles: string[];
  grid: (string | null)[];
  incrementScore: () => void;
  start: () => void;
  placeTile: (index: number) => void;
}

export const useGameStore = create<GameStore>()(
  devtools(
    immer((set) => ({
      score: 0,
      remainingTiles: [],
      grid: [],
      incrementScore: () => set((state) => (state.score += 1)),
      start: () => {
        set((state) => {
          const seed = Math.floor(Date.now() / 1000 / 60 / 24);
          const generator = new MersenneTwisterGenerator(seed);
          const tiles = Array(30)
            .fill(0)
            .map(() => generator.choice(tileBag));

          state.score = 0;
          state.remainingTiles = tiles;
          state.grid = Array(16).fill(null);
        });
      },
      placeTile(index: number) {
        set((state) => {
          if (state.grid[index] !== null) {
            return;
          }

          const tile = state.remainingTiles.shift();
          state.grid[index] = tile!;
        });
      },
    })),
  ),
);
