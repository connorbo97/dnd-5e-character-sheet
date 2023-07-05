import { pickBy } from 'lodash';
import { getBasicDropdownChoice } from './race/commonCreatorConfigs';
import { STATS_OPTIONS_W_LABELS } from './stats';
import { CreateConfigEntryConfig } from './characterCreatorSections';

export const getFeatStatBoost = (stats) => {
  const setOfStats = new Set(stats);

  return getBasicDropdownChoice({
    options: pickBy(STATS_OPTIONS_W_LABELS, ({ value }) =>
      setOfStats.has(value),
    ),
    getFinalValue: (v) => (v ? { [v]: 1 } : {}),
    header: 'Stat Increase',
    config: {
      getPlaceholder: () => 'Choose stat for +1',
    } as CreateConfigEntryConfig,
    path: 'stats',
  });
};
