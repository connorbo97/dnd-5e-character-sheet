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

export type ClassConfig = { hitDice: DICE; label: string };
export const CLASS_CONFIGS: { [c in CLASSES]: ClassConfig } = {
  [CLASSES.ARTIFICER]: { hitDice: DICE.d8, label: 'Artificer' },
  [CLASSES.BARBARIAN]: { hitDice: DICE.d12, label: 'Barbarian' },
  [CLASSES.BARD]: { hitDice: DICE.d8, label: 'Bard' },
  [CLASSES.CLERIC]: { hitDice: DICE.d8, label: 'Cleric' },
  [CLASSES.DRUID]: { hitDice: DICE.d8, label: 'Druid' },
  [CLASSES.FIGHTER]: { hitDice: DICE.d10, label: 'Fighter' },
  [CLASSES.MONK]: { hitDice: DICE.d8, label: 'Monk' },
  [CLASSES.PALADIN]: { hitDice: DICE.d10, label: 'Paladin' },
  [CLASSES.RANGER]: { hitDice: DICE.d10, label: 'Ranger' },
  [CLASSES.ROGUE]: { hitDice: DICE.d8, label: 'Rogue' },
  [CLASSES.SORCERER]: { hitDice: DICE.d6, label: 'Sorcerer' },
  [CLASSES.WARLOCK]: { hitDice: DICE.d8, label: 'Warlock' },
  [CLASSES.WIZARD]: { hitDice: DICE.d6, label: 'Wizard' },
};
