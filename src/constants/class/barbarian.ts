import {
  SECTION_CONFIG_FORMAT,
  SECTION_CONFIG_TYPE,
} from 'constants/characterCreatorSections';
import {
  HEAVY_ARMOR_PROFICIENCY,
  LIGHT_ARMOR_PROFICIENCY,
  MEDIUM_ARMOR_PROFICIENCY,
  SHIELD_PROFICIENCY,
} from 'constants/otherProficiencies';
import {
  getChoiceSkillProficiencies,
  getFeatureWithResource,
  getOtherProficiencyForClass,
  getPresentationConfig,
} from 'constants/race/commonCreatorConfigs';
import { SKILLS, SKILL_OPTIONS } from 'constants/skills';
import { STATS } from 'constants/stats';
import { filter } from 'lodash';

const BARBARIAN_SKILLS = new Set([
  SKILLS.ANIMAL_HANDLING,
  SKILLS.ATHLETICS,
  SKILLS.INTIMIDATION,
  SKILLS.NATURE,
  SKILLS.PERCEPTION,
  SKILLS.SURVIVAL,
]);
export const BARBARIAN_LEVEL_ONE_CONFIG = [
  getPresentationConfig('Proficiencies'),
  getOtherProficiencyForClass('Armor', {
    ...LIGHT_ARMOR_PROFICIENCY,
    ...MEDIUM_ARMOR_PROFICIENCY,
    ...HEAVY_ARMOR_PROFICIENCY,
    ...SHIELD_PROFICIENCY,
  }),
  getOtherProficiencyForClass('Weapon', {
    ...LIGHT_ARMOR_PROFICIENCY,
    ...MEDIUM_ARMOR_PROFICIENCY,
    ...HEAVY_ARMOR_PROFICIENCY,
    ...SHIELD_PROFICIENCY,
  }),
  {
    type: SECTION_CONFIG_TYPE.STATIC,
    format: SECTION_CONFIG_FORMAT.PROFICIENCY_CLASS,
    value: {
      [STATS.STR]: { proficient: true, label: 'Strength' },
      [STATS.CON]: { proficient: true, label: 'Constitution' },
    },
    path: 'savingThrows',
    config: {
      header: 'Saving Throws',
    },
  },
  getChoiceSkillProficiencies(
    filter(SKILL_OPTIONS, (s) => BARBARIAN_SKILLS.has(s.value)),
    2,
  ),
  getFeatureWithResource(
    'Rage',
    "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.\n\nWhile raging, you gain the following benefits if you aren't wearing heavy armor:\n- You have advantage on Strength checks and Strength saving throws.\n- When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table.\n- You have resistance to bludgeoning, piercing, and slashing damage.\n- If you are able to cast spells, you can't cast them or concentrate on them while raging.\n\nYour rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven't attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action.\n\nOnce you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.",
    {
      label: 'Rage',
      total: 2,
      max: 2,
      source: 'Barbarian',
      resetOnLongRest: true,
      resetOnShortRest: true,
    },
  ),
  {
    type: SECTION_CONFIG_TYPE.STATIC,
    format: SECTION_CONFIG_FORMAT.FEATURE,
    value: {
      label: 'Unarmored Defense',
      description:
        'While you are not wearing any armor, your armor class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.',
      // TODO: FIGURE OUT HOW I WANT TO HANDLE UNARMORED DEFENSE
    },
  },
];
export const LEVEL_UP_CONFIG = {
  2: (a) => a,
};

// export const BARBARIAN_LEVEL_ONE_CONFIG = {
//   static: {
//     proficiencies: {
//       armor: {
//         ...LIGHT_ARMOR_PROFICIENCY,
//         ...MEDIUM_ARMOR_PROFICIENCY,
//         ...HEAVY_ARMOR_PROFICIENCY,
//         ...SHIELD_PROFICIENCY,
//       },
//       weapon: {
//         ...SIMPLE_WEAPON_PROFICIENCY,
//         ...MARTIAL_WEAPON_PROFICIENCY,
//       },
//       savingThrow: {
//         [STATS.STR]: { proficient: true },
//         [STATS.CON]: { proficient: true },
//       },
//     },
//     features: [
//       getFeatureWithResource(
//         'Rage',
//         "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.\n\nWhile raging, you gain the following benefits if you aren't wearing heavy armor:\n\nYou have advantage on Strength checks and Strength saving throws.\nWhen you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table.\nYou have resistance to bludgeoning, piercing, and slashing damage.\nIf you are able to cast spells, you can't cast them or concentrate on them while raging.\n\nYour rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven't attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action.\n\nOnce you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.",
//         {
//           label: 'Rage',
//           total: 2,
//           max: 2,
//           source: 'Barbarian',
//           resetOnLongRest: true,
//           resetOnShortRest: true,
//         },
//       ),
//       {
//         type: SECTION_CONFIG_TYPE.STATIC,
//         format: SECTION_CONFIG_FORMAT.FEATURE,
//         value: {
//           label: 'Unarmored Defense',
//           description:
//             'While you are not wearing any armor, your armor class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.',
//           // TODO: FIGURE OUT HOW I WANT TO HANDLE UNARMORED DEFENSE
//         },
//       },
//     ],
//   },
//   custom: [
//     getChoiceSkillProficiencies(
//       filter(SKILL_OPTIONS, (s) => BARBARIAN_SKILLS.has(s.value)),
//       2,
//     ),
//   ],
// };
