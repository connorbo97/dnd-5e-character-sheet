import {
  CreateConfigEntry,
  SECTION_CONFIG_FORMAT,
  SECTION_CONFIG_TYPE,
} from 'constants/characterCreatorSections';
import {
  LIGHT_ARMOR_PROFICIENCY,
  MEDIUM_ARMOR_PROFICIENCY,
  OTHER_PROFICIENCY_CATEGORY,
  SHIELD_PROFICIENCY,
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
  getEquipmentChoice,
  getInventoryItemFromEquipmentConfig,
  getStaticEquipment,
} from './commonEquipmentConfigs';
import {
  EQUIPMENT_CONFIGS,
  pickEquipmentConfigsByList,
} from 'constants/equipment';
import { ARMORS } from 'constants/armor';
import { ADVENTURING_GEAR, HOLY_SYMBOL_GEAR } from 'constants/adventuringGear';
import { SIMPLE_WEAPON_EQUIPMENT_CONFIGS, WEAPONS } from 'constants/weapons';

const CLERIC_SKILLS = new Set([
  SKILLS.HISTORY,
  SKILLS.INSIGHT,
  SKILLS.MEDICINE,
  SKILLS.PERSUASION,
  SKILLS.RELIGION,
]);
const CLERIC_SUBCLASSES = {
  ARCANA: 'Arcana',
  DEATH: 'Death',
  FORGE: 'Forge',
  GRAVE: 'Grave',
  KNOWLEDGE: 'Knowledge',
  LIFE: 'Life',
  LIGHT: 'Light',
  NATURE: 'Nature',
  ORDER: 'Order',
  PEACE: 'Peace',
  TEMPEST: 'Tempest',
  TRICKER: 'Trickster',
  TWILIGHT: 'Twilight',
  WAR: 'War',
};
export const CLERIC_LEVEL_ONE_CONFIG: Array<CreateConfigEntry> = [
  getPresentationConfig('Proficiencies'),
  getOtherProficiencyForClass(OTHER_PROFICIENCY_CATEGORY.ARMOR, {
    ...LIGHT_ARMOR_PROFICIENCY,
    ...MEDIUM_ARMOR_PROFICIENCY,
    ...SHIELD_PROFICIENCY,
  }),
  getOtherProficiencyForClass(OTHER_PROFICIENCY_CATEGORY.WEAPON, {
    ...SIMPLE_WEAPON_PROFICIENCY,
  }),
  getSavingThrowClassProficiency([STATS.WIS, STATS.CHA]),
  getChoiceSkillProficiencies(
    filter(SKILL_OPTIONS, (s) => CLERIC_SKILLS.has(s.value)),
    2,
  ),
  {
    type: SECTION_CONFIG_TYPE.STATIC,
    format: SECTION_CONFIG_FORMAT.FEATURE,
    path: MULTI_PATH,
    value: {
      label: 'Spellcasting',
      description:
        "As a conduit for divine power, you can cast cleric spells.\n\n~~~Spellcasting focus~~~\nYou can use a holy symbol as a spellcasting focus for your cleric spells.\n\n~~~Cantrips (0-Level Spells)~~~\nAt 1st level, you know three cantrips of your choice from the cleric spell list. You learn additional cleric cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Cleric table.\n\n~~~Preparing and Casting Spells~~~\nThe Cleric table shows how many spell slots you have to cast your cleric spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.\n\nYou prepare the list of cleric spells that are available for you to cast, choosing from the cleric spell list. When you do so, choose a number of cleric spells equal to your Wisdom modifier + your cleric level (minimum of one spell). The spells must be of a level for which you have spell slots.\n\nFor example, if you are a 3rd-level cleric, you have four 1st-level and two 2nd-level spell slots. With a Wisdom of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell Cure Wounds, you can cast it using a 1st-level or 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.\n\nYou can change your list of prepared spells when you finish a long rest. Preparing a new list of cleric spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.",
    },
    config: {
      getFinalValue: (value) => ({
        spellcastingAbility: STATS.WIS,
        knownSpells: {
          0: 2,
          1: 2,
        },
        features: [value],
      }),
    },
  },
  getBasicFeatureByLD(
    'Prepared Caster',
    'You prepare the list of cleric spells that are available for you to cast, choosing from the cleric spell list. You can change your list of prepared spells when you finish a long rest. Preparing a new list of cleric spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.',
  ),
  getBasicFeatureByLD(
    'Spells Prepared',
    "As a cleric, you may prepare a number of cleric spells equal to the following formula:\n\n\tSpells Prepared = your Wisdom modifier + half your cleric level rounded down (minimum of one spell).\n\nThe spells must be of a level for which you have spell slots.\n\nFor example, if you are a 3rd-level cleric, you have four 1st-level and two 2nd-level spell slots. With a Wisdom of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell Cure Wounds, you can cast it using a 1st-level or 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.",
  ),
  getBasicFeatureByLD(
    'Spellcasting Ability: Wisdom',
    'Wisdom is your spellcasting ability for your cleric spells. The power of your spells comes from your devotion to your deity. You use your Wisdom whenever a cleric spell refers to your spellcasting ability. In addition, you use your Wisdom modifier when setting the saving throw DC for a cleric spell you cast and when making an attack roll with one.\n\n\tSpell save DC = 8 + your proficiency bonus + your Wisdom modifier\n\n\tSpell attack modifier = your proficiency bonus + your Wisdom modifier',
  ),
  getBasicFeatureByLD(
    'Ritual Casting',
    'You can cast a cleric spell as a ritual if that spell has the ritual tag and you have the spell prepared.',
  ),
  getBasicDropdownChoice({
    options: entries(CLERIC_SUBCLASSES).map(([key, label]) => ({
      value: key,
      label,
    })),
    path: 'subClass',
    getFinalValue: (value) => CLERIC_SUBCLASSES[value],
    header: 'Divine Domain',
    config: {
      description:
        'At 1st level, you choose a domain shaped by your choice of Deity and the gifts they grant you. Your choice grants you domain spells and other features when you choose it at 1st level. It also grants you additional ways to use Channel Divinity when you gain that feature at 2nd level, and additional benefits at 6th, 8th, and 17th levels.',
    },
  }),
];

