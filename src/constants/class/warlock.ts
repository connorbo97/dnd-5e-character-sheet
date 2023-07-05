import {
  CreateConfigEntry,
  SECTION_CONFIG_FORMAT,
  SECTION_CONFIG_TYPE,
} from 'constants/characterCreatorSections';
import {
  LIGHT_ARMOR_PROFICIENCY,
  OTHER_PROFICIENCY_CATEGORY,
  SIMPLE_WEAPON_PROFICIENCY,
} from 'constants/otherProficiencies';
import {
  getBasicDropdownChoice,
  getBasicFeatureByLD,
  getChoiceSkillProficiencies,
  getOtherProficiencyForClass,
  getPresentationConfig,
} from 'constants/race/commonCreatorConfigs';
import { MULTI_PATH } from 'constants/raceTypes';
import { SKILLS, SKILL_OPTIONS } from 'constants/skills';
import { STATS } from 'constants/stats';
import { getSavingThrowClassProficiency } from './commonClassConfigs';
import { entries, filter, values } from 'lodash';
import {
  convertEquipmentConfigEntryToOption,
  convertEquipmentTypeToOption,
  getEquipmentChoice,
  getInventoryItemFromEquipmentType,
  getStaticEquipment,
} from './commonEquipmentConfigs';
import { SIMPLE_WEAPON_EQUIPMENT_CONFIGS, WEAPONS } from 'constants/weapons';
import { ARMORS } from 'constants/armor';
import { ADVENTURING_GEAR, ARCANE_FOCUS_GEAR } from 'constants/adventuringGear';
import { pickEquipmentConfigsByList } from 'constants/equipment';

const WARLOCK_SKILLS = new Set([
  SKILLS.ARCANA,
  SKILLS.DECEPTION,
  SKILLS.HISTORY,
  SKILLS.INTIMIDATION,
  SKILLS.INVESTIGATION,
  SKILLS.NATURE,
  SKILLS.RELIGION,
]);
const WARLOCK_SUBCLASSES = {
  ARCHFEY: 'Archfey',
  CELESTIAL: 'Celestial',
  FATHOMLESS: 'Fathomless',
  FIEND: 'Fiend',
  GENIE: 'Genie',
  GREAT_OLD_ONE: 'Great Old One',
  HEXBLADE: 'Hexblade',
  UNDEAD: 'Undead',
  UNDYING: 'Undying',
};
export const WARLOCK_LEVEL_ONE_CONFIG: Array<CreateConfigEntry> = [
  getPresentationConfig('Proficiencies'),
  getOtherProficiencyForClass(OTHER_PROFICIENCY_CATEGORY.ARMOR, {
    ...LIGHT_ARMOR_PROFICIENCY,
  }),
  getOtherProficiencyForClass(OTHER_PROFICIENCY_CATEGORY.WEAPON, {
    ...SIMPLE_WEAPON_PROFICIENCY,
  }),
  getSavingThrowClassProficiency([STATS.WIS, STATS.CHA]),
  getChoiceSkillProficiencies(
    filter(SKILL_OPTIONS, (s) => WARLOCK_SKILLS.has(s.value)),
    2,
  ),
  {
    type: SECTION_CONFIG_TYPE.STATIC,
    format: SECTION_CONFIG_FORMAT.FEATURE,
    path: MULTI_PATH,
    value: {
      label: 'Pact Magic',
      description:
        'Your arcane research and the magic bestowed on you by your patron have given you facility with spells.\n\n~~~Spellcasting focus~~~\nYou can use an arcane focus as a spellcasting focus for your warlock spells.\n\n~~~Cantrips (0-Level Spells)~~~\nYou know two cantrips of your choice from the warlock spell list. You learn additional warlock cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Warlock table.\n\n~~~Spell Slots~~~\nThe Warlock table shows how many spell slots you have to cast your warlock spells of 1st through 5th level. The table also shows what the level of those slots is; all of your spell slots are the same level. To cast one of your warlock spells of 1st level or higher, you must expend a spell slot. You regain all expended spell slots when you finish a short or long rest.\n\nFor example, when you are 5th level, you have two 3rd-level spell slots. To cast the 1st-level spell witch bolt, you must spend one of those slots, and you cast it as a 3rd-level spell.',
    },
    config: {
      getFinalValue: (value) => ({
        spellcastingAbility: STATS.WIS,
        pactMagicSlotLevel: 1,
        knownSpells: {
          0: 2,
          1: 2,
        },
        features: [value],
        resources: [
          {
            label: 'Pact Magic',
            max: 1,
          },
        ],
      }),
    },
  },
  getBasicFeatureByLD(
    'Spells Known',
    "At 1st level, you know two 1st-level spells of your choice from the warlock spell list.\n\nThe Spells Known column of the Warlock table shows when you learn more warlock spells of your choice of 1st level or higher. A spell you choose must be of a level no higher than what's shown in the table's Slot Level column for your level. When you reach 6th level, for example, you learn a new warlock spell, which can be 1st, 2nd, or 3rd level.\n\nAdditionally, when you gain a level in this class, you can choose one of the warlock spells you know and replace it with another spell from the warlock spell list, which also must be of a level for which you have spell slots.",
  ),
  getBasicFeatureByLD(
    'Spellcasting Ability: Charisma',
    'Charisma is your spellcasting ability for your warlock spells, so you use your Charisma whenever a spell refers to your spellcasting ability. In addition, you use your Charisma modifier when setting the saving throw DC for a warlock spell you cast and when making an attack roll with one.\n\n\tSpell save DC = 8 + your proficiency bonus + your Charisma modifier\n\n\tSpell attack modifier = your proficiency bonus + your Charisma modifier',
  ),
  getBasicFeatureByLD(
    'Ritual Casting',
    'You can cast a sorcerer spell as a ritual if that spell has the ritual tag and you have the spell prepared.',
  ),
  getBasicDropdownChoice({
    options: entries(WARLOCK_SUBCLASSES).map(([key, label]) => ({
      value: key,
      label,
    })),
    path: 'subClass',
    getFinalValue: (value) => WARLOCK_SUBCLASSES[value],
    header: 'Otherworldly Patron',
    config: {
      description:
        'At 1st level, you have struck a bargain with an otherworldly being of your choice. Your choice grants you features at 1st level and again at 6th, 10th, and 14th level.',
    },
  }),
];

