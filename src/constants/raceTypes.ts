import { STATS } from './stats';

export enum RACES {
  DRAGONBORN = 'DRAGONBORN',
  DWARF = 'DWARF',
  GNOME = 'GNOME',
  HALF_ELF = 'HALF_ELF',
  HALFLING = 'HALFLING',
  HALF_ORC = 'HALF_ORC',
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
  STATS = 'STATS',
  SPEED = 'SPEED',
  PROFICIENCY = 'PROFICIENCY',
  DROPDOWN = 'DROPDOWN',
  FEATURE = 'FEATURE',
}

type RaceCreateConfigEntry = {
  type: RACE_CONFIG_TYPE;
  format: RACE_CONFIG_FORMAT;
  path: string;
  value?: any;
  options?: Array<{ value: any; label: any }>;
  config?: {
    header?: string;
    description?: string;
    subHeader?: string;
    renderValue?: Function;
    getFinalValue?: Function;
  };
};
export type RaceConfigs = {
  [r in RACES]: {
    label: string;
    createConfig: {
      base: Array<RaceCreateConfigEntry>;
      subRaceOptions?: Array<{ value: any; label: string }>;
      subRace?: {
        [s: string]: Array<RaceCreateConfigEntry>;
      };
    };
  };
};

export const MULTI_PATH = 'MULTI';
export const WALKING_TYPE = 'Walking';
