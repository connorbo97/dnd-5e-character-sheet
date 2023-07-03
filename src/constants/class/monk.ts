import {
  OTHER_PROFICIENCY_CATEGORY,
  SIMPLE_WEAPON_PROFICIENCY,
  WEAPON_PROFICIENCIES,
} from 'constants/otherProficiencies';
import {
  getBasicFeatureByLD,
  getChoiceSkillProficiencies,
  getChoiceToolProficiencies,
  getOtherProficiencyForClass,
  getPresentationConfig,
} from 'constants/race/commonCreatorConfigs';
import { SKILLS, SKILL_OPTIONS } from 'constants/skills';
import { STATS } from 'constants/stats';
import { filter } from 'lodash';
import { getSavingThrowClassProficiency } from './commonClassConfigs';
import { MULTI_PATH } from 'constants/raceTypes';
import {
  AttackEntry,
  UNUSED_DAMAGE,
  UNUSED_SAVING_THROW,
} from 'constants/attacks';
import { DICE } from 'constants/dice';
import { CharacterSheetPath } from 'constants/characterSheetPaths';
import { WEAPONS } from 'constants/weapons';
import {
  ARTISAN_TOOL_OPTIONS,
  MUSICAL_INSTRUMENT_OPTIONS,
} from 'constants/tools';
import {
  SECTION_CONFIG_FORMAT,
  SECTION_CONFIG_TYPE,
} from 'constants/characterCreatorSections';
import { GlobalACModifierType } from 'constants/characterSheet';

const MONK_SKILLS = new Set([
  SKILLS.ACROBATICS,
  SKILLS.ANIMAL_HANDLING,
  SKILLS.ATHLETICS,
  SKILLS.HISTORY,
  SKILLS.INSIGHT,
  SKILLS.INTIMIDATION,
  SKILLS.PERCEPTION,
  SKILLS.SURVIVAL,
]);
export const MONK_LEVEL_ONE_CONFIG = [
  getPresentationConfig('Proficiencies'),
  getOtherProficiencyForClass(OTHER_PROFICIENCY_CATEGORY.WEAPON, {
    ...SIMPLE_WEAPON_PROFICIENCY,
    ...WEAPON_PROFICIENCIES[WEAPONS.SHORTSWORD],
  }),
  getSavingThrowClassProficiency([STATS.STR, STATS.DEX]),
  getChoiceToolProficiencies(
    [...ARTISAN_TOOL_OPTIONS, ...MUSICAL_INSTRUMENT_OPTIONS],
    1,
    { header: 'Artisan Tool or Musical Instrument Proficiency' },
  ),
  getChoiceSkillProficiencies(
    filter(SKILL_OPTIONS, (s) => MONK_SKILLS.has(s.value)),
    2,
  ),
  {
    type: SECTION_CONFIG_TYPE.STATIC,
    format: SECTION_CONFIG_FORMAT.FEATURE,
    value: {
      label: 'Unarmored Defense',
      description:
        'Beginning at 1st level, while you are wearing no armor and not wielding a shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier.',
    },
    path: MULTI_PATH,
    config: {
      getFinalValue: (value) => ({
        [CharacterSheetPath.features]: [value],
        [CharacterSheetPath.globalACModifier]: {
          base: [10, STATS.DEX, STATS.WIS],
          isNotCompatibleWithArmor: true,
          label: 'Unarmored Defense',
          source: 'Barbarian',
          newACFormula: true,
        } as GlobalACModifierType,
      }),
    },
  },
  {
    ...getBasicFeatureByLD(
      'Martial Arts',
      "At 1st level, your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons, which are shortswords and any simple melee weapons that don't have the two-handed or heavy property.\n\nYou gain the following benefits while you are unarmed or wielding only monk weapons and you aren't wearing armor or wielding a shield:\n- You can use Dexterity instead of Strength for the attack and damage rolls of your unarmed strikes and monk weapons.\n- You can roll a d4 in place of the normal damage of your unarmed strike or monk weapon. This die changes as you gain monk levels, as shown in the Martial Arts column of the Monk table.\n- When you use the Attack action with an unarmed strike or a monk weapon on your turn, you can make one unarmed strike as a bonus action. For example, if you take the Attack action and attack with a quarterstaff, you can also make an unarmed strike as a bonus action, assuming you haven't already taken a bonus action this turn.\n\nCertain monasteries use specialized forms of the monk weapons. For example, you might use a club that is two lengths of wood connected by a short chain (called a nunchaku) or a sickle with a shorter, straighter blade (called a kama). Whatever name you use for a monk weapon, you can use the game statistics provided for the weapon on the Weapons page.",
    ),
    path: MULTI_PATH,
    config: {
      getFinalValue: (value) => ({
        [CharacterSheetPath.features]: [value],
        [CharacterSheetPath.attacks]: [
          {
            label: 'Unarmed Strike',
            source: 'Monk',
            attack: {
              isEnabled: true,
              stat: STATS.DEX,
              proficient: true,
              critRange: 20,
            },
            damage: [
              {
                base: [[1, DICE.d4]],
                stat: STATS.DEX,
                isEnabled: true,
              },
              UNUSED_DAMAGE,
            ],
            savingThrow: UNUSED_SAVING_THROW,
          } as AttackEntry,
        ],
      }),
    },
  },
];
export const LEVEL_UP_CONFIG = {
  2: (a) => a,
};
