import { CREATURE_SIZE, RaceConfigsCreateConfig } from 'constants/raceTypes';
import {
  HUMANOID_TYPE_FEATURE,
  getBasicDropdownChoice,
  getChoiceSkillProficiencies,
  getConditionalFeatureByReference,
  getDarkvision,
  getFeatChoicesFeature,
  getMovementFeature,
  getStaticWithChoices,
} from './commonCreatorConfigs';
import { STATS_OPTIONS_W_LABELS } from 'constants/stats';
import {
  convertCustomStatsToStatBlock,
  getStatStringFromBlock,
} from 'utils/raceCreatorUtils';
import { addNumberSign } from 'utils/stringUtils';
import { SKILL_OPTIONS } from 'constants/skills';

export const TASHA_CUSTOM_LINEAGE_CREATE_CONFIG: RaceConfigsCreateConfig = {
  base: [
    getStaticWithChoices(
      {
        path: 'stats',
        custom: [{ mod: 2, options: STATS_OPTIONS_W_LABELS }],
      },
      {
        header: 'Stats',
        getLabelValue: (custom) =>
          getStatStringFromBlock(convertCustomStatsToStatBlock(custom)),
        getFinalValue: ({ custom }) =>
          convertCustomStatsToStatBlock([...custom]),
        getPlaceholder: ({ mod }) => `Choose stat for ${addNumberSign(mod)}`,
      },
    ),
    HUMANOID_TYPE_FEATURE,
    getBasicDropdownChoice({
      options: [
        { value: CREATURE_SIZE.SMALL, label: CREATURE_SIZE.SMALL },
        { value: CREATURE_SIZE.MEDIUM, label: CREATURE_SIZE.MEDIUM },
      ],
      getFinalValue: (v) => v,
      path: 'size',
      header: 'Size',
    }),
    getMovementFeature(30),
    getBasicDropdownChoice({
      options: [
        { value: 'DARKVISION', label: 'Darkvision' },
        { value: 'SKILL_CHOICE', label: 'Skill Proficiency' },
      ],
      getFinalValue: (v) => v,
      path: 'IGNORE',
      header: 'Variable Trait',
      config: {
        reference: 'VARIABLE_TRAIT',
        description:
          'You gain one of the following options of your choice: (a) darkvision with a range of 60 feet or (b) proficiency in one skill of your choice.',
      },
    }),
    getConditionalFeatureByReference(
      'VARIABLE_TRAIT',
      (v) => v === 'DARKVISION',
      getDarkvision(),
    ),
    getConditionalFeatureByReference(
      'VARIABLE_TRAIT',
      (v) => v === 'SKILL_CHOICE',
      getChoiceSkillProficiencies(SKILL_OPTIONS, 1),
    ),
    getFeatChoicesFeature(
      1,
      'Select one feat in the Feats section of the character creator',
    ),
  ],
};
