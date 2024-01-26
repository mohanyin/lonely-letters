import { differenceInDays } from "date-fns";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { checkWord, importTries } from "@/utils/dictionary";
import { MersenneTwisterGenerator } from "@/utils/random";
import { calculateBonus } from "@/utils/scoring";
import { Letter, SCORES, tileBag } from "@/utils/tiles";

interface GameStore {
  score: number;
  remainingTiles: Letter[];
  totalTilesCount: number;
  grid: (Letter | null)[];
  selectedTiles: number[];
  id: number;
  selectMode: "tap" | "swipe";

  isSelecting: () => boolean;

  incrementScore: () => void;
  start: () => void;
  placeTile: (index: number) => void;
  onTileTap: (index: number) => void;
  onTileSwipe: (index: number) => void;
  finishSelecting: () => Promise<void>;
}

function addSelectedTile(state: GameStore, index: number) {
  // If tile is not adjacent to the last selected tile, do nothing.
  const lastSelectedTile = state.selectedTiles[state.selectedTiles.length - 1];
  if (lastSelectedTile === undefined) {
    state.selectedTiles = [index];
    return;
  }

  const lastSelectPos = {
    x: lastSelectedTile % 4,
    y: Math.floor(lastSelectedTile / 4),
  };
  const selectedPos = { x: index % 4, y: Math.floor(index / 4) };
  if (
    Math.abs(lastSelectPos.x - selectedPos.x) +
      Math.abs(lastSelectPos.y - selectedPos.y) >
    1
  ) {
    return;
  }

  state.selectedTiles = [...state.selectedTiles, index];
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
      selectMode: "tap",

      isSelecting: () => !!get().selectedTiles.length,

      incrementScore: () => set((state) => (state.score += 1)),

      start: () => {
        set((state) => {
          importTries();

          const seed = differenceInDays(new Date(), new Date(2024, 0, 1));
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

      onTileTap(index: number) {
        set((state) => {
          // If tile is empty, do nothing.
          if (state.grid[index] === null) {
            return;
          }
          // If tile is already selected, back all the way up to right before
          // that tile.
          if (state.selectedTiles.includes(index)) {
            const tileIndex = state.selectedTiles.indexOf(index);
            state.selectedTiles = state.selectedTiles.slice(0, tileIndex);
            return;
          }
          state.selectMode = "tap";
          addSelectedTile(state, index);
        });
      },

      onTileSwipe(index: number) {
        set((state) => {
          // If tile is empty, do nothing.
          if (state.grid[index] === null) {
            return;
          }
          // If tile is already selected, ignore it.
          if (state.selectedTiles.includes(index)) {
            return;
          }
          state.selectMode = "swipe";
          addSelectedTile(state, index);
        });
      },

      finishSelecting: async (): Promise<void> => {
        const state = get();
        const selectedWord = state.selectedTiles
          .map((index) => state.grid[index])
          .join("");
        const isValidWord = await checkWord(selectedWord);

        if (isValidWord) {
          const wordScore = selectedWord
            .split("")
            .reduce((sum, letter) => sum + SCORES[letter as Letter], 0);
          const bonus = calculateBonus(selectedWord);
          set((state) => {
            state.score += Math.round(wordScore * bonus);
            state.selectedTiles.forEach((index) => {
              state.grid[index] = null;
            });
          });
        }

        set((state) => {
          state.selectedTiles = [];
        });
      },
    })),
  ),
);
