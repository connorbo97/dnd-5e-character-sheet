import { entries, isNil } from 'lodash';
import { addNumberSign } from './stringUtils';
import { STATS_CONFIGS } from 'constants/stats';
export const getModifier = (val) => {
  if (isNil(val)) {
    return 0;
  }

  return Math.floor((val - 10) / 2);
};

export const getStatStringFromEntry = ([type, mod]) =>
  `${STATS_CONFIGS[type].label} ${addNumberSign(mod)}`;
export const getStatStringFromBlock = (stats) =>
  entries(stats).map(getStatStringFromEntry).join(', ');
