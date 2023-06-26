import { ModBlock } from './general';
import { STATS } from './stats';

export enum RACES {
  DRAGONBORN = 'DRAGONBORN',
  DWARF = 'DWARF',
  GNOME = 'GNOME',
  HALF_ELF = 'HALF_ELF',
  HALFLING = 'HALFLING',
  HALF_ORC = 'HALF_ORC',
  HUMAN = 'HUMAN',
  TIEFLING = 'TIEFLING',
  TASHA_CUSTOM = 'TASHA_CUSTOM',
  CUSTOM = 'CUSTOM',
}

export enum CREATURE_TYPE {
  HUMANOID = 'Humanoid',
}

export enum CREATURE_SIZE {
  TINY = 'Tiny',
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'LARGE',
}

export type RaceStatConfig = {
  stat: STATS;
  value: number;
};
// type SubRaceConfig = {
//   label: string;
//   value: string;
//   stats?: Array<RaceStatConfig>;
//   customStats?: Array<RaceStatConfig | ChoiceConfig>;
// };
// type CreateConfig = {
//   stats?: Array<RaceStatConfig>;
//   customStats?: Array<ChoiceConfig>;
//   speed?: Array<{ value: number; type: string }>;
//   size?: CREATURE_SIZE;
//   type?: CREATURE_TYPE;
//   languages?: ChoiceConfig | Array<string | ChoiceConfig>;
//   subraces?: {
//     [s: string]: SubRaceConfig;
//   };
//   features: Array<{ label: string; description: string }>;
// };
export enum RACE_CONFIG_TYPE {
  STATIC = 'STATIC',
  CHOICE = 'CHOICE',
}
export enum RACE_CONFIG_FORMAT {
  BASIC = 'BASIC',
  STATS = 'STATS',
  SPEED = 'SPEED',
  PROFICIENCY = 'PROFICIENCY',
  DROPDOWN = 'DROPDOWN',
  FEATURE = 'FEATURE',
}

type RaceConfigs = {
  [r in RACES]: {
    label: string;
    createConfig: {
      base: Array<{
        type: RACE_CONFIG_TYPE;
        format: RACE_CONFIG_FORMAT;
        [s: string]: any;
      }>;
      subRaceOptions?: Array<{ value: any; label: string }>;
      subRace?: {
        [s: string]: Array<{
          type: RACE_CONFIG_TYPE;
          format: RACE_CONFIG_FORMAT;
          [s: string]: any;
        }>;
      };
    };
  };
};

export const MULTI_PATH = 'MULTI';

