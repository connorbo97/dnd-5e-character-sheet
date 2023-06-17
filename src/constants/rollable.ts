import { DICE } from './dice';

export type RollableEntry = number | DICE | string;

export type Rollable = Array<RollableEntry>;
