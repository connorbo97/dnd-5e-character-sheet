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

const PALADIN_SKILLS = new Set([
  SKILLS.ATHLETICS,
  SKILLS.INSIGHT,
  SKILLS.INTIMIDATION,
  SKILLS.MEDICINE,
  SKILLS.PERSUASION,
  SKILLS.RELIGION,
]);

// const PALADIN_FIGHTING_STYLES = new Set([
//   FIGHTING_STYLES.BLESSED_WARRIOR,
//   FIGHTING_STYLES.BLIND_FIGHTING,
//   FIGHTING_STYLES.DEFENSE,
//   FIGHTING_STYLES.DUELING,
//   FIGHTING_STYLES.GREAT_WEAPON_FIGHTING,
//   FIGHTING_STYLES.INTERCEPTION,
//   FIGHTING_STYLES.PROTECTION,
// ]);
// getFightingStyleChoice(
//   pickOptionsBySet(FIGHTING_STYLE_OPTIONS, PALADIN_FIGHTING_STYLES),
// ),
export const PALADIN_LEVEL_ONE_CONFIG = [
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
  getSavingThrowClassProficiency([STATS.WIS, STATS.CHA]),
  getChoiceSkillProficiencies(
    pickOptionsBySet(SKILL_OPTIONS, PALADIN_SKILLS),
    2,
  ),
  {
    ...getBasicFeatureByLD(
      'Divine Sense',
      'The presence of strong evil registers on your senses like a noxious odor, and powerful good rings like heavenly music in your ears. As an action, you can open your awareness to detect such forces. Until the end of your next turn, you know the location of any celestial, fiend, or undead within 60 feet of you that is not behind total cover. You know the type (celestial, fiend, or undead) of any being whose presence you sense, but not its identity (the vampire Count Strahd von Zarovich, for instance). Within the same radius, you also detect the presence of any place or object that has been consecrated or desecrated, as with the Hallow spell.\n\nYou can use this feature a number of times equal to 1 + your Charisma modifier. When you finish a long rest, you regain all expended uses.',
    ),
    path: MULTI_PATH,
    config: {
      getFinalValue: (value) => ({
        [CharacterSheetPath.features]: [value],
        [CharacterSheetPath.resources]: [
          {
            label: 'Divine Sense',
            max: [1, STATS.CHA],
            source: 'Paladin',
            resetOnLongRest: true,
          } as ResourceConfig,
        ],
      }),
    },
  },
  {
    ...getBasicFeatureByLD(
      'Lay on Hands',
      'Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level x 5.\n\nAs an action, you can touch a creature and draw power from the pool to restore a number of hit points to that creature, up to the maximum amount remaining in your pool.\n\nAlternatively, you can expend 5 hit points from your pool of healing to cure the target of one disease or neutralize one poison affecting it. You can cure multiple diseases and neutralize multiple poisons with a single use of Lay on Hands, expending hit points separately for each one.\n\nThis feature has no effect on undead and constructs.',
    ),
    path: MULTI_PATH,
    config: {
      getFinalValue: (value) => ({
        [CharacterSheetPath.features]: [value],
        // TODO: USE LEVEL ON MAX
        [CharacterSheetPath.resources]: [
          {
            label: 'Lay on Hands',
            max: 5,
            source: 'Paladin',
            resetOnLongRest: true,
          } as ResourceConfig,
        ],
      }),
    },
  },
];
