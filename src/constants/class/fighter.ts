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
import { entries, filter } from 'lodash';
import { getSavingThrowClassProficiency } from './commonClassConfigs';
import {
  FIGHTING_STYLES,
  FIGHTING_STYLE_OPTIONS,
} from 'constants/fightingStyles';
import { MULTI_PATH } from 'constants/raceTypes';
import { generateDamageOnlyAttack } from 'constants/attacks';
import { DICE } from 'constants/dice';
import { CharacterSheetPath } from 'constants/characterSheetPaths';
import { pickOptionsBySet } from 'utils/optionUtils';
import {
  convertEquipmentConfigEntryToOption,
  getEquipmentChoice,
  getInventoryItemFromEquipmentConfig,
} from './commonEquipmentConfigs';
import { SIMPLE_WEAPON_EQUIPMENT_CONFIGS, WEAPONS } from 'constants/weapons';
import { ARMORS } from 'constants/armor';
import { EQUIPMENT_CONFIGS } from 'constants/equipment';
import { ADVENTURING_GEAR } from 'constants/adventuringGear';

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
const FIGHTER_FIGHTING_STYLES = new Set([
  FIGHTING_STYLES.ARCHERY,
  FIGHTING_STYLES.BLIND_FIGHTING,
  FIGHTING_STYLES.DEFENSE,
  FIGHTING_STYLES.DUELING,
  FIGHTING_STYLES.GREAT_WEAPON_FIGHTING,
  FIGHTING_STYLES.INTERCEPTION,
  FIGHTING_STYLES.PROTECTION,
  FIGHTING_STYLES.SUPERIOR_TECHNIQUE,
  FIGHTING_STYLES.THROWN_WEAPON_FIGHTING,
  FIGHTING_STYLES.TWO_WEAPON_FIGHTING,
  FIGHTING_STYLES.UNARMED_FIGHTING,
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
  getFightingStyleChoice(
    pickOptionsBySet(FIGHTING_STYLE_OPTIONS, FIGHTER_FIGHTING_STYLES),
  ),
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

export const FIGHTER_EQUIPMENT = [
  getEquipmentChoice([
    {
      label: 'Chain Mail or Leather Armor, Longbow, and Arrows (20)',
      options: [
        convertEquipmentConfigEntryToOption([
          ARMORS.CHAIN_MAIL,
          EQUIPMENT_CONFIGS[ARMORS.CHAIN_MAIL],
        ]),
        {
          ...convertEquipmentConfigEntryToOption([
            ARMORS.LEATHER,
            EQUIPMENT_CONFIGS[ARMORS.LEATHER],
          ]),
          item: [
            getInventoryItemFromEquipmentConfig(
              EQUIPMENT_CONFIGS[ARMORS.LEATHER],
            ),
            getInventoryItemFromEquipmentConfig(
              EQUIPMENT_CONFIGS[WEAPONS.LONGBOW],
            ),
            getInventoryItemFromEquipmentConfig(
              EQUIPMENT_CONFIGS[ADVENTURING_GEAR.ARROW],
              20,
            ),
          ],
          label: 'Leather Armor, Longbow, and Arrows (20)',
        },
      ],
    },
  ]),
  getEquipmentChoice([
    {
      label: 'Shield or Any Simple Weapon',
      options: [
        convertEquipmentConfigEntryToOption([
          ARMORS.SHIELD,
          EQUIPMENT_CONFIGS[ARMORS.SHIELD],
        ]),
        ...entries(SIMPLE_WEAPON_EQUIPMENT_CONFIGS).map((entry) =>
          convertEquipmentConfigEntryToOption(entry),
        ),
      ],
    },
    {
      label: 'Shield or Any Simple Weapon',
      options: [
        convertEquipmentConfigEntryToOption([
          ARMORS.SHIELD,
          EQUIPMENT_CONFIGS[ARMORS.SHIELD],
        ]),
        ...entries(SIMPLE_WEAPON_EQUIPMENT_CONFIGS).map((entry) =>
          convertEquipmentConfigEntryToOption(entry),
        ),
      ],
    },
  ]),
  getEquipmentChoice([
    {
      label: 'Light Crossbow and Crossbow Bolts (20) or Handaxe (2)',
      options: [
        {
          ...convertEquipmentConfigEntryToOption([
            WEAPONS.CROSSBOW_LIGHT,
            EQUIPMENT_CONFIGS[WEAPONS.CROSSBOW_LIGHT],
          ]),
          label: 'Light Crossbow and Crossbow Bolts (20)',
          item: [
            getInventoryItemFromEquipmentConfig(
              EQUIPMENT_CONFIGS[WEAPONS.CROSSBOW_LIGHT],
            ),
            getInventoryItemFromEquipmentConfig(
              EQUIPMENT_CONFIGS[ADVENTURING_GEAR.CROSSBOW_BOLT],
              20,
            ),
          ],
        },
        convertEquipmentConfigEntryToOption(
          [WEAPONS.HANDAXE, EQUIPMENT_CONFIGS[WEAPONS.HANDAXE]],
          2,
        ),
      ],
    },
  ]),
];

export const FIGHTER_CONFIG = {
  equipment: FIGHTER_EQUIPMENT,
  levelOneConfig: FIGHTER_LEVEL_ONE_CONFIG,
};
