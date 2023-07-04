import { STATS, STATS_OPTIONS_W_LABELS } from 'constants/stats';
import {
  HUMANOID_TYPE_FEATURE,
  MEDIUM_SIZE_FEATURE,
  getBasicFeature,
  getChoiceSkillProficiencies,
  getDarkvision,
  getLanguageFeature,
  getStaticWithChoices,
  getMovementFeature,
} from './commonCreatorConfigs';
import { SKILL_OPTIONS } from 'constants/skills';
import { addNumberSign } from 'utils/stringUtils';
import { getStatStringFromBlock } from 'utils/statUtils';
import { convertCustomStatsToStatBlock } from 'utils/characterCreator/ccUtils';

export const HALF_ELF_CREATE_CONFIG = {
  base: [
    getStaticWithChoices(
      {
        path: 'stats',
        custom: [
          { mod: 1, options: STATS_OPTIONS_W_LABELS },
          { mod: 1, options: STATS_OPTIONS_W_LABELS },
        ],
        statics: [{ mod: 2, value: STATS.CHA }],
      },
      {
        header: 'Stats',
        getLabelValue: (custom, statics) =>
          getStatStringFromBlock(
            convertCustomStatsToStatBlock([
              ...statics,
              ...custom.filter(({ value }) => value),
            ]),
          ),
        getFinalValue: ({ custom, statics }) =>
          convertCustomStatsToStatBlock([...statics, ...custom]),
        getPlaceholder: ({ mod }) => `Choose stat for ${addNumberSign(mod)}`,
        allowPartial: true,
      },
    ),
    HUMANOID_TYPE_FEATURE,
    MEDIUM_SIZE_FEATURE,
    getMovementFeature(30),
    getChoiceSkillProficiencies(SKILL_OPTIONS, 2),
    getLanguageFeature(['Elvish'], ''),
    getDarkvision(),
    getBasicFeature({
      label: 'Fey Ancestry',
      description: `You have advantage on saving throws against being charmed, and magic can’t put you to sleep.`,
    }),
  ],
};
