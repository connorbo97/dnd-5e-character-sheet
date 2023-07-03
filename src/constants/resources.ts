import { ROLLABLES, Rollable } from './rollable';
import { STATS } from './stats';

export type ResourceConfig = {
  label: string;
  source?: string;
  total?: number;
  max: number | ROLLABLES.PB | STATS | Rollable;
  resetOnShortRest?: boolean;
  resetOnLongRest?: boolean;
  itemResourceIndex?: number;
};
