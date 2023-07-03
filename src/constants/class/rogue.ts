import {
  LIGHT_ARMOR_PROFICIENCY,
  OTHER_PROFICIENCY_CATEGORY,
  SIMPLE_WEAPON_PROFICIENCY,
  TOOL_PROFICIENCIES,
  WEAPON_PROFICIENCIES,
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
import { DICE } from 'constants/dice';
import { WEAPONS } from 'constants/weapons';
import { SKILL_TOOLS } from 'constants/tools';
import {
  convertEquipmentTypeToOption,
  getEquipmentChoice,
  getInventoryItemFromEquipmentType,
  getStaticEquipment,
} from './commonEquipmentConfigs';
import { ARMORS } from 'constants/armor';
import { ADVENTURING_GEAR } from 'constants/adventuringGear';

const ROGUE_SKILLS = new Set([
  SKILLS.ACROBATICS,
  SKILLS.ATHLETICS,
  SKILLS.DECEPTION,
  SKILLS.INSIGHT,
  SKILLS.INTIMIDATION,
  SKILLS.INVESTIGATION,
  SKILLS.PERCEPTION,
  SKILLS.PERFORMANCE,
  SKILLS.PERSUASION,
  SKILLS.SLEIGHT_OF_HAND,
  SKILLS.STEALTH,
]);

export const ROGUE_LEVEL_ONE_CONFIG = [
  getPresentationConfig('Proficiencies'),
  getOtherProficiencyForClass('Armor', {
    ...LIGHT_ARMOR_PROFICIENCY,
  }),
  getOtherProficiencyForClass('Weapon', {
    ...SIMPLE_WEAPON_PROFICIENCY,
    ...WEAPON_PROFICIENCIES[WEAPONS.CROSSBOW_HAND],
    ...WEAPON_PROFICIENCIES[WEAPONS.LONGSWORD],
    ...WEAPON_PROFICIENCIES[WEAPONS.RAPIER],
    ...WEAPON_PROFICIENCIES[WEAPONS.SHORTSWORD],
  }),
  getOtherProficiencyForClass(OTHER_PROFICIENCY_CATEGORY.TOOL, {
    ...TOOL_PROFICIENCIES[SKILL_TOOLS.THIEVES],
  }),
  getSavingThrowClassProficiency([STATS.DEX, STATS.INT]),
  getChoiceSkillProficiencies(pickOptionsBySet(SKILL_OPTIONS, ROGUE_SKILLS), 4),
  // TODO: Implement Expertise calculation
  getBasicFeatureByLD(
    'Expertise',
    "At 1st level, choose two of your skill proficiencies, or one of your skill proficiencies and your proficiency with thieves' tools. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.\n\nAt 6th level, you can choose two more of your proficiencies (in skills or with thieves' tools) to gain this benefit.",
  ),
  {
    ...getBasicFeatureByLD(
      'Sneak Attack',
      "Beginning at 1st level, you know how to strike subtly and exploit a foe's distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll. The attack must use a finesse or a ranged weapon.\n\nYou don't need advantage on the attack roll if another enemy of the target is within 5 feet of it, that enemy isn't incapacitated, and you don't have disadvantage on the attack roll.\n\nThe amount of the extra damage increases as you gain levels in this class, as shown in the Sneak Attack column of the Rogue table.",
    ),
    path: MULTI_PATH,
    config: {
      getFinalValue: (value) => ({
        [CharacterSheetPath.features]: [value],
        [CharacterSheetPath.globalAttackModifier]: [
          {
            label: 'Sneak Attack',
            base: [[1, DICE.d6]],
            source: 'Rogue',
          },
        ],
      }),
    },
  },
  getBasicFeatureByLD(
    "Thieves' Cant",
    "During your rogue training you learned thieves' cant, a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation. Only another creature that knows thieves' cant understands such messages. It takes four times longer to convey such a message than it does to speak the same idea plainly.\n\nIn addition, you understand a set of secret signs and symbols used to convey short, simple messages, such as whether an area is dangerous or the territory of a thieves' guild, whether loot is nearby, or whether the people in an area are easy marks or will provide a safe house for thieves on the run.",
  ),
];

export const ROGUE_EQUIPMENT = [
  getStaticEquipment([
    getInventoryItemFromEquipmentType(ARMORS.LEATHER),
    getInventoryItemFromEquipmentType(WEAPONS.DAGGER, 2),
    getInventoryItemFromEquipmentType(SKILL_TOOLS.THIEVES),
  ]),
  getEquipmentChoice([
    {
      options: [
        convertEquipmentTypeToOption(WEAPONS.RAPIER),
        convertEquipmentTypeToOption(WEAPONS.SHORTSWORD),
      ],
    },
  ]),
  getEquipmentChoice([
    {
      options: [
        {
          ...convertEquipmentTypeToOption(
            WEAPONS.SHORTBOW,
            1,
            'Shortbow, Quiver, Arrows (20)',
          ),
          item: [
            getInventoryItemFromEquipmentType(WEAPONS.SHORTBOW),
            getInventoryItemFromEquipmentType(ADVENTURING_GEAR.QUIVER),
            getInventoryItemFromEquipmentType(ADVENTURING_GEAR.ARROW, 20),
          ],
        },
        convertEquipmentTypeToOption(WEAPONS.SHORTSWORD),
      ],
    },
  ]),
];

export const ROGUE_CONFIG = {
  levelOneConfig: ROGUE_LEVEL_ONE_CONFIG,
  equipment: ROGUE_EQUIPMENT,
};
