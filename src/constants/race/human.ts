import { RaceConfigsCreateConfig } from 'constants/raceTypes';
import {
  HUMANOID_TYPE_FEATURE,
  MEDIUM_SIZE_FEATURE,
  getChoiceSkillProficiencies,
  getFeatChoicesFeature,
  getMovementFeature,
  getStaticWithChoices,
  getStatsFeature,
} from './commonCreatorConfigs';
import { LANGUAGE_OPTIONS } from 'constants/languages';
import { STATS, STATS_OPTIONS_W_LABELS } from 'constants/stats';
import { getStatStringFromBlock } from 'utils/statUtils';
import { convertCustomStatsToStatBlock } from 'utils/characterCreator/ccUtils';
import { addNumberSign } from 'utils/stringUtils';
import { SKILL_OPTIONS } from 'constants/skills';

export const HUMAN_CREATE_CONFIG: RaceConfigsCreateConfig = {
  base: [
    HUMANOID_TYPE_FEATURE,
    MEDIUM_SIZE_FEATURE,
    getMovementFeature(30),
    getStaticWithChoices(
      {
        path: 'features',
        custom: [{ options: LANGUAGE_OPTIONS }],
        statics: ['Common'],
      },
      {
        header: 'Languages',
        subHeader: 'Language Proficiencies:',
        description:
          'You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech⁠ with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on.',
        getPlaceholder: () => `Choose`,
        getFinalValue: ({ custom, statics }) =>
          [...statics, ...custom.map(({ value }) => value)].map((label) => ({
            label,
            type: 'Language',
          })),
        getLabelValue: (custom, statics) =>
          [...statics, ...custom.map(({ value }) => value)].join(', '),
      },
    ),
  ],
  subRaceOptions: [
    { value: 'Standard', label: 'Standard' },
    { value: 'Variant', label: 'Variant' },
  ],
  subRace: {
    Standard: [
      getStatsFeature({
        [STATS.STR]: 1,
        [STATS.DEX]: 1,
        [STATS.CON]: 1,
        [STATS.INT]: 1,
        [STATS.WIS]: 1,
        [STATS.CHA]: 1,
      }),
    ],
    Variant: [
      getStaticWithChoices(
        {
          path: 'stats',
          custom: [
            { mod: 1, options: STATS_OPTIONS_W_LABELS },
            { mod: 1, options: STATS_OPTIONS_W_LABELS },
          ],
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
      getChoiceSkillProficiencies(SKILL_OPTIONS, 1),
      getFeatChoicesFeature(
        1,
        'Variant humans adapt to their environment. Select one feat in the Feats section of the character creator',
      ),
    ],
  },
};
