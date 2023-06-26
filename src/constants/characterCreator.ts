import { keyBy } from 'lodash';
import { RACES } from './raceTypes';

export const CHARACTER_CREATOR_REDUCER_NAME = 'characterCreator';

export type CharacterRaceForm = {
  value?: RACES;
  // speed?: number;
  // creatureType?: CREATURE_TYPE;
  // size?: CREATURE_SIZE;
  // features?: Array<any>;
  // languages?: Array<string>;
  // stats: Array<RaceStatConfig | ChoiceConfig>;
  // customStats: Array<RaceStatConfig | ChoiceConfig>;
  config?: Array<any>;
  subRace?: string;
  subRaceConfig?: Array<any>;
};

export type CharacterCreatorForm = {
  race: CharacterRaceForm;
};

export const EMPTY_RACE_FORM: CharacterRaceForm = {
  value: undefined,
  config: undefined,
  subRace: undefined,
  // size: undefined,
  // speed: undefined,
  // features: [],
  // languages: [],
  // stats: [],
  // customStats: [],
};
export const EMPTY_FORM = {
  race: EMPTY_RACE_FORM,
};

export const CHARACTER_CREATOR_PATHS_LIST = [
  ...Object.keys(EMPTY_FORM),
  ...Object.keys(EMPTY_RACE_FORM).map((p) => 'race.' + p),
];
export const CHARACTER_CREATOR_PATHS = keyBy(
  CHARACTER_CREATOR_PATHS_LIST,
  (p) => p,
);
