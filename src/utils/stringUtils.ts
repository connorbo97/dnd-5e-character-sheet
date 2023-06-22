import { isNumber } from 'lodash';

export const addNumberSign = (val, spacer = '') => {
  const isNumberValue = isNumber(val);
  const isNegativeNumber = isNumberValue && val < 0;
  if (spacer) {
    return `${isNegativeNumber ? '-' : '+'} ${
      isNumberValue ? Math.abs(val) : val
    }`;
  }

  return isNegativeNumber ? val.toString() : `+${val}`;
};

export const wrapInParens = (input) => `(${input.toString()})`;

export const conditionalJoinStrings = (strings, joiner = ' ') =>
  strings.filter((s) => !!s || s === 0).join(joiner);

export const getNumMatches = (target, regex) => {
  return [...target.matchAll(regex)].length;
};
