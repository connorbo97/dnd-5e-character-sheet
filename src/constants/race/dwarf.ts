import { ModBlock } from 'constants/general';
import {
  MULTI_PATH,
  RACE_CONFIG_FORMAT,
  RACE_CONFIG_TYPE,
} from 'constants/raceTypes';
import { STATS } from 'constants/stats';
import {
  HUMANOID_TYPE_FEATURE,
  MEDIUM_SIZE_FEATURE,
  getBasicFeature,
  getDarkvision,
  getLanguageFeature,
  getProficiencies,
  getStatsFeature,
  getMovementFeature,
} from './commonRace';

export const DWARF_CREATE_CONFIG = {
  base: [
    getStatsFeature({
      [STATS.CON]: 2,
    }),
    HUMANOID_TYPE_FEATURE,
    MEDIUM_SIZE_FEATURE,
    getMovementFeature(25),
    getProficiencies('Weapon', [
      'Battleaxe',
      'Handaxe',
      'Light Hammer',
      'Warhammer',
    ]),
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
    getLanguageFeature(
      ['Dwarvish'],
      'You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.',
    ),
    getBasicFeature({
      label: 'Dwarven Speed',
      description: 'Your speed is not reduced by wearing heavy armor.',
    }),
    getBasicFeature({
      label: 'Stonecutting',
      description:
        'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.',
    }),
    getBasicFeature({
      label: 'Dwarven Resilience',
      description:
        'You have advantage on saving throws against poison, and you have resistance against poison damage',
    }),
    getDarkvision(),
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
};
