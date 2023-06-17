import { isNil } from 'lodash';

export const addNumberSign = (num, addSpace = false) => {
  if (addSpace) {
    return `${num < 0 ? '-' : '+'} ${Math.abs(num)}`;
  }

  return num < 0 ? num.toString() : `+${num}`;
};

export const conditionalJoinStrings = (strings, joiner = ' ') =>
  strings.filter((s) => !!s || s === 0).join(joiner);
