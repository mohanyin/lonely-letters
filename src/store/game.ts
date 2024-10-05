import mixpanel from "mixpanel-browser";

import { CoreSlice } from "@/store/core";
import { PuzzleSlice } from "@/store/puzzle";
import { ImmerStateCreator } from "@/store/utils";
import { checkWord } from "@/utils/dictionary";
import { isAdjacentTile } from "@/utils/grid";
import { getScore } from "@/utils/scoring";
import { Letter } from "@/utils/tiles";

interface Game {
  puzzle: number;
  score: number;
  words: { word: string; score: number }[];
  remainingTiles: Letter[];
  grid: (Letter | null)[];
  hold: Letter | null;
}

interface State {
  game: Game;
  selectedIndices: number[];
  selectMode: "tap" | "swipe";
}

interface Actions {
  start: () => void;
  startOrResume: () => void;
  placeTile: (index: number) => void;
  holdTile: () => void;
  swapHoldTile: () => void;
  onTileTap: (index: number) => void;
  onTileSwipe: (index: number) => void;
  addSelectedTile: (index: number) => void;
  cancelSelecting: () => void;
  finishSelecting: () => Promise<void>;
}

export type GameSlice = State & Actions;

export function isSelecting(state: GameSlice) {
  return state.selectedIndices.length > 0;
}

export function getSelectedWord(state: GameSlice) {
  if (state.game === null) {
    return "";
  }

  return state.selectedIndices.map((index) => state.game!.grid[index]).join("");
}

const BASE_GAME: Game = {
  puzzle: 0,
  score: 0,
  words: [],
  remainingTiles: [],
  grid: Array(16).fill(null),
  hold: null,
};

export const createGameSlice: ImmerStateCreator<
  GameSlice,
  CoreSlice & PuzzleSlice
> = (set, get) => ({
  game: BASE_GAME,
  selectedIndices: [],
  selectMode: "tap",
  hold: null,

  start: () => {
    const { currentPuzzle } = get();
    mixpanel.track("Game started", { puzzle: currentPuzzle });

    set((state) => {
      state.game = {
        ...BASE_GAME,
        puzzle: state.puzzle.id,
        remainingTiles: [...state.puzzle.tiles],
      };
    });
  },

  startOrResume: () => {
    const state = get();
    state.generate(state.currentPuzzle);

    if (state.game.puzzle !== state.currentPuzzle) {
      state.start();
    }

    set((state) => {
      state.selectedIndices = [];
      state.selectMode = "tap";
    });
  },

  placeTile(index: number) {
    set((state) => {
      if (state.game!.grid[index] !== null || isSelecting(state)) {
        return;
      }

      const tile = state.game!.remainingTiles.shift();
      state.game!.grid[index] = tile!;
    });

    const state = get();
    if (state.game!.remainingTiles.length === 0 && state.game!.hold !== null) {
      state.swapHoldTile();
    }
  },

  holdTile() {
    set((state) => {
      if (state.game.hold !== null || state.game.remainingTiles.length <= 1) {
        return;
      }

      const letter = state.game.remainingTiles.shift()!;
      state.game.hold = letter;
    });
  },

  swapHoldTile() {
    set((state) => {
      if (state.game.hold === null) {
        return;
      }

      const hold = state.game.hold;
      state.game.hold = state.game.remainingTiles.shift() ?? null;
      state.game.remainingTiles.unshift(hold!);
    });
  },

  onTileTap(index: number) {
    const state = get();
    // If tile is empty, do nothing.
    if (state.game!.grid[index] === null) {
      return;
    }

    // If tile is already selected, back all the way up to right before
    // that tile.
    if (state.selectedIndices.includes(index)) {
      set((state) => {
        const tileIndex = state.selectedIndices.indexOf(index);
        state.selectedIndices = state.selectedIndices.slice(0, tileIndex);
      });
      return;
    }

    set((state) => {
      state.selectMode = "tap";
    });
    state.addSelectedTile(index);
  },

  onTileSwipe(index: number) {
    const state = get();
    // If tile is empty, do nothing.
    if (state.game!.grid[index] === null) {
      return;
    }
    // If tile is already selected, ignore it.
    if (state.selectedIndices.includes(index)) {
      return;
    }
    set((state) => {
      state.selectMode = "swipe";
    });
    state.addSelectedTile(index);
  },

  addSelectedTile(index: number) {
    set((state) => {
      // If tile is not adjacent to the last selected tile, do nothing.
      const lastSelectedTile =
        state.selectedIndices[state.selectedIndices.length - 1];
      if (lastSelectedTile === undefined) {
        state.selectedIndices = [index];
        return;
      }

      if (!isAdjacentTile(lastSelectedTile, index)) {
        return;
      }

      state.selectedIndices = [...state.selectedIndices, index];
    });
  },

  cancelSelecting: () => {
    set((state) => {
      state.selectedIndices = [];
    });
  },

  finishSelecting: async (): Promise<void> => {
    const state = get();
    const selectedWord = getSelectedWord(state);
    const isValidWord = await checkWord(selectedWord);

    if (isValidWord) {
      set((state) => {
        const bonus = state.selectedIndices.indexOf(state.puzzle.bonusTiles[0]);
        const score = getScore(selectedWord, bonus);
        state.game!.words = [
          ...state.game!.words,
          { word: selectedWord, score },
        ];
        state.game!.score += score;
        state.selectedIndices.forEach((index) => {
          state.game!.grid[index] = null;
        });
        state.selectedIndices = [];

        mixpanel.track("Word cleared", {
          puzzle: state.currentPuzzle,
          score,
          word: selectedWord,
        });
      });
    }
  },
});
