import { Skills } from './skills';
import { Stats } from './stats';

export type ProficiencyConfig = {
  proficient?: boolean;
  expertise?: boolean;
  mod?: number;
};

export type CharacterSheet = {
  name: string;
  profBonus: number;
  stats: {
    [s in Stats]: number;
  };
  savingThrows: {
    [s in Stats]?: ProficiencyConfig;
  };
  skills: {
    [s in Skills]?: ProficiencyConfig;
  };
};
