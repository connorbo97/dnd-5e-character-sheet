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
import { entries, filter } from 'lodash';
import { WEAPONS } from 'constants/weapons';

const SORCERER_SKILLS = new Set([
  SKILLS.ARCANA,
  SKILLS.DECEPTION,
  SKILLS.INSIGHT,
  SKILLS.INTIMIDATION,
  SKILLS.PERSUASION,
  SKILLS.RELIGION,
]);
const SORCERER_SUBCLASSES = {
  ABBERANT_MIND: 'Abberant Mind',
  CLOCKWORK_SOUL: 'Clockwork Soul',
  DRACONIC_BLOODLINE: 'Draconic Bloodline',
  DIVINE_SOUL: 'Divine Soul',
  LUNAR_SORCERY: 'Lunar Sorcery',
  SHADOW_MAGIC: 'Shadow Magic',
  STORM_SORCERY: 'Storm Sorcery',
  WILD_MAGIC: 'Wild Magic',
};
export const SORCERER_LEVEL_ONE_CONFIG: Array<CreateConfigEntry> = [
  getPresentationConfig('Proficiencies'),
  getOtherProficiencyForClass(OTHER_PROFICIENCY_CATEGORY.WEAPON, {
    ...WEAPON_PROFICIENCIES[WEAPONS.DAGGER],
    ...WEAPON_PROFICIENCIES[WEAPONS.DART],
    ...WEAPON_PROFICIENCIES[WEAPONS.SLING],
    ...WEAPON_PROFICIENCIES[WEAPONS.QUARTERSTAFF],
    ...WEAPON_PROFICIENCIES[WEAPONS.CROSSBOW_LIGHT],
  }),
  getSavingThrowClassProficiency([STATS.CON, STATS.CHA]),
  getChoiceSkillProficiencies(
    filter(SKILL_OPTIONS, (s) => SORCERER_SKILLS.has(s.value)),
    2,
  ),
  {
    type: SECTION_CONFIG_TYPE.STATIC,
    format: SECTION_CONFIG_FORMAT.FEATURE,
    path: MULTI_PATH,
    value: {
      label: 'Spellcasting',
      description:
        "An event in your past, or in the life of a parent or ancestor, left an indelible mark on you, infusing you with arcane magic. This font of magic, whatever its origin, fuels your spells.\n\n~~~Spellcasting focus~~~\nYou can use an arcane focus as a spellcasting focus for your sorcerer spells.\n\n~~~Cantrips (0-Level Spells)~~~\nAt 1st level, you know four cantrips of your choice from the sorcerer spell list. You learn additional sorcerer cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Sorcerer table.\n\n~~~Spell Slots~~~\nThe Sorcerer table shows how many spell slots you have to cast your sorcerer spells of 1st level and higher. To cast one of these sorcerer spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.\n\nFor example, if you know the 1st-level spell burning hands and have a 1st-level and a 2nd-level spell slot available, you can cast burning hands using either slot.",
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
    'Spells Known',
    'You know two 1st-level spells of your choice from the sorcerer spell list.\n\nThe Spells Known column of the Sorcerer table shows when you learn more sorcerer spells of your choice. Each of these spells must be of a level for which you have spell slots. For instance, when you reach 3rd level in this class, you can learn one new spell of 1st or 2nd level.\n\nAdditionally, when you gain a level in this class, you can choose one of the sorcerer spells you know and replace it with another spell from the sorcerer spell list, which also must be of a level for which you have spell slots.',
  ),
  getBasicFeatureByLD(
    'Spellcasting Ability: Charisma',
    'Charisma is your spellcasting ability for your sorcerer spells, since the power of your magic relies on your ability to project your will into the world. You use your Charisma whenever a spell refers to your spellcasting ability. In addition, you use your Charisma modifier when setting the saving throw DC for a sorcerer spell you cast and when making an attack roll with one.\n\n\tSpell save DC = 8 + your proficiency bonus + your Charisma modifier\n\n\tSpell attack modifier = your proficiency bonus + your Charisma modifier',
  ),
  getBasicFeatureByLD(
    'Ritual Casting',
    'You can cast a sorcerer spell as a ritual if that spell has the ritual tag and you have the spell prepared.',
  ),
  getBasicDropdownChoice({
    options: entries(SORCERER_SUBCLASSES).map(([key, label]) => ({
      value: key,
      label,
    })),
    path: 'subClass',
    getFinalValue: (value) => SORCERER_SUBCLASSES[value],
    header: 'Sorcerous Origin',
    config: {
      description:
        'Choose a sorcerous origin, which describes the source of your innate magical power. Your choice grants you features when you choose it at 1st level and again at 6th, 14th, and 18th level.',
    },
  }),
];
