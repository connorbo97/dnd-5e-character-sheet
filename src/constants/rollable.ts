import { values } from 'lodash';
import { CharacterSheetStats } from './characterSheet';
import { DICE } from './dice';
import { STATS } from './stats';

export enum ROLLABLES {
  PB = 'PB',
  SPELL = 'SPELL',
}
export const ROLLABLES_SET = new Set(values(ROLLABLES));

export type StaticRollableEntry = number | STATS | ROLLABLES;
export type DiceRoll = [number, DICE];
export type RollableEntry = StaticRollableEntry | DiceRoll;

export type StaticRollable = Array<StaticRollableEntry>;
export type Rollable = Array<RollableEntry>;

export type RollableUtilConfig = {
  stats: CharacterSheetStats;
  spellcastingAbility: STATS | 'NONE';
  profBonus: number;
};

export enum OPERATORS {
  PLUS = '+',
  MINUS = '-',
}
export const OPERATORS_LIST = values(OPERATORS);
export const OPERATORS_SET = new Set(OPERATORS_LIST);
