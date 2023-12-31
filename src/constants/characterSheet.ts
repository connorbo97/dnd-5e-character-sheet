import { ADVANTAGE_TOGGLE } from './advantageToggle';
import { ALIGNMENTS } from './alignments';
import { AttackEntry } from './attacks';
import { CharacterSheetPath } from './characterSheetPaths';
import { CLASSES } from './classes';
import { DICE } from './dice';
import { FeatureConfig } from './features';
import { ModBlock, ProficiencyConfig } from './general';
import { InventoryItem } from './inventory';
import { MONEY } from './money';
import { RACES } from './raceTypes';
import { ResourceConfig } from './resources';
import { ROLLABLES, Rollable } from './rollable';
import { SKILLS, SKILL_SORT } from './skills';
import { STATS, STAT_BLOCK_TYPE } from './stats';
import { WHISPER_TOGGLE } from './whisperToggle';

export type CharacterSheetLevels = {
  [c in CLASSES]?: {
    total: number;
    isMain?: boolean;
  };
};
export type GlobalAttackModifierEntry = {
  base: ROLLABLES;
  label: string;
  source?: string;
};

export type GlobalACModifierType = {
  base: Rollable;
  isNotCompatibleWithArmor?: boolean;
  newACFormula?: boolean;
  label: string;
  source?: string;
};

export type CharacterSheetCustomBonuses = {
  initiative?: Array<ModBlock>;
  hp?: Array<ModBlock>;
};
export type CharacterSheet = {
  [CharacterSheetPath.name]: string;
  [CharacterSheetPath.advantageToggle]: ADVANTAGE_TOGGLE;
  [CharacterSheetPath.whisperToggle]: WHISPER_TOGGLE;
  [CharacterSheetPath.skillSort]: SKILL_SORT;
  [CharacterSheetPath.profBonus]: number;
  [CharacterSheetPath.levels]: CharacterSheetLevels;
  [CharacterSheetPath.spellcastingAbility]: STATS | 'NONE';
  [CharacterSheetPath.race]: {
    value: RACES;
    subRace: string;
    custom?: object;
  };
  [CharacterSheetPath.background]: {
    value: string;
    label?: string;
    description?: string;
  };
  [CharacterSheetPath.alignment]: ALIGNMENTS;
  [CharacterSheetPath.stats]: STAT_BLOCK_TYPE;
  [CharacterSheetPath.savingThrows]: {
    [s in STATS]?: ProficiencyConfig;
  };
  [CharacterSheetPath.skills]: {
    [s in SKILLS]?: ProficiencyConfig;
  };
  [CharacterSheetPath.customChecks]: Array<ProficiencyConfig>;
  [CharacterSheetPath.resources]: Array<ResourceConfig>;
  [CharacterSheetPath.features]: Array<FeatureConfig>;
  [CharacterSheetPath.otherProficiencies]: {
    [s: string]: ProficiencyConfig;
  };
  [CharacterSheetPath.money]: {
    [s in MONEY]?: number;
  };
  [CharacterSheetPath.inventory]: Array<InventoryItem>;
  [CharacterSheetPath.deathSaves]: {
    successes: [boolean?, boolean?, boolean?];
    failures: [boolean?, boolean?, boolean?];
  };
  [CharacterSheetPath.inspiration]: boolean;
  [CharacterSheetPath.curHp]: number;
  [CharacterSheetPath.tempHp]: number;
  [CharacterSheetPath.tempMaxHp]: number;
  [CharacterSheetPath.hitDice]: {
    [d in DICE]?: {
      total: number;
      max: number;
    };
  };
  [CharacterSheetPath.customBonuses]: CharacterSheetCustomBonuses;
  [CharacterSheetPath.attacks]: Array<AttackEntry>;
  [CharacterSheetPath.globalAttackModifier]: Array<GlobalAttackModifierEntry>;
  [CharacterSheetPath.globalDamageModifier]: Array<{
    base: ROLLABLES;
    label: string;
    source?: string;
  }>;
  [CharacterSheetPath.globalACModifier]: Array<GlobalACModifierType>;
};

