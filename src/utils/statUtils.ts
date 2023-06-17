import { isNil } from 'lodash';
export const getModifier = (val) => {
  if (isNil(val)) {
    return 0;
  }

  return Math.floor((val - 10) / 2);
};
