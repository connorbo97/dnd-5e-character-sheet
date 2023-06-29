import { keyBy } from 'lodash';
import { RACES, RaceConfigsCreateConfig } from './raceTypes';
import { getAllPaths } from 'utils/objectUtils';
import { STATS } from './stats';

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
  config?: Array<any>;
};
export const EMPTY_BACKGROUND_FORM = {
  config: undefined,
};

export type CharacterBioForm = {
  name?: string;
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

export type CharacterCreatorForm = {
  race: CharacterRaceForm;
  stats: CharacterStatsForm;
  background: CharacterBackgroundForm;
  bio: CharacterBioForm;
};

export const EMPTY_FORM: CharacterCreatorForm = {
  race: EMPTY_RACE_FORM,
  stats: EMPTY_STATS_FORM,
  background: EMPTY_BACKGROUND_FORM,
  bio: EMPTY_BIO_FORM,
};

export const CHARACTER_CREATOR_PATHS_LIST = getAllPaths(EMPTY_FORM);
export const CHARACTER_CREATOR_PATHS = keyBy(
  CHARACTER_CREATOR_PATHS_LIST,
  (p) => p,
);
