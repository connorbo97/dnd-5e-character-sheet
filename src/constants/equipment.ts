import { pickBy } from 'lodash';
import { ADVENTURING_GEAR_CONFIG } from './adventuringGear';
import { TOOLS_CONFIG } from './tools';
import { WEAPON_EQUIPMENT_CONFIGS } from './weapons';
import { EquipmentConfig } from './equipmentTypes';

export const EQUIPMENT_CONFIGS: {
  [s: string]: EquipmentConfig;
} = {
  ...ADVENTURING_GEAR_CONFIG,
  ...pickBy(TOOLS_CONFIG, (v) => !v.isNotInventory),
  ...WEAPON_EQUIPMENT_CONFIGS,
};
