import { ModBlock } from './general';
import { Rollable } from './rollable';
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
    stat: STATS | 'SPELL' | null;
    mod?: ModBlock;
    proficient?: boolean;
    range?: string;
    critRange: number;
  };
  damage?: Array<{
    base: Rollable;
    stat: STATS | 'SPELL' | null;
    mod?: ModBlock;
    type?: string;
    crit?: string;
  }>;
  savingThrow?: {
    stat: STATS;
    dc: 'SPELL' | 'FLAT' | STATS;
    effect: string;
  };
};
