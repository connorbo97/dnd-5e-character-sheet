import {
  CreateConfigEntry,
  SECTION_CONFIG_FORMAT,
  SECTION_CONFIG_TYPE,
} from 'constants/characterCreatorSections';
import {
  OTHER_PROFICIENCY_CATEGORY,
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
import { filter } from 'lodash';
import { WEAPONS } from 'constants/weapons';
import { CharacterSheetPath } from 'constants/characterSheetPaths';

const WIZARD_SKILLS = new Set([
  SKILLS.ARCANA,
  SKILLS.HISTORY,
  SKILLS.INSIGHT,
  SKILLS.INVESTIGATION,
  SKILLS.MEDICINE,
  SKILLS.RELIGION,
]);
export const WIZARD_LEVEL_ONE_CONFIG: Array<CreateConfigEntry> = [
  getPresentationConfig('Proficiencies'),
  getOtherProficiencyForClass(OTHER_PROFICIENCY_CATEGORY.WEAPON, {
    ...WEAPON_PROFICIENCIES[WEAPONS.DAGGER],
    ...WEAPON_PROFICIENCIES[WEAPONS.DART],
    ...WEAPON_PROFICIENCIES[WEAPONS.SLING],
    ...WEAPON_PROFICIENCIES[WEAPONS.QUARTERSTAFF],
    ...WEAPON_PROFICIENCIES[WEAPONS.CROSSBOW_LIGHT],
  }),
  getSavingThrowClassProficiency([STATS.INT, STATS.WIS]),
  getChoiceSkillProficiencies(
    filter(SKILL_OPTIONS, (s) => WIZARD_SKILLS.has(s.value)),
    2,
  ),
  {
    type: SECTION_CONFIG_TYPE.STATIC,
    format: SECTION_CONFIG_FORMAT.FEATURE,
    path: MULTI_PATH,
    value: {
      label: 'Spellcasting',
      description:
        'An event in your past, or in the life of a parent or ancestor, left an indelible mark on you, infusing you with arcane magic. This font of magic, whatever its origin, fuels your spells.\n\n~~~Spellcasting focus~~~\nYou can use an arcane focus as a spellcasting focus for your wizard spells.\n\n~~~Cantrips (0-Level Spells)~~~\nAt 1st level, you know three cantrips of your choice from the wizard spell list. You learn additional wizard cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Wizard table.\n\n',
    },
    config: {
      getFinalValue: (value) => ({
        spellcastingAbility: STATS.WIS,
        knownSpells: {
          0: 4,
          1: 2,
        },
        features: [value],
      }),
    },
  },
  getBasicFeatureByLD(
    'Spells Known: Spellbook',
    "At 1st level, you have a spellbook containing six 1st-level wizard spells of your choice. Your spellbook is the repository of the wizard spells you know, except your cantrips, which are fixed in your mind.\n\nThe spells that you add to your spellbook as you gain levels reflect the arcane research you conduct on your own, as well as intellectual breakthroughs you have had about the nature of the multiverse. You might find other spells during your adventures. You could discover a spell recorded on a scroll in an evil wizard's chest, for example, or in a dusty tome in an ancient library.\n\n~~~Copying a Spell into the Book~~~\nWhen you find a wizard spell of 1st level or higher, you can add it to your spellbook if it is of a spell level you can prepare and if you can spare the time to decipher and copy it.\n\nCopying a spell into your spellbook involves reproducing the basic form of the spell, then deciphering the unique system of notation used by the wizard who wrote it. You must practice the spell until you understand the sounds or gestures required, then transcribe it into your spellbook using your own notation.\n\nFor each level of the spell, the process takes 2 hours and costs 50 gp. The cost represents material components you expend as you experiment with the spell to master it, as well as the fine inks you need to record it. Once you have spent this time and money, you can prepare the spell just like your other spells.\n\n~~~Replacing the Book~~~\nYou can copy a spell from your own spellbook into another book-for example, if you want to make a backup copy of your spellbook. This is just like copying a new spell into your spellbook, but faster and easier, since you understand your own notation and already know how to cast the spell. You need spend only 1 hour and 10 gp for each level of the copied spell.\n\nIf you lose your spellbook, you can use the same procedure to transcribe the spells that you have prepared into a new spellbook. Filling out the remainder of your spellbook requires you to find new spells to do so, as normal. For this reason, many wizards keep backup spellbooks in a safe place.\n\n~~~The Book's Appearance~~~\nYour spellbook is a unique compilation of spells, with its own decorative flourishes and margin notes. It might be a plain, functional leather volume that you received as a gift from your master, a finely bound gilt-edged tome you found in an ancient library or even a loose collection of notes scrounged together after you lost your previous spellbook in a mishap.",
  ),
  getBasicFeatureByLD(
    'Prepared Caster',
    "The Wizard table shows how many spell slots you have to cast your wizard spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.",
  ),
  getBasicFeatureByLD(
    'Spells Prepared',
    "As a wizard, you prepare the list of wizard spells that are available for you to cast. To do so, choose a number of wizard spells from your spellbook equal to the following formula:\n\n\tSpells Prepared = your Intelligence modifier + your wizard level (minimum of one spell). The spells must be of a level for which you have spell slots.\n\nFor example, if you're a 3rd-level wizard, you have four 1st-level and two 2nd-level spell slots. With an Intelligence of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination, chosen from your spellbook. If you prepare the 1st-level spell magic missile, you can cast it using a 1st-level or a 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.\n\nYou can change your list of prepared spells when you finish a long rest. Preparing a new list of wizard spells requires time spent studying your spellbook and memorizing the incantations and gestures you must make to cast the spell: at least 1 minute per spell level for each spell on your list.",
  ),
  getBasicFeatureByLD(
    'Learning Spells of 1st Level and Higher',
    'Each time you gain a wizard level, you can add two wizard spells of your choice to your spellbook. Each of these spells must be of a level for which you have spell slots, as shown on the Wizard table. On your adventures, you might find other spells that you can add to your spellbook.',
  ),
  getBasicFeatureByLD(
    'Spellcasting Ability: Intelligence',
    'Intelligence is your spellcasting ability for your wizard spells, since the power of your magic relies on your ability to project your will into the world. You use your Intelligence whenever a spell refers to your spellcasting ability. In addition, you use your Intelligence modifier when setting the saving throw DC for a wizard spell you cast and when making an attack roll with one.\n\n\tSpell save DC = 8 + your proficiency bonus + your Intelligence modifier\n\n\tSpell attack modifier = your proficiency bonus + your Intelligence modifier',
  ),
  getBasicFeatureByLD(
    'Ritual Casting',
    'You can cast a wizard spell as a ritual if that spell has the ritual tag and you have the spell prepared.',
  ),
  {
    ...getBasicFeatureByLD(
      'Arcane Recovery',
      "You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your wizard level (rounded up), and none of the slots can be 6th level or higher.\n\nFor example, if you're a 4th-level wizard, you can recover up to two levels worth of spell slots. You can recover either a 2nd-level spell slot or two 1st-level spell slots.",
    ),
    path: MULTI_PATH,
    config: {
      getFinalValue: (value) => ({
        [CharacterSheetPath.features]: [value],
        [CharacterSheetPath.resources]: [
          {
            label: 'Arcane Recovery',
            max: 1,
            source: 'Wizard',
            resetOnLongRest: true,
            resetOnShortRest: true,
          },
        ],
      }),
    },
  },
];
