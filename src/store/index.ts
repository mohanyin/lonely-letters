import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { CoreSlice, createCoreSlice } from "@/store/core";
import {
  GameSlice,
  createGameSlice,
  getSelectedWord,
  isSelecting,
} from "@/store/game";
import { PuzzleSlice, createPuzzleSlice } from "@/store/puzzle";
import { ResultsSlice, createResultsSlice } from "@/store/results";

export type Store = CoreSlice & PuzzleSlice & GameSlice & ResultsSlice;

export function useIsSelecting() {
  return useStore(isSelecting);
}

export function useSelectedWord() {
  return useStore(getSelectedWord);
}

export const useStore = create<Store>()(
  devtools(
    persist(
      immer((set, get, store) => ({
        ...createPuzzleSlice(set, get, store),
        ...createCoreSlice(set, get, store),
        ...createGameSlice(set, get, store),
        ...createResultsSlice(set, get, store),
      })),
      {
        name: "woggle-store",
        version: 0,
        partialize: (state) => ({ game: state.game }),
      },
    ),
  ),
);
