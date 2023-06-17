import { DICE } from './dice';

export enum CLASSES {
  ARTIFICER = 'ARTIFICER',
  BARBARIAN = 'BARBARIAN',
  BARD = 'BARD',
  CLERIC = 'CLERIC',
  DRUID = 'DRUID',
  FIGHTER = 'FIGHTER',
  MONK = 'MONK',
  PALADIN = 'PALADIN',
  RANGER = 'RANGER',
  ROGUE = 'ROGUE',
  SORCERER = 'SORCERER',
  WARLOCK = 'WARLOCK',
  WIZARD = 'WIZARD',
}

export type ClassConfig = { hitDice: DICE };
export const CLASS_CONFIGS: { [c in CLASSES]: ClassConfig } = {
  [CLASSES.ARTIFICER]: { hitDice: DICE.d8 },
  [CLASSES.BARBARIAN]: { hitDice: DICE.d12 },
  [CLASSES.BARD]: { hitDice: DICE.d8 },
  [CLASSES.CLERIC]: { hitDice: DICE.d8 },
  [CLASSES.DRUID]: { hitDice: DICE.d8 },
  [CLASSES.FIGHTER]: { hitDice: DICE.d10 },
  [CLASSES.MONK]: { hitDice: DICE.d8 },
  [CLASSES.PALADIN]: { hitDice: DICE.d10 },
  [CLASSES.RANGER]: { hitDice: DICE.d10 },
  [CLASSES.ROGUE]: { hitDice: DICE.d8 },
  [CLASSES.SORCERER]: { hitDice: DICE.d6 },
  [CLASSES.WARLOCK]: { hitDice: DICE.d8 },
  [CLASSES.WIZARD]: { hitDice: DICE.d6 },
};
