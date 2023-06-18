import { DICE } from './dice';
import { STATS } from './stats';

export enum ROLLABLES {
  PB = 'PB',
  SPELL = 'SPELL',
}

export type StaticRollableEntry = number | STATS | ROLLABLES;
export type RollableEntry = StaticRollableEntry | DICE | string;

export type StaticRollable = Array<StaticRollableEntry>;
export type Rollable = Array<RollableEntry>;
