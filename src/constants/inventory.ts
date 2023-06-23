import { StaticRollable } from './rollable';

export type InventoryItem = {
  label: string;
  source: string;
  total: number;
  weight: number;
  equipped: boolean;
  description: string;
  mods: {
    ac?: StaticRollable;
  };

  disadvantageStealthCheck?: boolean;

  useAsResource: boolean;
  max?: number;
  resetOnShortRest?: boolean;
  resetOnLongRest?: boolean;
};
