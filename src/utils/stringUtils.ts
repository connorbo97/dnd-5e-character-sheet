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

export const joinStringsWithSuffix = (strings, suffix) =>
  strings.length <= 1
    ? strings.join('')
    : [strings.slice(0, -1).join(', '), strings[strings.length - 1]].join(
        suffix,
      );
export const joinAndStrings = (strings) =>
  joinStringsWithSuffix(strings, ' and ');
export const joinOrStrings = (strings) =>
  joinStringsWithSuffix(strings, ' or ');

export const capitalizeFirstLetter = (string: string): string =>
  string?.length > 0 ? string.charAt(0).toUpperCase() + string.slice(1) : '';
