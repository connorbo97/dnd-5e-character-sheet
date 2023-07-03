import {
  CreateConfigEntry,
  SECTION_CONFIG_FORMAT,
  SECTION_CONFIG_TYPE,
} from 'constants/characterCreatorSections';
import {
  LIGHT_ARMOR_PROFICIENCY,
  MEDIUM_ARMOR_PROFICIENCY,
  SHIELD_PROFICIENCY,
  SIMPLE_WEAPON_PROFICIENCY,
} from 'constants/otherProficiencies';
import {
  getBasicFeatureByLD,
  getChoiceSkillProficiencies,
  getFeatureWithResource,
  getOtherProficiencyForClass,
  getPresentationConfig,
} from 'constants/race/commonCreatorConfigs';
import { MULTI_PATH } from 'constants/raceTypes';
import { SKILLS, SKILL_OPTIONS } from 'constants/skills';
import { STATS } from 'constants/stats';
import { filter } from 'lodash';

const ARTIFICER_SKILLS = new Set([
  SKILLS.ARCANA,
  SKILLS.HISTORY,
  SKILLS.INVESTIGATION,
  SKILLS.MEDICINE,
  SKILLS.NATURE,
  SKILLS.PERCEPTION,
  SKILLS.SLEIGHT_OF_HAND,
]);
export const ARTIFICER_LEVEL_ONE_CONFIG: Array<CreateConfigEntry> = [
  getPresentationConfig('Proficiencies'),
  getOtherProficiencyForClass('Armor', {
    ...LIGHT_ARMOR_PROFICIENCY,
    ...MEDIUM_ARMOR_PROFICIENCY,
    ...SHIELD_PROFICIENCY,
  }),
  getOtherProficiencyForClass('Weapon', {
    ...SIMPLE_WEAPON_PROFICIENCY,
  }),
  {
    type: SECTION_CONFIG_TYPE.STATIC,
    format: SECTION_CONFIG_FORMAT.PROFICIENCY_CLASS,
    value: {
      [STATS.CON]: { proficient: true, label: 'Constitution' },
      [STATS.INT]: { proficient: true, label: 'Intelligence' },
    },
    path: 'savingThrows',
    config: {
      header: 'Saving Throws',
    },
  },
  getChoiceSkillProficiencies(
    filter(SKILL_OPTIONS, (s) => ARTIFICER_SKILLS.has(s.value)),
    2,
  ),
  getFeatureWithResource(
    'Magical Tinkering',
    "At 1st level, you've learned how to invest a spark of magic into mundane objects. To use this ability, you must have thieves' tools or artisan's tools in hand. You then touch a Tiny nonmagical object as an action and give it one of the following magical properties of your choice:\n- The object sheds bright light in a 5-foot radius and dim light for an additional 5 feet.\n- Whenever tapped by a creature, the object emits a recorded message that can be heard up to 10 feet away. You utter the message when you bestow this property on the object, and the recording can be no more than 6 seconds long.\n- The object continuously emits your choice of an odor or a nonverbal sound (wind, waves, chirping, or the like). The chosen phenomenon is perceivable up to 10 feet away.\n- A static visual effect appears on one of the object's surfaces. This effect can be a picture, up to 25 words of text, lines and shapes, or a mixture of these elements, as you like.\n\nThe chosen property lasts indefinitely. As an action, you can touch the object and end the property early.\n\nYou can bestow magic on multiple objects, touching one object each time you use this feature, though a single object can only bear one property at a time. The maximum number of objects you can affect with this feature at one time is equal to your Intelligence modifier (minimum of one object). If you try to exceed your maximum, the oldest property immediately ends, and then the new property applies.",
    {
      label: 'Magical Tinkering',
      max: STATS.INT,
      source: 'Artificer',
    },
  ),
  {
    type: SECTION_CONFIG_TYPE.STATIC,
    format: SECTION_CONFIG_FORMAT.FEATURE,
    path: MULTI_PATH,
    value: {
      label: 'Spellcasting',
      description:
        "You've studied the workings of magic and how to cast spells, channeling the magic through objects. To observers, you don't appear to be casting spells in a conventional way; you appear to produce wonders from mundane items and outlandish inventions.\n\n~~~Tools Required~~~\nYou produce your artificer spell effects through your tools. You must have a spellcasting focus - specifically thieves' tools or some kind of artisan's tool - in hand when you cast any spell with this Spellcasting feature (meaning the spell has an \"M\" component when you cast it). You must be proficient with the tool to use it in this way. See the equipment chapter in the Player's Handbook for descriptions of these tools.\n\nAfter you gain the Infuse Item feature at 2nd level, you can also use any item bearing one of your infusions as a spellcasting focus.\n\n~~~Cantrips (0-Level Spells)~~~\nAt 1st level, you know two cantrips of your choice from the artificer spell list. At higher levels, you learn additional artificer cantrips of your choice, as shown in the Cantrips Known column of the Artificer table.\n\nWhen you gain a level in this class, you can replace one of the artificer cantrips you know with another cantrip from the artificer spell list.\n\n~~~Preparing and Casting Spells~~~\nThe Artificer table shows how many spell slots you have to cast your artificer spells. To cast one of your artificer spells of 1st level or higher, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.\n\nYou prepare the list of artificer spells that are available for you to cast, choosing from the artificer spell list. When you do so, choose a number of artificer spells equal to your Intelligence modifier + half your artificer level, rounded down (minimum of one spell). The spells must be of a level for which you have spell slots.\n\nFor example, if you are a 5th-level artificer, you have four 1st-level and two 2nd-level spell slots. With an Intelligence of 14, your list of prepared spells can include four spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell Cure Wounds, you can cast it using a lst-level or a 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.\n\nYou can change your list of prepared spells when you finish a long rest. Preparing a new list of artificer spells requires time spent tinkering with your spellcasting focuses: at least 1 minute per spell level for each spell on your list.",
    },
    config: {
      getFinalValue: (value) => ({
        spellcastingAbility: STATS.INT,
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
    "As an artificer, you know a number of artificer spells equal to the following formula:\n\n\tSpells Known = INT + half your artificer level rounded down (minimum of one spell).\n\nThe spells must be of a level for which you have spell slots.\n\nFor example, if you are a 5th-level artificer, you have four 1st-level and two 2nd-level spell slots. With an Intelligence of 14, your list of prepared spells can include four spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell Cure Wounds, you can cast it using a 1st-level or a 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.",
  ),
  getBasicFeatureByLD(
    'Prepared Caster',
    'You prepare the list of artificer spells that are available for you to cast, choosing from the artificer spell list. You can change your list of prepared spells when you finish a long rest. Preparing a new list of artificer spells requires time spent tinkering with your spellcasting focuses: at least 1 minute per spell level for each spell on your list.',
  ),
  getBasicFeatureByLD(
    'Spellcasting Ability: Intelligence',
    'Intelligence is your spellcasting ability for your artificer spells; your understanding of the theory behind magic allows you to wield these spells with superior skill. You use your Intelligence whenever an artificer spell refers to your spellcasting ability. In addition, you use your Intelligence modifier when setting the saving throw DC for an artificer spell you cast and when making an attack roll with one.\n\n\tSpell save DC = 8 + your proficiency bonus + your Intelligence modifier\n\n\tSpell attack modifier = your proficiency bonus + your Intelligence modifier',
  ),
  getBasicFeatureByLD(
    'Ritual Casting',
    'You can cast an artificer spell as a ritual if that spell has the ritual tag and you have the spell prepared.',
  ),
];

// const INFUSE_ITEM_FEATURE = getFeatureWithResource(
//   'Infuse Item',
//   "At 2nd level, you've gained the ability to imbue mundane items with certain magical infusions, turning those objects into magic items.\n\n~~~Infusions Known~~~\nWhen you gain this feature, pick four artificer infusions to learn. You learn additional infusions of your choice when you reach certain levels in this class, as shown in the Infusions Known column of the Artificer table.\n\nWhenever you gain a level in this class, you can replace one of the artificer infusions you learned with a new one.\n\n~~~Infusing an Item~~~\nWhenever you finish a long rest, you can touch a nonmagical object and imbue it with one of your artificer infusions, turning it into a magic item. An infusion works on only certain kinds of objects, as specified in the infusion's description. If the item requires attunement, you can attune yourself to it the instant you infuse the item. If you decide to attune to the item later, you must do so using the normal process for attunement (see the attunement rules in the Dungeon Master's Guide).\n\nYour infusion remains in an item indefinitely, but when you die, the infusion vanishes after a number of days equal to your Intelligence modifier (minimum of 1 day). The infusion also vanishes if you replace your knowledge of the infusion.\n\nYou can infuse more than one nonmagical object at the end of a long rest; the maximum number of objects appears in the Infused Items column of the Artificer table. You must touch each of the objects, and each of your infusions can be in only one object at a time. Moreover, no object can bear more than one of your infusions at a time. If you try to exceed your maximum number of infusions, the oldest infusion ends, and then the new infusion applies.\n\nIf an infusion ends on an item that contains other things, like a bag of holding, its contents harmlessly appear in and around its space.",
//   { label: 'Item Infusions', max: 2, source: 'Artificer' },
// );
