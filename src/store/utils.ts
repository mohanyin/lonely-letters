import { StateCreator } from "zustand";

export type ImmerStateCreator<T, R = T> = StateCreator<
  T & R,
  [["zustand/immer", never], never],
  [],
  T
>;
