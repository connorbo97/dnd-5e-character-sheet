import {
  CreateConfigEntry,
  SECTION_CONFIG_FORMAT,
  SECTION_CONFIG_TYPE,
} from 'constants/characterCreatorSections';
import { GlobalACModifierType } from 'constants/characterSheet';
import { CharacterSheetPath } from 'constants/characterSheetPaths';
import {
  HEAVY_ARMOR_PROFICIENCY,
  LIGHT_ARMOR_PROFICIENCY,
  MARTIAL_WEAPON_PROFICIENCY,
  MEDIUM_ARMOR_PROFICIENCY,
  SHIELD_PROFICIENCY,
  SIMPLE_WEAPON_PROFICIENCY,
} from 'constants/otherProficiencies';
import {
  getChoiceSkillProficiencies,
  getFeatureWithResource,
  getOtherProficiencyForClass,
  getPresentationConfig,
} from 'constants/race/commonCreatorConfigs';
import { MULTI_PATH } from 'constants/raceTypes';
import { SKILLS, SKILL_OPTIONS } from 'constants/skills';
import { STATS } from 'constants/stats';
import { entries, filter } from 'lodash';
import {
  convertEquipmentConfigEntryToOption,
  getEquipmentChoice,
  getInventoryItemFromEquipmentConfig,
  getStaticEquipment,
} from './commonEquipmentConfigs';
import { EQUIPMENT_CONFIGS } from 'constants/equipment';
import {
  MARTIAL_WEAPON_EQUIPMENT_CONFIGS,
  SIMPLE_WEAPON_EQUIPMENT_CONFIGS,
  WEAPONS,
} from 'constants/weapons';

const BARBARIAN_SKILLS = new Set([
  SKILLS.ANIMAL_HANDLING,
  SKILLS.ATHLETICS,
  SKILLS.INTIMIDATION,
  SKILLS.NATURE,
  SKILLS.PERCEPTION,
  SKILLS.SURVIVAL,
]);
export const BARBARIAN_LEVEL_ONE_CONFIG: Array<CreateConfigEntry> = [
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
    },
    path: MULTI_PATH,
    config: {
      getFinalValue: (value) => ({
        [CharacterSheetPath.features]: [value],
        [CharacterSheetPath.globalACModifier]: [
          {
            base: [10, STATS.DEX, STATS.CON],
            isNotCompatibleWithArmor: true,
            label: 'Unarmored Defense',
            newACFormula: true,
          } as GlobalACModifierType,
        ],
      }),
    },
  },
];

export const BARBARIAN_EQUIPMENT = [
  getStaticEquipment(
    [
      getInventoryItemFromEquipmentConfig(
        EQUIPMENT_CONFIGS[WEAPONS.JAVELIN],
        4,
      ),
    ],
    {
      attacks: [EQUIPMENT_CONFIGS[WEAPONS.JAVELIN].attack],
    },
  ),
  getEquipmentChoice([
    {
      label: 'Any Martial Weapon',
      options: entries(MARTIAL_WEAPON_EQUIPMENT_CONFIGS).map((entry) =>
        convertEquipmentConfigEntryToOption(entry),
      ),
    },
  ]),
  getEquipmentChoice([
    {
      label: 'Handaxe (2) or Any Simple Weapon',
      options: entries(SIMPLE_WEAPON_EQUIPMENT_CONFIGS).map((entry) =>
        convertEquipmentConfigEntryToOption(
          entry,
          entry[0] === WEAPONS.HANDAXE ? 2 : 1,
        ),
      ),
    },
  ]),
];

export const BARBARIAN_CONFIG = {
  levelOneConfig: BARBARIAN_LEVEL_ONE_CONFIG,
  equipment: BARBARIAN_EQUIPMENT,
};
