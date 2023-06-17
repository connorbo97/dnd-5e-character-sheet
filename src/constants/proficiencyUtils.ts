import { ProficiencyConfig } from 'constants/characterSheet';

export const hasProficiency = (config: ProficiencyConfig) => {
  return !!config?.proficient;
};
export const hasExpertise = (config: ProficiencyConfig) => {
  return !!config?.expertise;
};

export const getProficiencyBonus = (config: ProficiencyConfig, profBonus) => {
  if (!config) {
    return 0;
  }

  if (hasExpertise(config)) {
    return profBonus * 2;
  }

  if (hasProficiency(config)) {
    return profBonus;
  }

  return 0;
};
