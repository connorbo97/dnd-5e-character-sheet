import {
  CreateConfigEntry,
  CreateConfigEntryConfig,
  SECTION_CONFIG_FORMAT,
  SECTION_CONFIG_TYPE,
} from 'constants/characterCreatorSections';
import { FIGHTING_STYLE_CONFIGS } from 'constants/fightingStyles';
import { MONEY_CONFIGS } from 'constants/money';
import { OTHER_PROFICIENCY_CATEGORY } from 'constants/otherProficiencies';
import {
  CREATURE_SIZE,
  CREATURE_TYPE,
  IGNORE_PATH,
  MULTI_PATH,
  WALKING_TYPE,
} from 'constants/raceTypes';
import { ResourceConfig } from 'constants/resources';
import { TOOLS_CONFIG } from 'constants/tools';
import { fill, find, get } from 'lodash';

export const getStatsFeature = (stats) => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.STATS,
  path: 'stats',
  value: stats,
});
export const getPresentationConfig = (header) => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.BASIC,
  path: IGNORE_PATH,
  config: {
    header,
    hideContent: true,
  },
});
export const getNoteConfig = (header) => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.NOTE,
  path: IGNORE_PATH,
  config: {
    header,
    hideContent: true,
  },
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
export const getMoneyFeature = (money): CreateConfigEntry => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.BASIC,
  path: 'money',
  value: money,
  config: {
    header: 'Money',
    renderValue: (v) =>
      Object.entries(v)
        .map(
          ([type, value]) =>
            `${value}${MONEY_CONFIGS[type].shortLabel.toLowerCase()}`,
        )
        .join(', '),
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
export const getFightingStyleChoice = (options, config = {}) =>
  getBasicDropdownChoice({
    options,
    path: MULTI_PATH,
    getFinalValue: (value) => ({
      features: [
        {
          label: `Fighting Style: ${FIGHTING_STYLE_CONFIGS[value].label}`,
          description: FIGHTING_STYLE_CONFIGS[value].description,
        },
      ],
      ...FIGHTING_STYLE_CONFIGS[value]?.config,
    }),
    header: 'Fighting Style',
    config: {
      getDescription: (value) => FIGHTING_STYLE_CONFIGS[value]?.description,
      ...config,
    },
  });
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
export const getChoiceLanguageProficiencies = (
  options,
  totalChoices: number = 1,
) =>
  getStaticWithChoices(
    {
      custom: fill(Array(totalChoices), { options }),
      path: 'otherProficiencies',
    },
    {
      header: 'Languages',
      getPlaceholder: () => `Choose`,
      getFinalValue: ({ custom = [] }: any = {}) =>
        custom.map(({ value }) => ({ category: 'Language', label: value })),
    },
  );

export const getOtherProficiencyForClass = (
  header,
  proficiencies,
): CreateConfigEntry => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.PROFICIENCY_CLASS,
  config: {
    header,
  },
  path: 'otherProficiencies',
  value: proficiencies,
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
export const getChoiceToolProficiencies = (
  options,
  totalChoices: number = 1,
  { header = 'Tool proficiencies' } = {},
) =>
  getStaticWithChoices(
    {
      custom: fill(Array(totalChoices), { options }),
      path: MULTI_PATH,
    },
    {
      header,
      getPlaceholder: () => `Choose`,
      getFinalValue: ({ custom = [] }: any = {}) => ({
        otherProficiencies: custom.map(({ value }) => ({
          category: OTHER_PROFICIENCY_CATEGORY.TOOL,
          label: value,
        })),
        customChecks: custom.map(({ value }) => ({
          label: TOOLS_CONFIG[value].label,
        })),
      }),
    },
  );

export const getBasicFeature = (value) => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.FEATURE,
  path: 'features',
  value,
});
export const getBasicFeatureByLD = (label, description) =>
  getBasicFeature({ label, description });

export const getFeatureWithResource = (
  label,
  description,
  resourceConfig: ResourceConfig,
): CreateConfigEntry => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.FEATURE,
  path: MULTI_PATH,
  value: { description, label },
  config: {
    getFinalValue: (value) => ({
      features: [value],
      resources: [resourceConfig],
    }),
  },
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
