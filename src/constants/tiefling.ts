import {
  HUMANOID_TYPE_FEATURE,
  MEDIUM_SIZE_FEATURE,
  getBasicFeature,
  getDarkvision,
  getLanguageFeature,
  getMovementFeature,
  getStatsFeature,
} from './race/commonRace';
import { RaceConfigsCreateConfig } from './raceTypes';
import { STATS } from './stats';

export const TIEFLING_CREATE_CONFIG: RaceConfigsCreateConfig = {
  base: [
    getStatsFeature({
      [STATS.CHA]: 2,
      [STATS.INT]: 1,
    }),
    HUMANOID_TYPE_FEATURE,
    MEDIUM_SIZE_FEATURE,
    getMovementFeature(30),
    getLanguageFeature(['Infernal'], '', ''),
    getBasicFeature({
      label: 'Hellish Resistance',
      description: 'You have resistance to fire damage.',
    }),
    getDarkvision(),
    // TODO: SPELLCASTING
    /* Infernal Legacy
You know the thaumaturgy cantrip.*/
  ],
};
