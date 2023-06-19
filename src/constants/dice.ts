export enum DICE {
  d2 = 'd2',
  d4 = 'd4',
  d6 = 'd6',
  d8 = 'd8',
  d10 = 'd10',
  d12 = 'd12',
  d20 = 'd20',
  d100 = 'd100',
}

export const DICE_VALUES = Object.values(DICE);
export const DICE_VALUES_SET = new Set(DICE_VALUES);

type DiceConfig = {};

export const DICE_CONFIGS: { [d in DICE]: DiceConfig } = {
  [DICE.d2]: {},
  [DICE.d4]: {},
  [DICE.d6]: {},
  [DICE.d8]: {},
  [DICE.d10]: {},
  [DICE.d12]: {},
  [DICE.d20]: {},
  [DICE.d100]: {},
};

export const DiceRegex = /[0-9]d[0-9]/;
