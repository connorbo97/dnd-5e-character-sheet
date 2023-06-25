import { ROLLABLES } from './rollable';

export type ResourceConfig = {
  label: string;
  source?: string;
  total: number;
  max: number | ROLLABLES.PB;
  resetOnShortRest?: boolean;
  resetOnLongRest?: boolean;
  itemResourceIndex?: number;
};
