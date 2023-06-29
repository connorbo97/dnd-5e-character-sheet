import {
  SECTION_CONFIG_FORMAT,
  SECTION_CONFIG_TYPE,
} from './characterCreatorSections';

export enum RACES {
  DRAGONBORN = 'DRAGONBORN',
  DWARF = 'DWARF',
  ELF = 'ELF',
  GNOME = 'GNOME',
  HALF_ELF = 'HALF_ELF',
  HALF_ORC = 'HALF_ORC',
  HALFLING = 'HALFLING',
  HUMAN = 'HUMAN',
  TASHA_CUSTOM = 'TASHA_CUSTOM',
  TIEFLING = 'TIEFLING',
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

export type RaceCreateConfigEntryConfig = {
  header?: string;
  reference?: string;
  description?: string;
  subHeader?: string;
  renderValue?: Function;
  getLabelValue?: Function;
  getFinalValue?: Function;
  getPlaceholder?: Function;
  isFullValue?: Function;
  hideValue?: boolean;
};

export type RaceCreateConfigEntry = {
  type: SECTION_CONFIG_TYPE;
  format: SECTION_CONFIG_FORMAT;
  path: string;
  value?: any;
  optional?: boolean;
  choiceCondition?: Function;
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
export const IGNORE_PATH = 'IGNORE';
export const WALKING_TYPE = 'Walking';
