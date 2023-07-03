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
  getChoiceToolProficiencies,
  getOtherProficiencyForClass,
  getPresentationConfig,
} from 'constants/race/commonCreatorConfigs';
import { MULTI_PATH } from 'constants/raceTypes';
import { SKILL_OPTIONS } from 'constants/skills';
import { STATS } from 'constants/stats';
import { getSavingThrowClassProficiency } from './commonClassConfigs';
import { WEAPONS } from 'constants/weapons';
import { MUSICAL_INSTRUMENT_OPTIONS } from 'constants/tools';
import { DICE } from 'constants/dice';

export const BARD_LEVEL_ONE_CONFIG: Array<CreateConfigEntry> = [
  getPresentationConfig('Proficiencies'),
  getOtherProficiencyForClass(OTHER_PROFICIENCY_CATEGORY.ARMOR, {
    ...LIGHT_ARMOR_PROFICIENCY,
    ...MEDIUM_ARMOR_PROFICIENCY,
    ...SHIELD_PROFICIENCY,
  }),
  getOtherProficiencyForClass(OTHER_PROFICIENCY_CATEGORY.WEAPON, {
    ...SIMPLE_WEAPON_PROFICIENCY,
    ...WEAPON_PROFICIENCIES[WEAPONS.CROSSBOW_HAND],
    ...WEAPON_PROFICIENCIES[WEAPONS.LONGSWORD],
    ...WEAPON_PROFICIENCIES[WEAPONS.RAPIER],
    ...WEAPON_PROFICIENCIES[WEAPONS.SHORTSWORD],
  }),
  getSavingThrowClassProficiency([STATS.DEX, STATS.CHA]),
  getChoiceSkillProficiencies(SKILL_OPTIONS, 3),
  getChoiceToolProficiencies(MUSICAL_INSTRUMENT_OPTIONS, 3, {
    header: 'Musical Instrument Proficiencies',
  }),
  {
    type: SECTION_CONFIG_TYPE.STATIC,
    format: SECTION_CONFIG_FORMAT.FEATURE,
    path: MULTI_PATH,
    value: {
      label: 'Bardic Inspiration',
      description:
        'You can inspire others through stirring words or music. To do so, you use a bonus action on your turn to choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6.\n\nOnce within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.\n\nYou can use this feature a number of times equal to your Charisma modifier (a minimum of once). You regain any expended uses when you finish a long rest.\n\nYour Bardic Inspiration die changes when you reach certain levels in this class. The die becomes a d8 at 5th level, a d10 at 10th level, and a d12 at 15th level.',
    },
    config: {
      getFinalValue: (value) => ({
        features: [value],
        resources: [
          {
            label: 'Bardic Inspiration',
            max: STATS.CHA,
            source: 'Bard',
            resetOnLongRest: true,
          },
        ],
        globalAttackModifiers: [
          { label: 'Bardic Inspiration', base: [[1, DICE.d8]], source: 'Bard' },
        ],
      }),
    },
  },
  {
    type: SECTION_CONFIG_TYPE.STATIC,
    format: SECTION_CONFIG_FORMAT.FEATURE,
    path: MULTI_PATH,
    value: {
      label: 'Spellcasting',
      description:
        "You have learned to untangle and reshape the fabric of reality in harmony with your wishes and music. Your spells are part of your vast repertoire, magic that you can tune to different situations.\n\n~~~Spellcasting focus~~~\nYou can use a musical instrument (found in chapter 5) as a spellcasting focus for your bard spells.\n\n~~~Cantrips (0-Level Spells)~~~\nYou know two cantrips of your choice from the bard spell list. You learn additional bard cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Bard table.\n\n~~~Spell Slots~~~\nThe Bard table shows how many spell slots you have to cast your bard spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest. For example, if you know the 1st-level spell Cure Wounds and have a 1st-level and a 2nd-level spell slot available, you can cast Cure Wounds using either slot.",
    },
    config: {
      getFinalValue: (value) => ({
        spellcastingAbility: STATS.CHA,
        knownSpells: {
          0: 2,
          1: 2,
        },
        features: [value],
      }),
    },
  },
  getBasicFeatureByLD(
    'Spells Known',
    'You know four 1st-level spells of your choice from the bard spell list.\n\nThe Spells Known column of the Bard table shows when you learn more bard spells of your choice. Each of these spells must be of a level for which you have spell slots, as shown on the table. For instance, when you reach 3rd level in this class, you can learn one new spell of 1st or 2nd level.\n\nAdditionally, when you gain a level in this class, you can choose one of the bard spells you know and replace it with another spell from the bard spell list, which also must be of a level for which you have spell slots.',
  ),
  getBasicFeatureByLD(
    'Spellcasting Ability: Charisma',
    'Charisma is your spellcasting ability for your bard spells. Your magic comes from the heart and soul you pour into the performance of your music or oration. You use your Charisma whenever a spell refers to your spellcasting ability. In addition, you use your Charisma modifier when setting the saving throw DC for a bard spell you cast and when making an attack roll with one.\n\n\tSpell save DC = 8 + your proficiency bonus + your Charisma modifier\n\n\tSpell attack modifier = your proficiency bonus + your Charisma modifier',
  ),
  getBasicFeatureByLD(
    'Ritual Casting',
    'You can cast any bard spell you know as a ritual if that spell has the ritual tag',
  ),
];

// const INFUSE_ITEM_FEATURE = getFeatureWithResource(
//   'Infuse Item',
//   "At 2nd level, you've gained the ability to imbue mundane items with certain magical infusions, turning those objects into magic items.\n\n~~~Infusions Known~~~\nWhen you gain this feature, pick four artificer infusions to learn. You learn additional infusions of your choice when you reach certain levels in this class, as shown in the Infusions Known column of the Artificer table.\n\nWhenever you gain a level in this class, you can replace one of the artificer infusions you learned with a new one.\n\n~~~Infusing an Item~~~\nWhenever you finish a long rest, you can touch a nonmagical object and imbue it with one of your artificer infusions, turning it into a magic item. An infusion works on only certain kinds of objects, as specified in the infusion's description. If the item requires attunement, you can attune yourself to it the instant you infuse the item. If you decide to attune to the item later, you must do so using the normal process for attunement (see the attunement rules in the Dungeon Master's Guide).\n\nYour infusion remains in an item indefinitely, but when you die, the infusion vanishes after a number of days equal to your Intelligence modifier (minimum of 1 day). The infusion also vanishes if you replace your knowledge of the infusion.\n\nYou can infuse more than one nonmagical object at the end of a long rest; the maximum number of objects appears in the Infused Items column of the Artificer table. You must touch each of the objects, and each of your infusions can be in only one object at a time. Moreover, no object can bear more than one of your infusions at a time. If you try to exceed your maximum number of infusions, the oldest infusion ends, and then the new infusion applies.\n\nIf an infusion ends on an item that contains other things, like a bag of holding, its contents harmlessly appear in and around its space.",
//   { label: 'Item Infusions', max: 2, source: 'Artificer' },
// );
