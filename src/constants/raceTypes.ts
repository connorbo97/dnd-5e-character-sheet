import { CreateConfigEntry } from './characterCreatorSections';

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

export type RaceConfigsCreateConfig = {
  base: Array<CreateConfigEntry>;
  subRaceOptions?: Array<{ value: any; label: string }>;
  subRace?: {
    [s: string]: Array<CreateConfigEntry>;
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
