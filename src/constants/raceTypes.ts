import { STATS } from './stats';

export enum RACES {
  DRAGONBORN = 'DRAGONBORN',
  DWARF = 'DWARF',
  ELF = 'ELF',
  GNOME = 'GNOME',
  HALF_ELF = 'HALF_ELF',
  HALF_ORC = 'HALF_ORC',
  HALFLING = 'HALFLING',
  HUMAN = 'HUMAN',
  TIEFLING = 'TIEFLING',
  TASHA_CUSTOM = 'TASHA_CUSTOM',
  CUSTOM = 'CUSTOM',
}

export enum CREATURE_TYPE {
  HUMANOID = 'Humanoid',
}

export enum CREATURE_SIZE {
  TINY = 'Tiny',
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'LARGE',
}

export type RaceStatConfig = {
  stat: STATS;
  value: number;
};
export enum RACE_CONFIG_TYPE {
  STATIC = 'STATIC',
  CHOICE = 'CHOICE',
}
export enum RACE_CONFIG_FORMAT {
  BASIC = 'BASIC',
  STATIC_CHOICE = 'STATIC_CHOICE',
  STATS = 'STATS',
  SPEED = 'SPEED',
  PROFICIENCY = 'PROFICIENCY',
  SKILL_PROFICIENCY = 'SKILL_PROFICIENCY',
  DROPDOWN = 'DROPDOWN',
  FEATURE = 'FEATURE',
}
export type RaceCreateConfigEntryConfig = {
  header?: string;
  description?: string;
  subHeader?: string;
  renderValue?: Function;
  getLabelValue?: Function;
  getFinalValue?: Function;
  getPlaceholder?: Function;
  isFullValue?: Function;
  hideValue?: boolean;
};

type RaceCreateConfigEntry = {
  type: RACE_CONFIG_TYPE;
  format: RACE_CONFIG_FORMAT;
  path: string;
  value?: any;
  options?: Array<{ value: any; label: any }>;
  config?: RaceCreateConfigEntryConfig;
};
export type RaceConfigsCreateConfig = {
  base: Array<RaceCreateConfigEntry>;
  subRaceOptions?: Array<{ value: any; label: string }>;
  subRace?: {
    [s: string]: Array<RaceCreateConfigEntry>;
  };
};
export type RaceConfigs = {
  [r in RACES]: {
    label: string;
    createConfig: RaceConfigsCreateConfig;
  };
};

export const MULTI_PATH = 'MULTI';
export const WALKING_TYPE = 'Walking';
