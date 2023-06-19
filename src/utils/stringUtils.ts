export const addNumberSign = (num, spacer = '') => {
  if (spacer) {
    return `${num < 0 ? '-' : '+'} ${Math.abs(num)}`;
  }

  return num < 0 ? num.toString() : `+${num}`;
};

export const conditionalJoinStrings = (strings, joiner = ' ') =>
  strings.filter((s) => !!s || s === 0).join(joiner);
