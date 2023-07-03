import { ROLLABLES } from './rollable';
import { STATS } from './stats';

export type ResourceConfig = {
  label: string;
  source?: string;
  total?: number;
  max: number | ROLLABLES.PB | STATS;
  resetOnShortRest?: boolean;
  resetOnLongRest?: boolean;
  itemResourceIndex?: number;
};
