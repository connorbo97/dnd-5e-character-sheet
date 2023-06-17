import { ProficiencyConfig } from 'constants/characterSheet';

export const hasProficiency = (config: ProficiencyConfig, key) => {
  return !!config?.proficient;
};
export const hasExpertise = (config: ProficiencyConfig, key) => {
  return !!config?.expertise;
};

export const getProficiencyBonus = (
  config: ProficiencyConfig,
  key,
  profBonus,
) => {
  if (!config) {
    return 0;
  }

  if (hasExpertise(config, key)) {
    return profBonus * 2;
  }

  if (hasProficiency(config, key)) {
    return profBonus;
  }

  return 0;
};
