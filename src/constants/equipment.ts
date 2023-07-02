import { ADVENTURING_GEAR_CONFIG } from './adventuringGear';
import { TOOLS_CONFIG } from './tools';
import { WEAPON_CONFIGS } from './weapons';

export const EQUIPMENT_CONFIGS: {
  [s: string]: { label: string; cost: number; weight: number };
} = {
  ...ADVENTURING_GEAR_CONFIG,
  ...TOOLS_CONFIG,
  ...WEAPON_CONFIGS,
};
