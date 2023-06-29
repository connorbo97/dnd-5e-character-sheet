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

export type CharacterCreatorForm = {
  race: CharacterRaceForm;
  stats: CharacterStatsForm;
};

export const EMPTY_FORM: CharacterCreatorForm = {
  race: EMPTY_RACE_FORM,
  stats: EMPTY_STATS_FORM,
};

console.log(getAllPaths(EMPTY_FORM));

export const CHARACTER_CREATOR_PATHS_LIST = getAllPaths(EMPTY_FORM);
export const CHARACTER_CREATOR_PATHS = keyBy(
  CHARACTER_CREATOR_PATHS_LIST,
  (p) => p,
);