export const RACE_CONFIGS: RaceConfigs = {
  [RACES.DRAGONBORN]: {
    label: 'Dragonborn',
    createConfig: { base: [] },
    // createConfig: {
    //   stats: [
    //     { stat: STATS.CHA, value: 1 },
    //     { stat: STATS.STR, value: 2 },
    //   ],
    //   customStats: [
    //     { isChoice: true, options: STATS_OPTIONS, metadata: 1 },
    //     { isChoice: true, options: STATS_OPTIONS, metadata: 1 },
    //   ],
    //   features: [{ label: 'DragonBreath', description: 'Breathe Fire' }],
    // },
  },
  [RACES.DWARF]: {
    label: 'Dwarf',
    createConfig: {
      base: [
        {
          type: RACE_CONFIG_TYPE.STATIC,
          format: RACE_CONFIG_FORMAT.STATS,
          path: 'stats',
          value: {
            [STATS.CON]: 2,
          },
        },
        {
          type: RACE_CONFIG_TYPE.STATIC,
          format: RACE_CONFIG_FORMAT.BASIC,
          path: 'creatureType',
          value: CREATURE_TYPE.HUMANOID,
          config: {
            header: 'Creature Type',
          },
        },
        {
          type: RACE_CONFIG_TYPE.STATIC,
          format: RACE_CONFIG_FORMAT.BASIC,
          path: 'size',
          value: CREATURE_SIZE.MEDIUM,
          config: {
            header: 'Size',
          },
        },
        {
          type: RACE_CONFIG_TYPE.STATIC,
          format: RACE_CONFIG_FORMAT.SPEED,
          path: 'speed',
          value: [{ value: 25, type: 'Walking' }],
        },
        {
          type: RACE_CONFIG_TYPE.STATIC,
          format: RACE_CONFIG_FORMAT.PROFICIENCY,
          path: 'otherProficiencies',
          value: [
            { label: 'Battleaxe', category: 'Weapon' },
            { label: 'Handaxe', category: 'Weapon' },
            { label: 'Light Hammer', category: 'Weapon' },
            { label: 'Warhammer', category: 'Weapon' },
          ],
          config: {
            header: 'Weapon Proficiencies',
          },
        },
        {
          type: RACE_CONFIG_TYPE.CHOICE,
          format: RACE_CONFIG_FORMAT.DROPDOWN,
          path: MULTI_PATH,
          options: [
            { value: "Smith's Tools", label: "Smith's Tools" },
            { value: "Brewer's Tools", label: "Brewer's Tools" },
            { value: "Mason's Tools", label: "Mason's Tools" },
          ],
          config: {
            header: 'Tool Proficiency',
            getFinalValue: (val) => {
              return {
                otherProficiencies: [{ label: val, category: 'Tool' }],
                customChecks: [{ label: val }],
              };
            },
          },
        },
        {
          type: RACE_CONFIG_TYPE.STATIC,
          format: RACE_CONFIG_FORMAT.PROFICIENCY,
          path: 'otherProficiencies',
          value: [
            { label: 'Common', category: 'Language' },
            { label: 'Dwarvish', category: 'Language' },
          ],
          config: {
            header: 'Languages',
            subHeader: 'Language Proficiencies:',
            description:
              'You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.',
          },
        },
        {
          type: RACE_CONFIG_TYPE.STATIC,
          format: RACE_CONFIG_FORMAT.FEATURE,
          path: 'features',
          value: {
            label: 'Dwarven Speed',
            description: 'Your speed is not reduced by wearing heavy armor.',
          },
        },
        {
          type: RACE_CONFIG_TYPE.STATIC,
          format: RACE_CONFIG_FORMAT.FEATURE,
          path: 'features',
          value: {
            label: 'Stonecutting',
            description:
              'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.',
          },
          config: {
            header: 'Speed',
          },
        },
        {
          type: RACE_CONFIG_TYPE.STATIC,
          format: RACE_CONFIG_FORMAT.FEATURE,
          path: 'features',
          value: {
            label: 'Dwarven Resilience',
            description:
              'You have advantage on saving throws against poison, and you have resistance against poison damage',
          },
          config: {
            header: 'Speed',
          },
        },
        {
          type: RACE_CONFIG_TYPE.STATIC,
          format: RACE_CONFIG_FORMAT.FEATURE,
          path: 'features',
          value: {
            label: 'Darkvision',
            description:
              'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.',
          },
        },
      ],
      subRaceOptions: [
        {
          value: 'Hill Dwarf',
          label: 'Hill Dwarf',
        },
        {
          value: 'Mountain Dwarf',
          label: 'Mountain Dwarf',
        },
      ],
      subRace: {
        'Hill Dwarf': [
          {
            type: RACE_CONFIG_TYPE.STATIC,
            format: RACE_CONFIG_FORMAT.STATS,
            path: 'stats',
            value: {
              [STATS.WIS]: 1,
            },
          },
          {
            type: RACE_CONFIG_TYPE.STATIC,
            format: RACE_CONFIG_FORMAT.BASIC,
            path: '',
            value: [
              {
                value: 1,
                source: 'Dwarven Toughness',
                isStatic: false,
              } as ModBlock,
            ],
            config: {
              header: 'Feature: Dwarven Toughness',
              getFinalValue: (value) => {
                return {
                  'customBonuses.hp': value,
                  features: [
                    {
                      label: value[0].source,
                      description:
                        'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.',
                    },
                  ],
                };
              },
              renderValue: () =>
                'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.',
            },
          },
        ],
        'Mountain Dwarf': [
          {
            type: RACE_CONFIG_TYPE.STATIC,
            format: RACE_CONFIG_FORMAT.STATS,
            path: 'stats',
            value: {
              [STATS.STR]: 2,
            },
          },
          {
            type: RACE_CONFIG_TYPE.STATIC,
            format: RACE_CONFIG_FORMAT.PROFICIENCY,
            path: 'otherProficiencies',
            value: [
              { label: 'Light Armor', type: 'Armor' },
              { label: 'Medium Armor', type: 'Armor' },
            ],
            config: {
              header: 'Armor Proficiencies',
            },
          },
        ],
      },
    },
  },
  [RACES.GNOME]: {
    label: 'Gnome',
    createConfig: { base: [] },
  },
  [RACES.HALF_ELF]: {
    label: 'Half Elf',
    createConfig: { base: [] },
  },
  [RACES.HALFLING]: {
    label: 'Halfling',
    createConfig: { base: [] },
  },
  [RACES.HALF_ORC]: {
    label: 'Half Orc',
    createConfig: { base: [] },
  },
  [RACES.HUMAN]: {
    label: 'Human',
    createConfig: { base: [] },
  },
  [RACES.TIEFLING]: {
    label: 'Tiefling',
    createConfig: { base: [] },
  },
  [RACES.TASHA_CUSTOM]: {
    label: "Tasha's Custom Lineage",
    createConfig: { base: [] },
  },
  [RACES.CUSTOM]: {
    label: 'Custom',
    createConfig: { base: [] },
  },
};

export const RACE_OPTIONS = Object.values(RACES).map((r) => ({
  value: r,
  label: RACE_CONFIGS[r].label || r,
}));
