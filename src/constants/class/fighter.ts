import {
  HEAVY_ARMOR_PROFICIENCY,
  LIGHT_ARMOR_PROFICIENCY,
  MARTIAL_WEAPON_PROFICIENCY,
  MEDIUM_ARMOR_PROFICIENCY,
  SHIELD_PROFICIENCY,
  SIMPLE_WEAPON_PROFICIENCY,
} from 'constants/otherProficiencies';
import {
  getBasicFeatureByLD,
  getChoiceSkillProficiencies,
  getFightingStyleChoice,
  getOtherProficiencyForClass,
  getPresentationConfig,
} from 'constants/race/commonCreatorConfigs';
import { SKILLS, SKILL_OPTIONS } from 'constants/skills';
import { STATS } from 'constants/stats';
import { filter } from 'lodash';
import { getSavingThrowClassProficiency } from './commonClassConfigs';
import { FIGHTING_STYLE_OPTIONS } from 'constants/fightingStyles';
import { MULTI_PATH } from 'constants/raceTypes';
import { generateDamageOnlyAttack } from 'constants/attacks';
import { DICE } from 'constants/dice';
import { CharacterSheetPath } from 'constants/characterSheetPaths';

const FIGHTER_SKILLS = new Set([
  SKILLS.ACROBATICS,
  SKILLS.ANIMAL_HANDLING,
  SKILLS.ATHLETICS,
  SKILLS.HISTORY,
  SKILLS.INSIGHT,
  SKILLS.INTIMIDATION,
  SKILLS.PERCEPTION,
  SKILLS.SURVIVAL,
]);
export const FIGHTER_LEVEL_ONE_CONFIG = [
  getPresentationConfig('Proficiencies'),
  getOtherProficiencyForClass('Armor', {
    ...LIGHT_ARMOR_PROFICIENCY,
    ...MEDIUM_ARMOR_PROFICIENCY,
    ...HEAVY_ARMOR_PROFICIENCY,
    ...SHIELD_PROFICIENCY,
  }),
  getOtherProficiencyForClass('Weapon', {
    ...SIMPLE_WEAPON_PROFICIENCY,
    ...MARTIAL_WEAPON_PROFICIENCY,
  }),
  getSavingThrowClassProficiency([STATS.STR, STATS.CON]),
  getChoiceSkillProficiencies(
    filter(SKILL_OPTIONS, (s) => FIGHTER_SKILLS.has(s.value)),
    2,
  ),
  getFightingStyleChoice(FIGHTING_STYLE_OPTIONS),
  {
    ...getBasicFeatureByLD(
      'Second Wind',
      'You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level.\n\nOnce you use this feature, you must finish a short or long rest before you can use it again.',
    ),
    path: MULTI_PATH,
    config: {
      getFinalValue: (value) => ({
        [CharacterSheetPath.features]: [value],
        [CharacterSheetPath.resources]: [
          {
            label: 'Second Wind',
            max: 1,
            source: 'Fighter',
            resetOnLongRest: true,
            resetOnShortRest: true,
          },
        ],
        // TODO: ADD LEVEL AS PART OF CALCULATION
        [CharacterSheetPath.attacks]: [
          generateDamageOnlyAttack('Second Wind', 'Fighter', {
            base: [[1, DICE.d10]],
            stat: null,
            isEnabled: true,
          }),
        ],
      }),
    },
  },
];
export const LEVEL_UP_CONFIG = {
  2: (a) => a,
};
