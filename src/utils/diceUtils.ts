import { DICE } from 'constants/dice';

export const getDiceMax = (diceType: DICE | string) =>
  diceType ? parseInt(diceType.substring(1)) : 0;

export const getDiceAverage = (diceType: DICE | string) =>
  getDiceMax(diceType) / 2 + 1;

export const isDice = (input) => Object.values(DICE).findIndex(input) !== -1;
