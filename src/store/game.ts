import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { daysSinceJan1, today } from "@/utils/date";
import { checkWord, importTries } from "@/utils/dictionary";
import { isAdjacentTile } from "@/utils/grid";
import { MersenneTwisterGenerator, pickTiles } from "@/utils/random";
import { getScore } from "@/utils/scoring";
import { Letter } from "@/utils/tiles";

interface GameStore {
  score: number;
  today: number;
  words: { word: string; score: number }[];
  remainingTiles: Letter[];
  totalTilesCount: number;
  grid: (Letter | null)[];
  bonusTiles: number[];
  blockedTiles: number[];
  selectedTiles: number[];
  id: number;
  selectMode: "tap" | "swipe";

  isSelecting: () => boolean;
  selectedWord: () => string;

  start: () => void;
  placeTile: (index: number) => void;
  onTileTap: (index: number) => void;
  onTileSwipe: (index: number) => void;
  finishSelecting: () => Promise<void>;
}

const BASE_TILE_COUNT = 30;

function addSelectedTile(state: GameStore, index: number) {
  // If tile is not adjacent to the last selected tile, do nothing.
  const lastSelectedTile = state.selectedTiles[state.selectedTiles.length - 1];
  if (lastSelectedTile === undefined) {
    state.selectedTiles = [index];
    return;
  }

  if (!isAdjacentTile(lastSelectedTile, index)) {
    return;
  }

  state.selectedTiles = [...state.selectedTiles, index];
}

export const useGameStore = create<GameStore>()(
  devtools(
    immer((set, get) => ({
      score: 0,
      today: 0,
      words: [],
      remainingTiles: [],
      bonusTiles: [],
      blockedTiles: [],
      totalTilesCount: 0,
      grid: [],
      selectedTiles: [],
      id: 0,
      selectMode: "tap",

      isSelecting: () => !!get().selectedTiles.length,
      selectedWord: () => {
        const state = get();
        return state.selectedTiles.map((index) => state.grid[index]).join("");
      },

      start: () => {
        set((state) => {
          importTries();

          const _today = today();
          const seed = daysSinceJan1(_today);
          const generator = new MersenneTwisterGenerator(seed);

          state.today = _today.valueOf();
          state.id = seed;
          state.score = 0;
          state.words = [];
          state.selectedTiles = [];
          state.grid = Array(16).fill(null);

          let tileCount = BASE_TILE_COUNT;
          const hasBonusTile = generator.nextFloat() < 0.4;
          const bonusTile = generator.nextRange(0, 16);
          if (hasBonusTile) {
            state.bonusTiles = [bonusTile];
            tileCount -= 3;
          }

          const hasBlockedTile = generator.nextFloat() < 0.3;
          const blockedTile = generator.nextRange(0, 16);
          if (hasBlockedTile && blockedTile !== bonusTile) {
            state.blockedTiles = [blockedTile];
            tileCount += 2;
          }

          const tiles = pickTiles(tileCount, generator);
          state.remainingTiles = tiles;
          state.totalTilesCount = tileCount;
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
          set((state) => {
            const bonus = state.selectedTiles.indexOf(state.bonusTiles[0]);
            const score = getScore(selectedWord, bonus);
            state.words = [...state.words, { word: selectedWord, score }];
            state.score += score;
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
