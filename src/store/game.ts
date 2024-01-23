import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { checkWord } from "@/utils/dictionary";
import { MersenneTwisterGenerator } from "@/utils/random";
import { Letter, SCORES, tileBag } from "@/utils/tiles";

interface GameStore {
  score: number;
  remainingTiles: Letter[];
  totalTilesCount: number;
  grid: (Letter | null)[];
  selectedTiles: number[];
  id: number;

  isSelecting: () => boolean;

  incrementScore: () => void;
  start: () => void;
  placeTile: (index: number) => void;
  selectTile: (index: number) => void;
  finishSelecting: () => void;
}

export const useGameStore = create<GameStore>()(
  devtools(
    immer((set, get) => ({
      score: 0,
      remainingTiles: [],
      totalTilesCount: 0,
      grid: [],
      selectedTiles: [],
      id: 0,

      isSelecting: () => !!get().selectedTiles.length,

      incrementScore: () => set((state) => (state.score += 1)),

      start: () => {
        set((state) => {
          const seed = Math.floor(Date.now() / 1000 / 60 / 60 / 23);
          const generator = new MersenneTwisterGenerator(seed);
          const tiles = Array(30)
            .fill(0)
            .map(() => generator.choice(tileBag));

          state.id = seed;
          state.score = 0;
          state.selectedTiles = [];
          state.remainingTiles = tiles;
          state.totalTilesCount = tiles.length;
          state.grid = Array(16).fill(null);
        });
      },

      placeTile(index: number) {
        set((state) => {
          if (state.grid[index] !== null || state.isSelecting()) {
            return;
          }

          const tile = state.remainingTiles.shift();
          state.grid[index] = tile!;
        });
      },

      selectTile(index: number) {
        set((state) => {
          if (state.grid[index] === null) {
            return;
          }
          state.selectedTiles.push(index);
        });
      },

      finishSelecting() {
        set((state) => {
          const selectedWord = state.selectedTiles
            .map((index) => state.grid[index])
            .join("");
          const isValidWord = checkWord(selectedWord);

          if (isValidWord) {
            const wordScore = selectedWord
              .split("")
              .reduce((sum, letter) => sum + SCORES[letter as Letter], 0);
            const bonus = (selectedWord.length + 1) / 4;
            state.score += Math.round(wordScore * bonus);
            state.selectedTiles.forEach((index) => {
              state.grid[index] = null;
            });
          }

          state.selectedTiles = [];
        });
      },
    })),
  ),
);
