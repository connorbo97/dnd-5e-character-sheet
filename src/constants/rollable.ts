import { DICE } from './dice';
import { STATS } from './stats';

export enum ROLLABLES {
  PB = 'PB',
  SPELL = 'SPELL',
}

export type RollableEntry = number | DICE | string | STATS | ROLLABLES;

export type Rollable = Array<RollableEntry>;
