import { values } from 'lodash';

export enum LANGUAGES {
  ABYSSAL = 'Abyssal',
  CELESTIAL = 'Celestial',
  COMMON = 'Common',
  DEEP_SPEECH = 'Deep Speech',
  DRACONIC = 'Draconic',
  DWARVISH = 'Dwarvish',
  ELVISH = 'Elvish',
  GIANT = 'Giant',
  GNOMISH = 'Gnomish',
  GOBLIN = 'Goblin',
  HALFLING = 'Halfling',
  INFERNAL = 'Infernal',
  ORC = 'Orc',
  PRIMORDIAL = 'Primordial',
  SYLVAN = 'Sylvan',
  UNDERCOMMON = 'Undercommon',
}

export const LANGUAGES_LIST = values(LANGUAGES);
export const LANGUAGE_OPTIONS = LANGUAGES_LIST.map((l) => ({
  label: l,
  value: l,
}));

export const LANGUAGE_PROFICIENCIES = LANGUAGES_LIST.reduce((acc, l) => {
  acc[l] = l;

  return acc;
}, {});
