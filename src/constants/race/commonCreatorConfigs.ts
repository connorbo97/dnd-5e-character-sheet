import {
  CreateConfigEntry,
  CreateConfigEntryConfig,
  SECTION_CONFIG_FORMAT,
  SECTION_CONFIG_TYPE,
} from 'constants/characterCreatorSections';
import {
  CREATURE_SIZE,
  CREATURE_TYPE,
  WALKING_TYPE,
} from 'constants/raceTypes';
import { fill, find, get } from 'lodash';

export const getStatsFeature = (stats) => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.STATS,
  path: 'stats',
  value: stats,
});
export const getStaticWithChoices = (
  { path, custom, statics = [] as Array<any> },
  config: CreateConfigEntryConfig = {},
): CreateConfigEntry => ({
  type: SECTION_CONFIG_TYPE.CHOICE,
  format: SECTION_CONFIG_FORMAT.STATIC_CHOICE,
  path,
  value: {
    custom,
    statics,
  },
  config: {
    isFullValue: ({ custom }) =>
      custom.length === custom.filter(({ value }) => value).length,
    ...config,
  },
});
export const getMovementFeature = (ms) => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.SPEED,
  path: 'speed',
  value: [{ value: ms, type: WALKING_TYPE }],
  config: {
    header: 'Speed',
  },
});
export const getLanguageFeature = (
  extraLanguages,
  description = '',
  subHeader = 'Language Proficiencies',
) => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.PROFICIENCY,
  path: 'otherProficiencies',
  value: [
    { label: 'Common', category: 'Language' },
    ...extraLanguages.map((l) => ({ label: l, category: 'Language' })),
  ],
  config: {
    header: 'Languages',
    subHeader,
    description,
  },
});
export const getSizeFeature = (size) => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.BASIC,
  path: 'size',
  value: size,
  config: {
    header: 'Size',
  },
});

export const MEDIUM_SIZE_FEATURE = getSizeFeature(CREATURE_SIZE.MEDIUM);
export const HUMANOID_TYPE_FEATURE = {
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.BASIC,
  path: 'creatureType',
  value: CREATURE_TYPE.HUMANOID,
  config: {
    header: 'Creature Type',
  },
};

export const getProficiencies = (category, labels) => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.PROFICIENCY,
  path: 'otherProficiencies',
  value: labels.map((l) => ({ label: l, category })),
  config: {
    header: `${category} Proficiencies`,
  },
});
export const getSkillProficiencies = (skills) => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.SKILL_PROFICIENCY,
  path: 'skills',
  value: skills.reduce((acc, s) => ({ [s]: { proficient: true } }), {}),
  config: {
    header: `Skill Proficiencies`,
  },
});
export const getChoiceSkillProficiencies = (
  options,
  totalChoices: number = 1,
) =>
  getStaticWithChoices(
    {
      custom: fill(Array(totalChoices), { options }),
      path: 'skills',
    },
    {
      header: 'Skill Proficiencies',
      getPlaceholder: () => `Choose`,
      getFinalValue: ({ custom = [] }: any = {}) =>
        custom.reduce((acc, { value }) => {
          acc[value] = { proficient: true };

          return acc;
        }, {}),
    },
  );

export const getBasicFeature = (value) => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.FEATURE,
  path: 'features',
  value,
});

export const getDarkvision = () =>
  getBasicFeature({
    label: 'Darkvision',
    description:
      'You have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.',
  });

export const getBasicDropdownChoice = ({
  options,
  path,
  getFinalValue,
  header,
  config = {},
}) => ({
  type: SECTION_CONFIG_TYPE.CHOICE,
  format: SECTION_CONFIG_FORMAT.DROPDOWN,
  options,
  path,
  config: {
    header,
    getFinalValue,
    ...config,
  },
});

export const getFeatChoicesFeature = (
  totalChoices,
  description = 'Feats are selected in the Feats section of the character creator',
) => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.BASIC,
  path: 'featChoices',
  value: totalChoices,
  config: {
    header: 'Feat' + (totalChoices > 1 ? 's' : ''),
    description,
    hideValue: true,
  },
});

export const getConditionalFeatureByReference = (
  reference,
  shouldRender,
  feature,
) => ({
  choiceCondition: (configs) => {
    const targetConfig =
      find(configs, (c) => get(c, 'config.reference') === reference) || {};
    const value = get(targetConfig, 'value');

    return shouldRender(value);
  },
  ...feature,
});
