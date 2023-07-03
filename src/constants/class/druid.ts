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
  WEAPON_PROFICIENCIES,
} from 'constants/otherProficiencies';
import {
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
import { SIMPLE_WEAPON_EQUIPMENT_CONFIGS, WEAPONS } from 'constants/weapons';
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
import { DRUIDIC_FOCUS_GEAR } from 'constants/adventuringGear';

const DRUID_SKILLS = new Set([
  SKILLS.ARCANA,
  SKILLS.ANIMAL_HANDLING,
  SKILLS.INSIGHT,
  SKILLS.MEDICINE,
  SKILLS.NATURE,
  SKILLS.PERCEPTION,
  SKILLS.RELIGION,
  SKILLS.SURVIVAL,
]);
export const DRUID_LEVEL_ONE_CONFIG: Array<CreateConfigEntry> = [
  getPresentationConfig('Proficiencies'),
  getOtherProficiencyForClass(OTHER_PROFICIENCY_CATEGORY.ARMOR, {
    ...LIGHT_ARMOR_PROFICIENCY,
    ...MEDIUM_ARMOR_PROFICIENCY,
    ...SHIELD_PROFICIENCY,
  }),
  getOtherProficiencyForClass(OTHER_PROFICIENCY_CATEGORY.WEAPON, {
    ...SIMPLE_WEAPON_PROFICIENCY,
    ...WEAPON_PROFICIENCIES[WEAPONS.CLUB],
    ...WEAPON_PROFICIENCIES[WEAPONS.DAGGER],
    ...WEAPON_PROFICIENCIES[WEAPONS.DART],
    ...WEAPON_PROFICIENCIES[WEAPONS.JAVELIN],
    ...WEAPON_PROFICIENCIES[WEAPONS.MACE],
    ...WEAPON_PROFICIENCIES[WEAPONS.QUARTERSTAFF],
    ...WEAPON_PROFICIENCIES[WEAPONS.SCIMITAR],
    ...WEAPON_PROFICIENCIES[WEAPONS.SICKLE],
    ...WEAPON_PROFICIENCIES[WEAPONS.SLING],
  }),
  getSavingThrowClassProficiency([STATS.INT, STATS.WIS]),
  getChoiceSkillProficiencies(
    filter(SKILL_OPTIONS, (s) => DRUID_SKILLS.has(s.value)),
    2,
  ),
  getBasicFeatureByLD(
    'Druidic',
    "You know Druidic, the secret language of druids. You can speak the language and use it to leave hidden messages. You and others who know this language automatically spot such a message. Others spot the message's presence with a successful DC 15 Wisdom (Perception) check but can't decipher it without magic.",
  ),
  getBasicFeatureByLD(
    'Nature Defense',
    'Druids will not wear armor or use shields made of metal',
  ),
  {
    type: SECTION_CONFIG_TYPE.STATIC,
    format: SECTION_CONFIG_FORMAT.FEATURE,
    path: MULTI_PATH,
    value: {
      label: 'Spellcasting',
      description:
        "Drawing on the divine essence of nature itself, you can cast spells to shape that essence to your will.\n\n~~~Spellcasting focus~~~\nYou can use a druidic focus as a spellcasting focus for your druid spells.\n\n~~~Cantrips (0-Level Spells)~~~\nAt 1st level, you know two cantrips of your choice from the druid spell list. You learn additional druid cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Druid table.\n\n~~~Preparing and Casting Spells~~~\nThe Druid table shows how many spell slots you have to cast your druid spells of 1st level and higher. To cast one of these druid spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.\n\nYou prepare the list of druid spells that are available for you to cast, choosing from the druid spell list. When you do so, choose a number of druid spells equal to your Wisdom modifier + your Druid level (minimum of one spell). The spells must be of a level for which you have spell slots.\n\nFor example, if you are a 3rd-level druid, you have four 1st-level and two 2nd-level spell slots. With a Wisdom of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell Cure Wounds, you can cast it using a 1st-level or 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.\nYou can also change your list of prepared spells when you finish a long rest. Preparing a new list of druid spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.",
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
    'You prepare the list of druid spells that are available for you to cast, choosing from the druid spell list. You can change your list of prepared spells when you finish a long rest. Preparing a new list of druid spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.',
  ),
  getBasicFeatureByLD(
    'Spells Prepared',
    "As a druid, you may prepare a number of druid spells equal to the following formula:\n\n\tSpells Prepared = your Wisdom modifier + half your druid level rounded down (minimum of one spell).\n\nThe spells must be of a level for which you have spell slots.\n\nFor example, if you are a 3rd-level druid, you have four 1st-level and two 2nd-level spell slots. With a Wisdom of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell Cure Wounds, you can cast it using a 1st-level or 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.",
  ),
  getBasicFeatureByLD(
    'Spellcasting Ability: Wisdom',
    'Wisdom is your spellcasting ability for your druid spells. The power of your spells comes from your devotion to your deity. You use your Wisdom whenever a druid spell refers to your spellcasting ability. In addition, you use your Wisdom modifier when setting the saving throw DC for a druid spell you cast and when making an attack roll with one.\n\n\tSpell save DC = 8 + your proficiency bonus + your Wisdom modifier\n\n\tSpell attack modifier = your proficiency bonus + your Wisdom modifier',
  ),
  getBasicFeatureByLD(
    'Ritual Casting',
    'You can cast a druid spell as a ritual if that spell has the ritual tag and you have the spell prepared.',
  ),
];

export const DRUID_EQUIPMENT = [
  getStaticEquipment([
    getInventoryItemFromEquipmentConfig(EQUIPMENT_CONFIGS[ARMORS.LEATHER]),
  ]),
  getEquipmentChoice([
    {
      label: 'Any Druidic Focus',
      options: entries(
        pickEquipmentConfigsByList(values(DRUIDIC_FOCUS_GEAR)),
      ).map((entry) => convertEquipmentConfigEntryToOption(entry)),
    },
  ]),
  getEquipmentChoice([
    {
      label: 'Wooden Shield or Any Simple Weapon',
      options: [
        convertEquipmentConfigEntryToOption(
          [ARMORS.SHIELD, EQUIPMENT_CONFIGS[ARMORS.SHIELD]],
          1,
          'Wooden Shield',
        ),
        ...entries(SIMPLE_WEAPON_EQUIPMENT_CONFIGS).map((entry) =>
          convertEquipmentConfigEntryToOption(entry),
        ),
      ],
    },
  ]),
  getEquipmentChoice([
    {
      label: 'Scimitar or Any Simple Weapon',
      options: [
        convertEquipmentConfigEntryToOption([
          WEAPONS.SCIMITAR,
          EQUIPMENT_CONFIGS[WEAPONS.SCIMITAR],
        ]),
        ...entries(SIMPLE_WEAPON_EQUIPMENT_CONFIGS).map((entry) =>
          convertEquipmentConfigEntryToOption(entry),
        ),
      ],
    },
  ]),
];

export const DRUID_CONFIG = {
  equipment: DRUID_EQUIPMENT,
  levelOneConfig: DRUID_LEVEL_ONE_CONFIG,
};