export const DEFAULT_SHEET: CharacterSheet = {
  name: 'Placeholder',
  advantageToggle: ADVANTAGE_TOGGLE.NORMAL,
  whisperToggle: WHISPER_TOGGLE.NORMAL,
  profBonus: 2,
  spellcastingAbility: STATS.WIS,
  levels: {
    [CLASSES.BARBARIAN]: {
      total: 1,
    },
    [CLASSES.CLERIC]: {
      total: 2,
      isMain: true,
    },
  },
  race: {
    value: RACES.HUMAN,
    subRace: 'Standard',
  },
  [CharacterSheetPath.resources]: [
    {
      label: 'Channel Divinity',
      source: 'Cleric',
      total: 1,
      max: 1,
      resetOnShortRest: true,
      resetOnLongRest: true,
    },
  ],
  [CharacterSheetPath.features]: [
    {
      label: 'Rage',
      source: 'test',
      description:
        'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.\n\nWhile raging, you gain the following benefits if you aren’t wearing heavy armor:\n\nYou have advantage on Strength checks and Strength saving throws.\nWhen you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table.\nYou have resistance to bludgeoning, piercing, and slashing damage.\n\nIf you are able to cast spells, you can’t cast them or concentrate on them while raging.\n\nYour rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven’t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action.\n\nOnce you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.',
    },
  ],
  background: {
    value: 'Sailor',
    label: 'Sailor',
    description: 'I am a sailor',
  },
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
  skillSort: SKILL_SORT.ALPHABETICAL,
  savingThrows: {},
  customChecks: [
    {
      label: "Smith's Tools",
      stat: STATS.STR,
    },
  ],
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
  inspiration: false,
  curHp: 20,
  tempMaxHp: 0,
  tempHp: 0,
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
  [CharacterSheetPath.globalAttackModifier]: [],
  [CharacterSheetPath.globalDamageModifier]: [],
  [CharacterSheetPath.globalACModifier]: [],
  [CharacterSheetPath.attacks]: [
    {
      label: 'Test Label',
      source: 'test source',
      description: 'test description',
      attack: {
        isEnabled: true,
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
          isEnabled: true,
          base: [
            [1, DICE.d6],
            [1, DICE.d4],
          ],
          stat: STATS.CHA,
          crit: [[1, DICE.d6]],
          type: 'Slashing',
        },
        {
          isEnabled: true,
          base: [[2, DICE.d6]],
          stat: STATS.STR,
          label: "Hunter's Mark",
        },
      ],
      savingThrow: {
        isEnabled: false,
        dc: ROLLABLES.SPELL,
        flatDC: 10,
        dcSave: STATS.INT,
        effect: 'test',
      },
    },
    {
      label: 'Second Attack',
      source: 'test source 2 ',
      description: 'test description 2',
      attack: {
        isEnabled: true,
        stat: STATS.STR,
        mod: {
          value: 2,
          source: '',
        },
        proficient: false,
        range: '30/90',
        critRange: 19,
      },
      damage: [
        {
          isEnabled: false,
          base: [
            [1, DICE.d6],
            [1, DICE.d4],
          ],
          stat: STATS.CHA,
          crit: [[1, DICE.d6]],
          type: 'Slashing',
        },
        {
          isEnabled: false,
          base: [
            [1, DICE.d6],
            [1, DICE.d4],
          ],
          stat: STATS.CHA,
          crit: [[1, DICE.d6]],
          type: 'Slashing',
        },
      ],
      savingThrow: {
        isEnabled: true,
        dc: ROLLABLES.SPELL,
        flatDC: 10,
        dcSave: STATS.INT,
        effect: 'On a successful save, take half damage.',
      },
    },
  ],
  [CharacterSheetPath.inventory]: [
    {
      label: 'Leather Armor',
      description: 'some description',
      source: 'character creation',
      mods: {
        ac: [11, STATS.DEX],
      },
      equipped: true,
      total: 1,
      weight: 10,
      useAsResource: false,
    },
  ],
};
