import { Money } from './money';
import { Skills } from './skills';
import { Stats } from './stats';

export type ProficiencyConfig = {
  proficient?: boolean;
  expertise?: boolean;

  mod?: number;

  category?: string;
  stat?: Stats;
  label?: string;
};

export type CharacterSheet = {
  name: string;
  profBonus: number;
  stats: {
    [s in Stats]: number;
  };
  savingThrows: {
    [s in Stats]?: ProficiencyConfig;
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
      stat: Stats.STR,
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
};
