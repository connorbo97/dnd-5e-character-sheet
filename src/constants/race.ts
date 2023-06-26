import { ModBlock } from './general';
import { DRAGON_BORN_CREATE_CONFIG } from './race/dragonborn';
import {
  CREATURE_SIZE,
  CREATURE_TYPE,
  MULTI_PATH,
  RACES,
  RACE_CONFIG_FORMAT,
  RACE_CONFIG_TYPE,
  RaceConfigs,
  WALKING_TYPE,
} from './raceTypes';
import { STATS } from './stats';

export const RACE_CONFIGS: RaceConfigs = {
  [RACES.DRAGONBORN]: {
    label: 'Dragonborn',
    createConfig: DRAGON_BORN_CREATE_CONFIG,
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
          value: [{ value: 25, type: WALKING_TYPE }],
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
