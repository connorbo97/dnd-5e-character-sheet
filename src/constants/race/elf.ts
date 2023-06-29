import { STATS } from 'constants/stats';
import {
  HUMANOID_TYPE_FEATURE,
  getBasicDropdownChoice,
  getBasicFeature,
  getDarkvision,
  getLanguageFeature,
  getProficiencies,
  getSkillProficiencies,
  getStatsFeature,
  getMovementFeature,
} from './commonRace';
import { SKILLS } from 'constants/skills';
import { LANGUAGE_OPTIONS } from 'constants/languages';

export const ELF_CREATE_CONFIG = {
  base: [
    getStatsFeature({
      [STATS.DEX]: 2,
    }),
    HUMANOID_TYPE_FEATURE,
    getMovementFeature(30),
    getSkillProficiencies([SKILLS.PERCEPTION]),
    getLanguageFeature(
      ['Elvish'],
      `You can speak, read, and write Common and Elvish. Elvish⁠ is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires.`,
    ),
    getBasicFeature({
      label: 'Fey Ancestry',
      description: `You have advantage on saving throws against being charmed, and magic can’t put you to sleep.`,
    }),
    getBasicFeature({
      label: 'Trance',
      description: `Elves don't need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is “trance.”)\n\nWhile meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice.\n\nAfter resting in this way, you gain the same benefit that a human does from 8 hours of sleep.`,
    }),
    getDarkvision(),
  ],
  subRaceOptions: [
    { value: 'Dark Elf (Drow)', label: 'Dark Elf (Drow)' },
    { value: 'High Elf', label: 'High Elf' },
    { value: 'Wood Elf', label: 'Wood Elf' },
  ],
  subRace: {
    'Dark Elf (Drow)': [
      getStatsFeature({ [STATS.CHA]: 1 }),
      getProficiencies('Weapon', ['Rapier', 'Shortsword', 'Hand Crossbow']),
      getBasicFeature({
        label: 'Superior Darkvision',
        description: 'Your darkvision has a radius of 120 feet.',
      }),
      getBasicFeature({
        label: 'Sunlight Sensitivity',
        description:
          'You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.',
      }),
      //TODO: SPELLCASTING
      /* Drow Magic
You know the dancing lights cantrip. When you reach 3rd level, you can cast the faerie fire spell once per day. When you reach 5th level, you can also cast the darkness spell once per dday. Charisma is your spellcasting ability for these spells.*/
    ],
    'High Elf': [
      getStatsFeature({ [STATS.INT]: 1 }),
      getProficiencies('Weapon', [
        'Longsword',
        'Shortsword',
        'Shortbow',
        'Longbow',
      ]),
      getBasicDropdownChoice({
        options: LANGUAGE_OPTIONS,
        header: 'Language Proficiencies',
        path: 'otherProficiencies',
        getFinalValue: (v) => [{ label: v, category: 'Language' }],
      }),
      // TODO: SPELLCASTING
      /*Cantrip
You know one cantrip of your choice from the Wizard spell list. Intelligence is your Spellcasting ability for it.*/
    ],
    'Wood Elf': [
      getStatsFeature({ [STATS.WIS]: 1 }),
      getMovementFeature(35),
      getProficiencies('Weapon', [
        'Longsword',
        'Shortsword',
        'Shortbow',
        'Longbow',
      ]),
      getBasicFeature({
        label: 'Mask of the Wild',
        description:
          'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.',
      }),
    ],
  },
};
