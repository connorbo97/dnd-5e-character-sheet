import { keyBy } from 'lodash';
import { RACES, RaceConfigsCreateConfig } from './raceTypes';
import { getAllPaths } from 'utils/objectUtils';
import { STATS } from './stats';
import { BACKGROUND_CREATE_CONFIG } from './backgrounds';
import { CreateConfigEntry } from './characterCreatorSections';
import { ALIGNMENTS } from './alignments';

export const CHARACTER_CREATOR_REDUCER_NAME = 'characterCreator';

export type CharacterRaceForm = {
  value?: RACES;
  config?: RaceConfigsCreateConfig;
  subRace?: string;
  subRaceConfig?: Array<any>;
};

export const EMPTY_RACE_FORM = {
  value: undefined,
  config: undefined,
  subRace: undefined,
};

export type CharacterStatsForm = {
  [s in STATS]?: number;
};
export const EMPTY_STATS_FORM = {
  [STATS.STR]: undefined,
  [STATS.DEX]: undefined,
  [STATS.CON]: undefined,
  [STATS.INT]: undefined,
  [STATS.WIS]: undefined,
  [STATS.CHA]: undefined,
};

export type CharacterBackgroundForm = {
  name?: string;
  summary?: string;
  config: Array<CreateConfigEntry>;
  specialFeature?: {
    label?: string;
    description?: string;
  };
};
export const EMPTY_BACKGROUND_FORM = {
  name: '',
  summary: '',
  config: BACKGROUND_CREATE_CONFIG,
  specialFeature: {
    label: '',
    description: '',
  },
};

export type CharacterBioForm = {
  name?: string;
  alignment?: ALIGNMENTS;
  age?: string;
  height?: string;
  weight?: string;
  eyes?: string;
  hair?: string;
  skin?: string;
  personality?: string;
  ideals?: string;
  bonds?: string;
  flaws?: string;
};
export const EMPTY_BIO_FORM = {
  name: undefined,
  alignment: undefined,
  age: undefined,
  height: undefined,
  weight: undefined,
  eyes: undefined,
  hair: undefined,
  skin: undefined,
  personality: undefined,
  ideals: undefined,
  bonds: undefined,
  flaws: undefined,
};

export type CharacterClassForm = {
  value?: string;
  static?: any;
  config?: Array<CreateConfigEntry>;
};
export const EMPTY_CLASS_FORM = {
  value: undefined,
  static: undefined,
  config: undefined,
};
export type CharacterEquipmentForm = {
  config?: Array<CreateConfigEntry>;
};
export const EMPTY_EQUIPMENT_FORM = {
  config: undefined,
};

export type CharacterCreatorForm = {
  race: CharacterRaceForm;
  stats: CharacterStatsForm;
  class: CharacterClassForm;
  background: CharacterBackgroundForm;
  equipment: CharacterEquipmentForm;
  bio: CharacterBioForm;
};

export const EMPTY_FORM: CharacterCreatorForm = {
  race: EMPTY_RACE_FORM,
  stats: EMPTY_STATS_FORM,
  background: EMPTY_BACKGROUND_FORM,
  equipment: EMPTY_EQUIPMENT_FORM,
  bio: EMPTY_BIO_FORM,
  class: EMPTY_CLASS_FORM,
};

export const CHARACTER_CREATOR_PATHS_LIST = getAllPaths(EMPTY_FORM);
export const CHARACTER_CREATOR_PATHS = keyBy(
  CHARACTER_CREATOR_PATHS_LIST,
  (p) => p,
);