export const WARLOCK_EQUIPMENT = [
  getStaticEquipment([
    getInventoryItemFromEquipmentType(ARMORS.LEATHER),
    getInventoryItemFromEquipmentType(WEAPONS.DAGGER, 2),
  ]),
  getEquipmentChoice([
    {
      label: 'Any Arcane Focus',
      options: entries(
        pickEquipmentConfigsByList(values(ARCANE_FOCUS_GEAR)),
      ).map((entry) => convertEquipmentConfigEntryToOption(entry)),
    },
  ]),
  getEquipmentChoice([
    {
      label: 'Any Simple Weapon',
      options: entries(SIMPLE_WEAPON_EQUIPMENT_CONFIGS).map((entry) =>
        convertEquipmentConfigEntryToOption(entry),
      ),
    },
  ]),
  getEquipmentChoice([
    {
      label: 'Light Crossbow, Crossbow Bolts (20) or Any Simple Weapon',
      options: [
        {
          ...convertEquipmentTypeToOption(
            WEAPONS.CROSSBOW_LIGHT,
            1,
            'Light Crossbow, Crossbow Bolts (20)',
          ),
          item: [
            getInventoryItemFromEquipmentType(WEAPONS.CROSSBOW_LIGHT),
            getInventoryItemFromEquipmentType(
              ADVENTURING_GEAR.CROSSBOW_BOLT,
              20,
            ),
          ],
        },
        ...entries(SIMPLE_WEAPON_EQUIPMENT_CONFIGS)
          .filter(([t]) => t !== WEAPONS.CROSSBOW_LIGHT)
          .map((entry) => convertEquipmentConfigEntryToOption(entry)),
      ],
    },
  ]),
];

export const WARLOCK_CONFIG = {
  levelOneConfig: WARLOCK_LEVEL_ONE_CONFIG,
  equipment: WARLOCK_EQUIPMENT,
};
