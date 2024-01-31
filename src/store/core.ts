import { ImmerStateCreator } from "@/store/utils";
import { daysSinceJan1, today } from "@/utils/date";

interface State {
  today: number;
  currentPuzzle: number;
}

interface Actions {
  init: () => void;
}

export type CoreSlice = State & Actions;

export const createCoreSlice: ImmerStateCreator<CoreSlice> = (set) => ({
  today: 0,
  currentPuzzle: 0,

  init: () => {
    const todayDayjs = today();
    set((state) => {
      state.today = todayDayjs.valueOf();
      state.currentPuzzle = daysSinceJan1(todayDayjs);
      return state;
    });
  },
});
