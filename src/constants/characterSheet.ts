import { DICE } from './dice';
import { ProficiencyConfig } from './general';
import { Money } from './money';
import { Skills } from './skills';
import { STATS } from './stats';

export type CharacterSheet = {
  name: string;
  profBonus: number;
  stats: {
    [s in STATS]: number;
  };
  savingThrows: {
    [s in STATS]?: ProficiencyConfig;
  };
  skills: {
    [s in Skills]?: ProficiencyConfig;
  };
  tools: {
    [s: string]: ProficiencyConfig;
  };
  otherProficiencies: {
    [s: string]: ProficiencyConfig;
  };
  money: {
    [s in Money]?: number;
  };
  deathSaves: {
    successes: [boolean?, boolean?, boolean?];
    failures: [boolean?, boolean?, boolean?];
  };
  hitDice: {
    [d in DICE]?: {
      total: number;
      max: number;
    };
  };
};

export const DEFAULT_SHEET: CharacterSheet = {
  name: 'Placeholder',
  profBonus: 2,
  stats: {
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10,
  },
  skills: {},
  savingThrows: {},
  tools: {
    TEST: {
      label: "Smith's Tools",
      stat: STATS.STR,
      category: 'Armor',
    },
  },
  otherProficiencies: {
    TEST: {
      label: 'test',
      category: 'Armor',
    },
  },
  money: {},
  deathSaves: {
    successes: [],
    failures: [],
  },
  hitDice: {
    [DICE.d12]: {
      total: 1,
      max: 5,
    },
    [DICE.d10]: {
      total: 2,
      max: 5,
    },
  },
};
