import { BACKGROUNDS, BackgroundConfig } from './backgroundTypes';
import {
  getBasicDropdownChoice,
  getChoiceSkillProficiencies,
} from './race/commonCreatorConfigs';
import { SKILL_OPTIONS } from './skills';

export const BACKGROUND_CONFIGS: { [c in BACKGROUNDS]: BackgroundConfig } = {
  [BACKGROUNDS.ACOLYTE]: { label: 'Acolyte', createConfig: [] },
  [BACKGROUNDS.SOLDIER]: { label: 'Soldier', createConfig: [] },
  [BACKGROUNDS.CUSTOM]: { label: 'Custom', createConfig: [] },
};

export const BACKGROUND_SKILL_CONFIG = getChoiceSkillProficiencies(
  SKILL_OPTIONS,
  2,
);
// export const BACKGROUND_EQUIPMENT_CONFIG = getBasicDropdownChoice({
//   options: [{ value: 'test', label: 'test' }],
//   path: 'equipment',
//   getFinalValue: (v) => v,
//   header: 'Equipment',
// });

export const BACKGROUND_CLOTHES_CONFIG = getBasicDropdownChoice({
  options: [
    { value: 'NONE', label: 'None' },
    { value: 'COMMON', label: 'Common Clothes' },
    { value: 'COSTUME', label: 'Costume' },
    { value: 'FINE', label: 'Fine Clothes' },
    { value: 'OCCUPATION', label: 'Occupational Clothes' },
    { value: 'TRAVELERS', label: "Traveler's Clothes" },
  ],
  path: 'clothes',
  getFinalValue: (v) => v,
  header: 'Clothes',
});

export const BACKGROUND_TOOL_PROFICIENCY_CONFIG = getBasicDropdownChoice({
  options: [
    { value: 'NONE', label: 'None' },
    { value: 'A', label: 'Tool A' },
    { value: 'B', label: 'Tool B' },
    { value: 'C', label: 'Tool C' },
    { value: 'D', label: 'Tool D' },
    { value: 'E', label: 'Tool E' },
  ],
  path: 'tools',
  getFinalValue: (v) => v,
  header: 'Tool Proficiency',
});