export const CLERIC_EQUIPMENT = [
  getStaticEquipment([
    getInventoryItemFromEquipmentConfig(EQUIPMENT_CONFIGS[ARMORS.SHIELD]),
  ]),
  getEquipmentChoice([
    {
      label: 'Any Holy Symbol',
      options: entries(
        pickEquipmentConfigsByList(values(HOLY_SYMBOL_GEAR)),
      ).map((entry) => convertEquipmentConfigEntryToOption(entry)),
    },
  ]),
  getEquipmentChoice([
    {
      options: entries(
        pickEquipmentConfigsByList([WEAPONS.MACE, WEAPONS.WARHAMMER]),
      ).map((entry) =>
        convertEquipmentConfigEntryToOption(
          entry,
          1,
          entry[0] === WEAPONS.WARHAMMER ? 'Warhammer (if proficient)' : '',
        ),
      ),
    },
  ]),
  getEquipmentChoice([
    {
      options: entries(
        pickEquipmentConfigsByList([
          ARMORS.SCALE_MAIL,
          ARMORS.LEATHER,
          ARMORS.CHAIN_MAIL,
        ]),
      ).map((entry) =>
        convertEquipmentConfigEntryToOption(
          entry,
          1,
          entry[0] === ARMORS.CHAIN_MAIL ? 'Chain Mail (if proficient)' : '',
        ),
      ),
    },
  ]),
  getEquipmentChoice([
    {
      label: 'Light Crossbow and Crossbow Bolts (20) or Any Simple Weapon',
      options: entries(SIMPLE_WEAPON_EQUIPMENT_CONFIGS).map((entry) => {
        const option = convertEquipmentConfigEntryToOption(entry);
        if (entry[0] === WEAPONS.CROSSBOW_LIGHT) {
          return {
            ...option,
            label: 'Light Crossbow and Crossbow Bolts (20)',
            item: [
              option.item,
              getInventoryItemFromEquipmentConfig(
                EQUIPMENT_CONFIGS[ADVENTURING_GEAR.CROSSBOW_BOLT],
                20,
              ),
            ],
          };
        }
        return option;
      }),
    },
  ]),
];

export const CLERIC_CONFIG = {
  equipment: CLERIC_EQUIPMENT,
  levelOneConfig: CLERIC_LEVEL_ONE_CONFIG,
};
