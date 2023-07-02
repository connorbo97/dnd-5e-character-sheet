import { ModBlock } from './general';
import { ROLLABLES, Rollable } from './rollable';
import { STATS, STATS_OPTIONS } from './stats';

export enum AttackTypes {
  WEAPON = 'WEAPON',
  SPELL = 'SPELL',
}

export type AttackEntrySavingThrow = {
  isEnabled: boolean;
  dc: ROLLABLES.SPELL | STATS | 'FLAT';
  flatDC: number;
  dcSave: STATS;
  effect: string;
};
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
  savingThrow: AttackEntrySavingThrow;
};

export const UNUSED_ATTACK = { stat: null, critRange: 20, isEnabled: false };
export const UNUSED_DAMAGE = { base: [], isEnabled: false, stat: null };
export const UNUSED_SAVING_THROW: AttackEntrySavingThrow = {
  isEnabled: false,
  dc: ROLLABLES.SPELL,
  dcSave: STATS.STR,
  effect: '',
  flatDC: 10,
};
export const ATTACK_STAT_DROPDOWN_OPTIONS = [
  { value: null, label: '-' },
  ...STATS_OPTIONS,
  { value: ROLLABLES.SPELL, label: 'Spell' },
];
export const SAVING_THROW_DROPDOWN_OPTIONS = [
  { value: ROLLABLES.SPELL, label: 'SPELL' },
  ...STATS_OPTIONS,
  { value: 'FLAT', label: 'FLAT' },
];
