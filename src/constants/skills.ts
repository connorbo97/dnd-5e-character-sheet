import { values } from 'lodash';
import { STATS } from './stats';

export enum SKILLS {
  ACROBATICS = 'ACROBATICS',
  ANIMAL_HANDLING = 'ANIMAL_HANDLING',
  ARCANA = 'ARCANA',
  ATHLETICS = 'ATHLETICS',
  DECEPTION = 'DECEPTION',
  HISTORY = 'HISTORY',
  INSIGHT = 'INSIGHT',
  INTIMIDATION = 'INTIMIDATION',
  INVESTIGATION = 'INVESTIGATION',
  MEDICINE = 'MEDICINE',
  NATURE = 'NATURE',
  PERCEPTION = 'PERCEPTION',
  PERFORMANCE = 'PERFORMANCE',
  PERSUASION = 'PERSUASION',
  RELIGION = 'RELIGION',
  SLEIGHT_OF_HAND = 'SLEIGHT_OF_HAND',
  STEALTH = 'STEALTH',
  SURVIVAL = 'SURVIVAL',
}

type SkillConfig = {
  label: string;
  stat: STATS;
};
export const SKILL_CONFIGS: { [s in SKILLS]: SkillConfig } = {
  [SKILLS.ACROBATICS]: {
    label: 'Acrobatics',
    stat: STATS.DEX,
  },
  [SKILLS.ANIMAL_HANDLING]: {
    label: 'Animal Handling',
    stat: STATS.WIS,
  },
  [SKILLS.ARCANA]: {
    label: 'Arcana',
    stat: STATS.INT,
  },
  [SKILLS.ATHLETICS]: {
    label: 'Athletics',
    stat: STATS.STR,
  },
  [SKILLS.DECEPTION]: {
    label: 'Deception',
    stat: STATS.CHA,
  },
  [SKILLS.HISTORY]: {
    label: 'History',
    stat: STATS.INT,
  },
  [SKILLS.INSIGHT]: {
    label: 'Insight',
    stat: STATS.WIS,
  },
  [SKILLS.INTIMIDATION]: {
    label: 'Intimidation',
    stat: STATS.CHA,
  },
  [SKILLS.INVESTIGATION]: {
    label: 'Investigation',
    stat: STATS.INT,
  },
  [SKILLS.MEDICINE]: {
    label: 'Medicine',
    stat: STATS.WIS,
  },
  [SKILLS.NATURE]: {
    label: 'Nature',
    stat: STATS.INT,
  },
  [SKILLS.PERCEPTION]: {
    label: 'Perception',
    stat: STATS.WIS,
  },
  [SKILLS.PERFORMANCE]: {
    label: 'Performance',
    stat: STATS.CHA,
  },
  [SKILLS.PERSUASION]: {
    label: 'Persuasion',
    stat: STATS.CHA,
  },
  [SKILLS.RELIGION]: {
    label: 'Religion',
    stat: STATS.INT,
  },
  [SKILLS.SLEIGHT_OF_HAND]: {
    label: 'Sleight of Hand',
    stat: STATS.DEX,
  },
  [SKILLS.STEALTH]: {
    label: 'Stealth',
    stat: STATS.DEX,
  },
  [SKILLS.SURVIVAL]: {
    label: 'Survival',
    stat: STATS.WIS,
  },
};

export enum SKILL_SORT {
  ALPHABETICAL = 'ALPHABETICAL',
  ABILITY = 'ABILITY',
  SCORE = 'SCORE',
}
export const SKILL_SORT_OPTIONS = [
  { value: SKILL_SORT.ALPHABETICAL, label: 'Alphabetical' },
  { value: SKILL_SORT.ABILITY, label: 'Ability' },
  { value: SKILL_SORT.SCORE, label: 'Score' },
];

export const SKILLS_LIST = values(SKILLS);
export const SKILL_OPTIONS = SKILLS_LIST.map((s) => ({
  value: s,
  label: SKILL_CONFIGS[s].label,
}));
