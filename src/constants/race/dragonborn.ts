import { AttackEntry } from 'constants/attacks';
import {
  CREATURE_SIZE,
  CREATURE_TYPE,
  MULTI_PATH,
  RACE_CONFIG_FORMAT,
  RACE_CONFIG_TYPE,
  WALKING_TYPE,
} from 'constants/raceTypes';
import { STATS, STATS_CONFIGS } from 'constants/stats';
import { ResourceConfig } from 'constants/resources';
import { DICE } from 'constants/dice';

const generateSubRaceConfig = (subRace, damageType, range, dcSave) => {
  return [
    {
      type: RACE_CONFIG_TYPE.STATIC,
      format: RACE_CONFIG_FORMAT.FEATURE,
      path: 'features',
      value: {
        label: 'Damage Resistance',
        description: `You have resistance to ${damageType} damage.`,
      },
    },
    {
      type: RACE_CONFIG_TYPE.STATIC,
      format: RACE_CONFIG_FORMAT.FEATURE,
      path: MULTI_PATH,
      value: {
        label: 'Breath Weapon',
        description: `You can use your action to exhale destructive energy. Your ${subRace} draconic ancestry means this exhalation is a ${range} dealing ${damageType} damage.\n\nWhen you use your breath weapon, each creature in the area of the exhalation must make a ${STATS_CONFIGS[dcSave].label} saving throw. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.\n\nAfter you use your breath weapon, you can't use it again until you complete a short or long rest.`,
      },
      config: {
        getFinalValue: (v) => ({
          features: v,
          attacks: [
            {
              label: 'Breath Weapon',
              source: 'Race',
              attack: {
                isEnabled: false,
              },
              damage: [
                { isEnabled: true, base: [[2, DICE.d6]], type: damageType },
                {},
              ],
              savingThrow: {
                isEnabled: true,
                dc: STATS.CON,
                dcSave: dcSave,
                effect: `${range}, Half damage`,
              },
            } as AttackEntry,
          ],
          resources: [
            {
              max: 1,
              total: 1,
              resetOnLongRest: true,
              resetOnShortRest: true,
              label: 'Breath Weapon',
            } as ResourceConfig,
          ],
        }),
      },
    },
  ];
};
export const DRAGON_BORN_CREATE_CONFIG = {
  base: [
    {
      type: RACE_CONFIG_TYPE.STATIC,
      format: RACE_CONFIG_FORMAT.STATS,
      path: 'stats',
      value: {
        [STATS.CHA]: 1,
        [STATS.STR]: 2,
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
      value: [{ value: 30, type: WALKING_TYPE }],
      config: {
        header: 'Size',
      },
    },
    {
      type: RACE_CONFIG_TYPE.STATIC,
      format: RACE_CONFIG_FORMAT.BASIC,
      path: 'otherProficiencies',
      value: [
        { label: 'Common', category: 'Language' },
        { label: 'Draconic', category: 'Language' },
      ],
      config: {
        header: 'Languages',
        subHeader: 'Language Proficiencies',
        description:
          'You can speak, read, and write Common and Draconic. Draconic is thought to be one of the oldest languages and is often used in the study of magic. The language sounds harsh to most other creatures and includes numerous hard consonants and sibilants.',
      },
    },
  ],
  subRaceOptions: [
    { value: 'Black', label: 'Black' },
    { value: 'Blue', label: 'Blue' },
    { value: 'Brass', label: 'Brass' },
    { value: 'Bronze', label: 'Bronze' },
    { value: 'Copper', label: 'Copper' },
    { value: 'Gold', label: 'Gold' },
    { value: 'Green', label: 'Green' },
    { value: 'Red', label: 'Red' },
    { value: 'Silver', label: 'Silver' },
    { value: 'White', label: 'White' },
  ],
  subRace: {
    Black: generateSubRaceConfig('black', 'acid', '5 by 30 ft line', STATS.DEX),
    Blue: generateSubRaceConfig(
      'blue',
      'lightning',
      '5 by 30 ft line',
      STATS.DEX,
    ),
    Brass: generateSubRaceConfig('brass', 'fire', '5 by 30 ft line', STATS.DEX),
    Bronze: generateSubRaceConfig(
      'bronze',
      'lightning',
      '5 by 30 ft line',
      STATS.DEX,
    ),
    Copper: generateSubRaceConfig(
      'copper',
      'acid',
      '5 by 30 ft line',
      STATS.DEX,
    ),
    Gold: generateSubRaceConfig('gold', 'fire', '15 ft cone', STATS.DEX),
    Green: generateSubRaceConfig('green', 'poison', '15 ft cone', STATS.CON),
    Red: generateSubRaceConfig('red', 'fire', '15 ft cone', STATS.DEX),
    Silver: generateSubRaceConfig('silver', 'cold', '15 ft cone', STATS.CON),
    White: generateSubRaceConfig('white', 'cold', '15 ft cone', STATS.CON),
  },
};
