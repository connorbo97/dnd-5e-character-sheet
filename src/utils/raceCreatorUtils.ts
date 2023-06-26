import { STATS_CONFIGS } from 'constants/stats';
import { addNumberSign } from './stringUtils';
import { entries, isNil } from 'lodash';

export const getStatStringFromEntry = ([type, mod]) =>
  `${STATS_CONFIGS[type].label} ${addNumberSign(mod)}`;

export const getStatStringFromBlock = (stats) =>
  entries(stats).map(getStatStringFromEntry).join(', ');

export const convertCustomStatsToStatBlock = (customStats) =>
  customStats
    .filter(({ value }) => value)
    .reduce((acc, { mod, value }) => {
      acc[value] = (acc[value] || 0) + mod;
      return acc;
    }, {});
export const mergeStatBlocks = (blockA, blockB) => {
  if (!blockA) {
    return { ...(blockB || {}) };
  } else if (!blockB) {
    return { ...(blockA || {}) };
  }
  return entries(blockB).reduce(
    (acc, [stat, mod]) => {
      if (!isNil(acc[stat])) {
        acc[stat] += mod;
      } else {
        acc[stat] = mod;
      }

      return acc;
    },
    { ...blockA },
  );
};
