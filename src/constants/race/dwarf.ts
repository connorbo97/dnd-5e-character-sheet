import { ModBlock } from 'constants/general';
import { MULTI_PATH } from 'constants/raceTypes';
import {
  SECTION_CONFIG_FORMAT,
  SECTION_CONFIG_TYPE,
} from 'constants/characterCreatorSections';
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
  getChoiceToolProficiencies,
} from './commonCreatorConfigs';
import { ARTISAN_TOOLS, TOOL_OPTIONS } from 'constants/tools';
import { WEAPONS, WEAPON_CONFIGS } from 'constants/weapons';

export const DWARF_CREATE_CONFIG = {
  base: [
    getStatsFeature({
      [STATS.CON]: 2,
    }),
    HUMANOID_TYPE_FEATURE,
    MEDIUM_SIZE_FEATURE,
    getMovementFeature(25),
    getProficiencies(
      'Weapon',
      [
        WEAPONS.BATTLEAXE,
        WEAPONS.HANDAXE,
        WEAPONS.LIGHT_HAMMER,
        WEAPONS.WARHAMMER,
      ].map((k) => WEAPON_CONFIGS[k].label),
    ),
    getChoiceToolProficiencies(
      TOOL_OPTIONS.filter(({ value }) =>
        [
          ARTISAN_TOOLS.MASON,
          ARTISAN_TOOLS.BREWER,
          ARTISAN_TOOLS.SMITH,
        ].includes(value),
      ),
      1,
    ),
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
        type: SECTION_CONFIG_TYPE.STATIC,
        format: SECTION_CONFIG_FORMAT.STATS,
        path: 'stats',
        value: {
          [STATS.WIS]: 1,
        },
      },
      {
        type: SECTION_CONFIG_TYPE.STATIC,
        format: SECTION_CONFIG_FORMAT.BASIC,
        path: MULTI_PATH,
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
        type: SECTION_CONFIG_TYPE.STATIC,
        format: SECTION_CONFIG_FORMAT.STATS,
        path: 'stats',
        value: {
          [STATS.STR]: 2,
        },
      },
      {
        type: SECTION_CONFIG_TYPE.STATIC,
        format: SECTION_CONFIG_FORMAT.PROFICIENCY,
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
