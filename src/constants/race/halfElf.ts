import { STATS, STATS_OPTIONS_W_LABELS } from 'constants/stats';
import { getStatsWithChoicesFeatures } from './commonRace';

export const HALF_ELF_CREATE_CONFIG = {
  base: [
    getStatsWithChoicesFeatures(
      [
        { mod: 1, options: STATS_OPTIONS_W_LABELS },
        { mod: 1, options: STATS_OPTIONS_W_LABELS },
      ],
      {
        [STATS.CHA]: 2,
      },
    ),
  ],
  subRaceOptions: [],
  subRace: {},
};
