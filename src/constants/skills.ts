import { STATS } from './stats';

export enum Skills {
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
export const SKILL_CONFIGS: { [s in Skills]: SkillConfig } = {
  [Skills.ACROBATICS]: {
    label: 'Acrobatics',
    stat: STATS.DEX,
  },
  [Skills.ANIMAL_HANDLING]: {
    label: 'Animal Handling',
    stat: STATS.WIS,
  },
  [Skills.ARCANA]: {
    label: 'Arcana',
    stat: STATS.INT,
  },
  [Skills.ATHLETICS]: {
    label: 'Athletics',
    stat: STATS.STR,
  },
  [Skills.DECEPTION]: {
    label: 'Deception',
    stat: STATS.CHA,
  },
  [Skills.HISTORY]: {
    label: 'History',
    stat: STATS.INT,
  },
  [Skills.INSIGHT]: {
    label: 'Insight',
    stat: STATS.WIS,
  },
  [Skills.INTIMIDATION]: {
    label: 'Intimidation',
    stat: STATS.CHA,
  },
  [Skills.INVESTIGATION]: {
    label: 'Investigation',
    stat: STATS.INT,
  },
  [Skills.MEDICINE]: {
    label: 'Medicine',
    stat: STATS.WIS,
  },
  [Skills.NATURE]: {
    label: 'Nature',
    stat: STATS.INT,
  },
  [Skills.PERCEPTION]: {
    label: 'Perception',
    stat: STATS.WIS,
  },
  [Skills.PERFORMANCE]: {
    label: 'Performance',
    stat: STATS.CHA,
  },
  [Skills.PERSUASION]: {
    label: 'Persuasion',
    stat: STATS.CHA,
  },
  [Skills.RELIGION]: {
    label: 'Religion',
    stat: STATS.INT,
  },
  [Skills.SLEIGHT_OF_HAND]: {
    label: 'Sleight of Hand',
    stat: STATS.DEX,
  },
  [Skills.STEALTH]: {
    label: 'Stealth',
    stat: STATS.DEX,
  },
  [Skills.SURVIVAL]: {
    label: 'Survival',
    stat: STATS.WIS,
  },
};
