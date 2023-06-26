import {
  CREATURE_SIZE,
  CREATURE_TYPE,
  RACE_CONFIG_FORMAT,
  RACE_CONFIG_TYPE,
  WALKING_TYPE,
} from 'constants/raceTypes';

export const getStatsFeature = (stats) => ({
  type: RACE_CONFIG_TYPE.STATIC,
  format: RACE_CONFIG_FORMAT.STATS,
  path: 'stats',
  value: stats,
});
export const getWalkingFeature = (ms) => ({
  type: RACE_CONFIG_TYPE.STATIC,
  format: RACE_CONFIG_FORMAT.SPEED,
  path: 'speed',
  value: [{ value: ms, type: WALKING_TYPE }],
  config: {
    header: 'Speed',
  },
});
export const getLanguageFeature = (extraLanguages, description) => ({
  type: RACE_CONFIG_TYPE.STATIC,
  format: RACE_CONFIG_FORMAT.PROFICIENCY,
  path: 'otherProficiencies',
  value: [
    { label: 'Common', category: 'Language' },
    ...extraLanguages.map((l) => ({ label: l, category: 'Language' })),
  ],
  config: {
    header: 'Languages',
    subHeader: 'Language Proficiencies',
    description,
  },
});
export const MEDIUM_SIZE_FEATURE = {
  type: RACE_CONFIG_TYPE.STATIC,
  format: RACE_CONFIG_FORMAT.BASIC,
  path: 'size',
  value: CREATURE_SIZE.MEDIUM,
  config: {
    header: 'Size',
  },
};
export const HUMANOID_TYPE_FEATURE = {
  type: RACE_CONFIG_TYPE.STATIC,
  format: RACE_CONFIG_FORMAT.BASIC,
  path: 'creatureType',
  value: CREATURE_TYPE.HUMANOID,
  config: {
    header: 'Creature Type',
  },
};

export const getProficiencies = (category, labels) => ({
  type: RACE_CONFIG_TYPE.STATIC,
  format: RACE_CONFIG_FORMAT.PROFICIENCY,
  path: 'otherProficiencies',
  value: labels.map((l) => ({ label: l, category })),
  config: {
    header: `${category} Proficiencies`,
  },
});

export const getBasicFeature = (value) => ({
  type: RACE_CONFIG_TYPE.STATIC,
  format: RACE_CONFIG_FORMAT.FEATURE,
  path: 'features',
  value,
});
