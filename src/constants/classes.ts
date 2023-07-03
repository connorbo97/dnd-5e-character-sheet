import { entries } from 'lodash';
import { DICE } from './dice';
import { BARBARIAN_CONFIG } from './class/barbarian';
import { ARTIFICER_CONFIG } from './class/artificer';
import { BARD_CONFIG } from './class/bard';
import { CLERIC_CONFIG } from './class/cleric';
import { DRUID_CONFIG } from './class/druid';
import { FIGHTER_CONFIG } from './class/fighter';
import { MONK_CONFIG } from './class/monk';
import { PALADIN_CONFIG } from './class/paladin';
import { RANGER_CONFIG } from './class/ranger';
import { ROGUE_CONFIG } from './class/rogue';
import { SORCERER_CONFIG } from './class/sorcerer';
import { WARLOCK_CONFIG } from './class/warlock';
import { WIZARD_LEVEL_ONE_CONFIG } from './class/wizard';

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
  equipment?: any;
};
export const CLASS_CONFIGS: { [c in CLASSES]: ClassConfig } = {
  [CLASSES.ARTIFICER]: {
    hitDice: DICE.d8,
    label: 'Artificer',
    ...ARTIFICER_CONFIG,
  },
  [CLASSES.BARBARIAN]: {
    hitDice: DICE.d12,
    label: 'Barbarian',
    ...BARBARIAN_CONFIG,
  },
  [CLASSES.BARD]: {
    hitDice: DICE.d8,
    label: 'Bard',
    ...BARD_CONFIG,
  },
  [CLASSES.CLERIC]: {
    hitDice: DICE.d8,
    label: 'Cleric',
    ...CLERIC_CONFIG,
  },
  [CLASSES.DRUID]: {
    hitDice: DICE.d8,
    label: 'Druid',
    ...DRUID_CONFIG,
  },
  [CLASSES.FIGHTER]: {
    hitDice: DICE.d10,
    label: 'Fighter',
    ...FIGHTER_CONFIG,
  },
  [CLASSES.MONK]: {
    hitDice: DICE.d8,
    label: 'Monk',
    ...MONK_CONFIG,
  },
  [CLASSES.PALADIN]: {
    hitDice: DICE.d10,
    label: 'Paladin',
    ...PALADIN_CONFIG,
  },
  [CLASSES.RANGER]: {
    hitDice: DICE.d10,
    label: 'Ranger',
    ...RANGER_CONFIG,
  },
  [CLASSES.ROGUE]: {
    hitDice: DICE.d8,
    label: 'Rogue',
    ...ROGUE_CONFIG,
  },
  [CLASSES.SORCERER]: {
    hitDice: DICE.d6,
    label: 'Sorcerer',
    ...SORCERER_CONFIG,
  },
  [CLASSES.WARLOCK]: {
    hitDice: DICE.d8,
    label: 'Warlock',
    ...WARLOCK_CONFIG,
  },
  [CLASSES.WIZARD]: {
    hitDice: DICE.d6,
    label: 'Wizard',
    levelOneConfig: WIZARD_LEVEL_ONE_CONFIG,
  },
};
export const CLASS_OPTIONS = entries(CLASS_CONFIGS).map(([type, entry]) => ({
  value: type,
  label: entry.label,
}));
