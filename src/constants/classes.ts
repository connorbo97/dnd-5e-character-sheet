import { entries } from 'lodash';
import { DICE } from './dice';
import { BARBARIAN_LEVEL_ONE_CONFIG } from './class/barbarian';
import { ARTIFICER_LEVEL_ONE_CONFIG } from './class/artificer';
import { BARD_LEVEL_ONE_CONFIG } from './class/bard';
import { CLERIC_LEVEL_ONE_CONFIG } from './class/cleric';
import { DRUID_LEVEL_ONE_CONFIG } from './class/druid';
import { FIGHTER_LEVEL_ONE_CONFIG } from './class/fighter';
import { MONK_LEVEL_ONE_CONFIG } from './class/monk';
import { PALADIN_LEVEL_ONE_CONFIG } from './class/paladin';
import { RANGER_LEVEL_ONE_CONFIG } from './class/ranger';
import { ROGUE_LEVEL_ONE_CONFIG } from './class/rogue';

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

export type ClassConfig = {
  hitDice: DICE;
  label: string;
  levelOneConfig?: any;
};
export const CLASS_CONFIGS: { [c in CLASSES]: ClassConfig } = {
  [CLASSES.ARTIFICER]: {
    hitDice: DICE.d8,
    label: 'Artificer',
    levelOneConfig: ARTIFICER_LEVEL_ONE_CONFIG,
  },
  [CLASSES.BARBARIAN]: {
    hitDice: DICE.d12,
    label: 'Barbarian',
    levelOneConfig: BARBARIAN_LEVEL_ONE_CONFIG,
  },
  [CLASSES.BARD]: {
    hitDice: DICE.d8,
    label: 'Bard',
    levelOneConfig: BARD_LEVEL_ONE_CONFIG,
  },
  [CLASSES.CLERIC]: {
    hitDice: DICE.d8,
    label: 'Cleric',
    levelOneConfig: CLERIC_LEVEL_ONE_CONFIG,
  },
  [CLASSES.DRUID]: {
    hitDice: DICE.d8,
    label: 'Druid',
    levelOneConfig: DRUID_LEVEL_ONE_CONFIG,
  },
  [CLASSES.FIGHTER]: {
    hitDice: DICE.d10,
    label: 'Fighter',
    levelOneConfig: FIGHTER_LEVEL_ONE_CONFIG,
  },
  [CLASSES.MONK]: {
    hitDice: DICE.d8,
    label: 'Monk',
    levelOneConfig: MONK_LEVEL_ONE_CONFIG,
  },
  [CLASSES.PALADIN]: {
    hitDice: DICE.d10,
    label: 'Paladin',
    levelOneConfig: PALADIN_LEVEL_ONE_CONFIG,
  },
  [CLASSES.RANGER]: {
    hitDice: DICE.d10,
    label: 'Ranger',
    levelOneConfig: RANGER_LEVEL_ONE_CONFIG,
  },
  [CLASSES.ROGUE]: {
    hitDice: DICE.d8,
    label: 'Rogue',
    levelOneConfig: ROGUE_LEVEL_ONE_CONFIG,
  },
  [CLASSES.SORCERER]: { hitDice: DICE.d6, label: 'Sorcerer' },
  [CLASSES.WARLOCK]: { hitDice: DICE.d8, label: 'Warlock' },
  [CLASSES.WIZARD]: { hitDice: DICE.d6, label: 'Wizard' },
};
export const CLASS_OPTIONS = entries(CLASS_CONFIGS).map(([type, entry]) => ({
  value: type,
  label: entry.label,
}));
