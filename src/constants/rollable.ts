import { values } from 'lodash';
import { DICE } from './dice';
import { STATS, STAT_BLOCK_TYPE } from './stats';

export enum ROLLABLES {
  PB = 'PB',
  SPELL = 'SPELL',
  // TODO: Add Level into calculation. make sure it supports a specific class type
}
export const ROLLABLES_SET = new Set(values(ROLLABLES));

export type RollableUtilConfig = {
  stats: STAT_BLOCK_TYPE;
  spellcastingAbility: STATS | 'NONE';
  profBonus: number;
};
export type StaticRollableEntry = number | STATS | ROLLABLES;
export type DiceRoll = [number, DICE];
export type RollableEntry = StaticRollableEntry | DiceRoll;

export type StaticRollable = Array<StaticRollableEntry>;
export type Rollable = Array<RollableEntry>;

export enum OPERATORS {
  PLUS = '+',
  MINUS = '-',
}
export const OPERATORS_LIST = values(OPERATORS);
export const OPERATORS_SET = new Set(OPERATORS_LIST);
