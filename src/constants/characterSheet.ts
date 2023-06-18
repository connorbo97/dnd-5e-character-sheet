import { ALIGNMENTS } from './alignments';
import { AttackEntry } from './attacks';
import { CLASSES } from './classes';
import { DICE } from './dice';
import { ModBlock, ProficiencyConfig } from './general';
import { InventoryItem } from './inventory';
import { Money } from './money';
import { RACES } from './race';
import { Skills } from './skills';
import { STATS } from './stats';

export type CharacterSheetLevels = {
  [c in CLASSES]?: {
    total: number;
    isMain?: boolean;
  };
};

export type CharacterSheet = {
  name: string;
  profBonus: number;
  levels: CharacterSheetLevels;
  race: RACES;
  alignment: ALIGNMENTS;
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
  inventory: Array<InventoryItem>;
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
  customBonuses: {
    initiative?: Array<ModBlock>;
    hp?: Array<ModBlock>;
  };
  attacks: Array<AttackEntry>;
};

export const DEFAULT_SHEET: CharacterSheet = {
  name: 'Placeholder',
  profBonus: 2,
  levels: {
    [CLASSES.BARBARIAN]: {
      total: 1,
    },
    [CLASSES.CLERIC]: {
      total: 2,
      isMain: true,
    },
  },
  race: RACES.HUMAN,
  alignment: ALIGNMENTS.N,
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
      label: 'Light Armor',
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
      max: 1,
    },
    [DICE.d8]: {
      total: 2,
      max: 2,
    },
  },
  customBonuses: {
    initiative: [
      {
        value: 1,

        source: 'Some feature',
      },
      {
        value: -2,

        source: 'Some other feature',
      },
    ],
    hp: [
      {
        value: 1,
        source: 'Tough',
      },
      {
        value: 5,
        source: 'Custom',
        isStatic: true,
      },
    ],
  },
  attacks: [
    {
      label: 'Test Label',
      source: 'test source',
      description: 'test description',
      attack: {
        stat: STATS.CHA,
        mod: {
          value: 1,
          source: '',
        },
        proficient: true,
        range: '30/60',
        critRange: 20,
      },
      damage: [
        {
          base: ['1d6', '1d4'],
          stat: STATS.CHA,
          crit: '1d6',
          type: 'Slashing',
        },
        {
          base: ['2d6'],
          stat: STATS.STR,
        },
      ],
    },
    {
      label: 'Second Attack',
      source: 'test source 2 ',
      description: 'test description 2',
      attack: {
        stat: STATS.STR,
        mod: {
          value: 2,
          source: '',
        },
        proficient: false,
        range: '30/90',
        critRange: 19,
      },
      savingThrow: {
        stat: STATS.DEX,
        dc: 'SPELL',
        effect: 'On a successful save, take half damage.',
      },
    },
  ],
  inventory: [
    {
      label: 'Leather Armor',
      description: 'some description',
      source: 'character creation',
      mods: {
        ac: [16],
      },
      equipped: true,
      total: 1,
      weight: 10,
      useAsResource: false,
    },
  ],
};
