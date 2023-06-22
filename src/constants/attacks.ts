import { values } from 'lodash';
import { ModBlock } from './general';
import { ROLLABLES, Rollable } from './rollable';
import { STATS, STATS_OPTIONS } from './stats';

export enum AttackTypes {
  WEAPON = 'WEAPON',
  SPELL = 'SPELL',
}

export type AttackEntry = {
  label: string;
  source: string;
  description?: string;
  attack: {
    isEnabled;
    stat: STATS | ROLLABLES.SPELL | null;
    mod?: ModBlock;
    proficient?: boolean;
    range?: string;
    critRange: number;
  };
  damage: [
    {
      isEnabled: boolean;
      label?: string;
      base: Rollable;
      stat: STATS | ROLLABLES.SPELL | null;
      mod?: ModBlock;
      type?: string;
      crit?: Rollable;
    },
    {
      isEnabled: boolean;
      label?: string;
      base: Rollable;
      stat: STATS | ROLLABLES.SPELL | null;
      mod?: ModBlock;
      type?: string;
      crit?: Rollable;
    },
  ];
  savingThrow: {
    isEnabled: boolean;
    dc: ROLLABLES.SPELL | STATS;
    dcSave: STATS;
    effect: string;
  };
};

export const ATTACK_STAT_DROPDOWN_OPTIONS = [
  { value: null, label: '-' },
  ...STATS_OPTIONS,
  { value: ROLLABLES.SPELL, label: 'Spell' },
];
