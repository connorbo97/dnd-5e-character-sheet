import {
  LIGHT_ARMOR_PROFICIENCY,
  MARTIAL_WEAPON_PROFICIENCY,
  MEDIUM_ARMOR_PROFICIENCY,
  SHIELD_PROFICIENCY,
  SIMPLE_WEAPON_PROFICIENCY,
} from 'constants/otherProficiencies';
import {
  getBasicFeatureByLD,
  getChoiceSkillProficiencies,
  getOtherProficiencyForClass,
  getPresentationConfig,
} from 'constants/race/commonCreatorConfigs';
import { SKILLS, SKILL_OPTIONS } from 'constants/skills';
import { STATS } from 'constants/stats';
import { MULTI_PATH } from 'constants/raceTypes';
import { CharacterSheetPath } from 'constants/characterSheetPaths';
import { getSavingThrowClassProficiency } from './commonClassConfigs';
import { pickOptionsBySet } from 'utils/optionUtils';
import { ResourceConfig } from 'constants/resources';
import { DICE } from 'constants/dice';
import { ROLLABLES } from 'constants/rollable';

const RANGER_SKILLS = new Set([
  SKILLS.ANIMAL_HANDLING,
  SKILLS.ATHLETICS,
  SKILLS.INSIGHT,
  SKILLS.INVESTIGATION,
  SKILLS.NATURE,
  SKILLS.PERCEPTION,
  SKILLS.STEALTH,
  SKILLS.SURVIVAL,
]);

export const RANGER_LEVEL_ONE_CONFIG = [
  getPresentationConfig('Proficiencies'),
  getOtherProficiencyForClass('Armor', {
    ...LIGHT_ARMOR_PROFICIENCY,
    ...MEDIUM_ARMOR_PROFICIENCY,
    ...SHIELD_PROFICIENCY,
  }),
  getOtherProficiencyForClass('Weapon', {
    ...SIMPLE_WEAPON_PROFICIENCY,
    ...MARTIAL_WEAPON_PROFICIENCY,
  }),
  getSavingThrowClassProficiency([STATS.STR, STATS.DEX]),
  getChoiceSkillProficiencies(
    pickOptionsBySet(SKILL_OPTIONS, RANGER_SKILLS),
    2,
  ),
  {
    ...getBasicFeatureByLD(
      'Favored Foe',
      "This 1st-level feature replaces the Favored Enemy feature and works with the Foe Slayer feature. You gain no benefit from the replaced feature and don't qualify for anything in the game that requires it.\n\nWhen you hit a creature with an attack roll, you can call on your mystical bond with nature to mark the target as your favored enemy for 1 minute or until you lose your concentration (as if you were concentrating on a spell).\n\nThe first time on each of your turns that you hit the favored enemy and deal damage to it, including when you mark it, you increase that damage by 1d4.\n\nYou can use this feature to mark a favored enemy a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.\n\nThis feature's extra damage increases when you reach certain levels in this class: to 1d6 at 6th level and to 1d8 at 14th level.",
    ),
    path: MULTI_PATH,
    config: {
      getFinalValue: (value) => ({
        [CharacterSheetPath.features]: [value],
        [CharacterSheetPath.resources]: [
          {
            label: 'Favored Foe',
            max: ROLLABLES.PB,
            source: 'Ranger',
            resetOnLongRest: true,
          } as ResourceConfig,
        ],
        [CharacterSheetPath.globalAttackModifier]: [
          {
            label: 'Favored Foe',
            base: [[1, DICE.d4]],
            source: 'Ranger',
          },
        ],
      }),
    },
  },
  getBasicFeatureByLD(
    'Deft Explorer',
    'You are an unsurpassed explorer and survivor, both in the wilderness and in dealing with others on your travels. You gain the Canny benefit below, and you gain an additional benefit when you reach 6th level and 10th level in this class.',
  ),
  // TODO: Canny, implement Expertise after parsing what skills you have
];
