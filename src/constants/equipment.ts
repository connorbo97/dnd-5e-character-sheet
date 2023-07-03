import { pickBy } from 'lodash';
import { ADVENTURING_GEAR_CONFIG } from './adventuringGear';
import { TOOLS_CONFIG } from './tools';
import { WEAPON_EQUIPMENT_CONFIGS } from './weapons';
import { EquipmentConfig } from './equipmentTypes';
import { ARMOR_EQUIPMENT_CONFIGS } from './armor';

export const EQUIPMENT_CONFIGS: {
  [s: string]: EquipmentConfig;
} = {
  ...ADVENTURING_GEAR_CONFIG,
  ...pickBy(TOOLS_CONFIG, (v) => !v.isNotInventory),
  ...WEAPON_EQUIPMENT_CONFIGS,
  ...ARMOR_EQUIPMENT_CONFIGS,
};

export const pickEquipmentConfigsByList = (typeSet) => {
  return typeSet.reduce((acc, t) => {
    if (EQUIPMENT_CONFIGS[t]) {
      acc[t] = EQUIPMENT_CONFIGS[t];
    }
    return acc;
  }, {});
};
