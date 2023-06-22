import { values } from 'lodash';

export enum STATS {
  STR = 'STR',
  DEX = 'DEX',
  CON = 'CON',
  INT = 'INT',
  WIS = 'WIS',
  CHA = 'CHA',
}
export const STATS_SET = new Set(values(STATS));

type StatsConfig = {
  label: string;
  shortLabel: string;
};
export const STATS_CONFIGS: { [s in STATS]: StatsConfig } = {
  STR: {
    label: 'Strength',
    shortLabel: 'Str',
  },
  DEX: {
    label: 'Dexterity',
    shortLabel: 'Dex',
  },
  CON: {
    label: 'Constitution',
    shortLabel: 'Con',
  },
  INT: {
    label: 'Intelligence',
    shortLabel: 'Int',
  },
  WIS: {
    label: 'Wisdom',
    shortLabel: 'Wis',
  },
  CHA: {
    label: 'Charisma',
    shortLabel: 'Cha',
  },
};

export const STATS_OPTIONS = values(STATS).map((v) => ({
  value: v,
  label: v,
}));
