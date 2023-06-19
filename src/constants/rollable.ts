import { CharacterSheetStats } from './characterSheet';
import { DICE } from './dice';
import { STATS } from './stats';

export enum ROLLABLES {
  PB = 'PB',
  SPELL = 'SPELL',
}

export type StaticRollableEntry = number | STATS | ROLLABLES;
export type RollableEntry = StaticRollableEntry | [number, DICE];

export type StaticRollable = Array<StaticRollableEntry>;
export type Rollable = Array<RollableEntry>;

export type RollableUtilConfig = {
  stats: CharacterSheetStats;
  spellcastingAbility: STATS | 'NONE';
  profBonus: number;
};
