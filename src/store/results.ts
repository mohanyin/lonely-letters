import { ImmerStateCreator } from "@/store/utils";

interface State {}

interface Actions {}

export type ResultsSlice = State & Actions;

export const createResultsSlice: ImmerStateCreator<ResultsSlice> = () => ({});
