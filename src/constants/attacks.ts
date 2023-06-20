import { ModBlock } from './general';
import { ROLLABLES, Rollable } from './rollable';
import { STATS } from './stats';

export enum AttackTypes {
  WEAPON = 'WEAPON',
  SPELL = 'SPELL',
}

export type AttackEntry = {
  label: string;
  source: string;
  description?: string;
  attack?: {
    stat: STATS | ROLLABLES.SPELL | null;
    mod?: ModBlock;
    proficient?: boolean;
    range?: string;
    critRange: number;
  };
  damage?: Array<{
    label?: string;
    base: Rollable;
    stat: STATS | ROLLABLES.SPELL | null;
    mod?: ModBlock;
    type?: string;
    crit?: Rollable;
  }>;
  savingThrow?: {
    stat: STATS;
    dc: 'SPELL' | 'FLAT' | STATS;
    effect: string;
  };
};
