import { keyBy } from 'lodash';
import { RACES } from './raceTypes';
import { getAllPaths } from 'utils/objectUtils';
import { STATS } from './stats';

export const CHARACTER_CREATOR_REDUCER_NAME = 'characterCreator';

export type CharacterRaceForm = {
  value?: RACES;
  config?: Array<any>;
  subRace?: string;
  subRaceConfig?: Array<any>;
};

export type CharacterCreatorForm = {
  race: CharacterRaceForm;
};

export const EMPTY_RACE_FORM = {
  value: undefined,
  config: undefined,
  subRace: undefined,
};

export const EMPTY_STATS_FORM = {
  [STATS.STR]: undefined,
  [STATS.DEX]: undefined,
  [STATS.CON]: undefined,
  [STATS.INT]: undefined,
  [STATS.WIS]: undefined,
  [STATS.CHA]: undefined,
};

export const EMPTY_FORM = {
  race: EMPTY_RACE_FORM,
  stats: EMPTY_STATS_FORM,
};

console.log(getAllPaths(EMPTY_FORM));

export const CHARACTER_CREATOR_PATHS_LIST = getAllPaths(EMPTY_FORM);
export const CHARACTER_CREATOR_PATHS = keyBy(
  CHARACTER_CREATOR_PATHS_LIST,
  (p) => p,
);
