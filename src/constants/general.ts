import { STATS } from './stats';

export type ProficiencyConfig = {
  proficient?: boolean;
  expertise?: boolean;

  mod?: number;

  category?: string;
  stat?: STATS;
  label?: string;
};
