import {
  SECTION_CONFIG_FORMAT,
  SECTION_CONFIG_TYPE,
} from 'constants/characterCreatorSections';
import { STATS_CONFIGS } from 'constants/stats';
import { keyBy, mapValues } from 'lodash';

export const getSavingThrowClassProficiency = (stats) => {
  return {
    type: SECTION_CONFIG_TYPE.STATIC,
    format: SECTION_CONFIG_FORMAT.PROFICIENCY_CLASS,
    value: mapValues(
      keyBy(stats, (s) => s),
      (v) => ({ proficient: true, label: STATS_CONFIGS[v].label }),
    ),
    path: 'savingThrows',
    config: {
      header: 'Saving Throws',
    },
  };
};
