import { mapValues } from 'lodash';
import { STATS } from './stats';
import { EquipmentConfig } from './equipmentTypes';
import { StaticRollable } from './rollable';

export enum ARMORS {
  PADDED = 'PADDED',
  LEATHER = 'LEATHER',
  STUDDED_LEATHER = 'STUDDED_LEATHER',
  HIDE = 'HIDE',
  CHAIN_SHIRT = 'CHAIN_SHIRT',
  SCALE_MAIL = 'SCALE_MAIL',
  BREASTPLATE = 'BREASTPLATE',
  HALF_PLATE = 'HALF_PLATE',
  RING_MAIL = 'RING_MAIL',
  CHAIN_MAIL = 'CHAIN_MAIL',
  SPLINT = 'SPLINT',
  PLATE = 'PLATE',
  SHIELD = 'SHIELD',
}
export enum ARMOR_TYPES {
  LIGHT = 'LIGHT',
  MEDIUM = 'MEDIUM',
  HEAVY = 'HEAVY',
  SHIELD = 'SHIELD',
}

export type ArmorConfig = {
  label: string;
  cost: number;
  weight: number;
  type: ARMOR_TYPES;
  armor: StaticRollable;
  isModifier?: boolean;
  disadvantageStealthCheck?: boolean;
  strengthRequirement?: number;
};
export const ARMOR_CONFIGS: {
  [s in ARMORS]: ArmorConfig;
} = {
  [ARMORS.PADDED]: {
    label: 'Padded Armor',
    cost: 5,
    weight: 8,
    type: ARMOR_TYPES.LIGHT,
    armor: [11, STATS.DEX],
    disadvantageStealthCheck: true,
  },
  [ARMORS.LEATHER]: {
    label: 'Leather Armor',
    cost: 10,
    weight: 10,
    type: ARMOR_TYPES.LIGHT,
    armor: [11, STATS.DEX],
  },
  [ARMORS.STUDDED_LEATHER]: {
    label: 'Studded Leather Armor',
    cost: 45,
    weight: 13,
    type: ARMOR_TYPES.LIGHT,
    armor: [12, STATS.DEX],
  },
  [ARMORS.HIDE]: {
    label: 'Hide Armor',
    cost: 10,
    weight: 12,
    type: ARMOR_TYPES.MEDIUM,
    armor: [12, STATS.DEX],
  },
  [ARMORS.CHAIN_SHIRT]: {
    label: 'Chain shirt',
    cost: 50,
    weight: 20,
    type: ARMOR_TYPES.MEDIUM,
    armor: [13, STATS.DEX],
  },
  [ARMORS.SCALE_MAIL]: {
    label: 'Scale Mail',
    cost: 50,
    weight: 45,
    type: ARMOR_TYPES.MEDIUM,
    armor: [14, STATS.DEX],
    disadvantageStealthCheck: true,
  },
  [ARMORS.BREASTPLATE]: {
    label: 'Breastplate',
    cost: 400,
    weight: 20,
    type: ARMOR_TYPES.MEDIUM,
    armor: [14, STATS.DEX],
  },
  [ARMORS.HALF_PLATE]: {
    label: 'Half Plate',
    cost: 750,
    weight: 40,
    type: ARMOR_TYPES.MEDIUM,
    armor: [15, STATS.DEX],
    disadvantageStealthCheck: true,
  },
  [ARMORS.RING_MAIL]: {
    label: 'Ring Mail',
    cost: 30,
    weight: 40,
    type: ARMOR_TYPES.HEAVY,
    armor: [14],
    disadvantageStealthCheck: true,
  },
  [ARMORS.CHAIN_MAIL]: {
    label: 'Chain Mail',
    cost: 75,
    weight: 55,
    type: ARMOR_TYPES.HEAVY,
    armor: [16],
    disadvantageStealthCheck: true,
    strengthRequirement: 13,
  },
  [ARMORS.SPLINT]: {
    label: 'Splint',
    cost: 200,
    weight: 60,
    type: ARMOR_TYPES.HEAVY,
    armor: [17],
    disadvantageStealthCheck: true,
    strengthRequirement: 15,
  },
  [ARMORS.PLATE]: {
    label: 'Plate',
    cost: 1500,
    weight: 65,
    type: ARMOR_TYPES.HEAVY,
    armor: [18],
    disadvantageStealthCheck: true,
    strengthRequirement: 15,
  },
  [ARMORS.SHIELD]: {
    label: 'Shield',
    cost: 10,
    weight: 6,
    type: ARMOR_TYPES.SHIELD,
    armor: [2],
    isModifier: true,
    strengthRequirement: 15,
  },
};

export const getEquipmentConfigFromArmorConfig = (
  config: ArmorConfig,
): EquipmentConfig => ({
  label: config.label,
  cost: config.cost,
  weight: config.weight,
  mods: {
    ac: config.isModifier ? undefined : config.armor,
    acMod: config.isModifier ? config.armor : undefined,
  },
});
export const ARMOR_EQUIPMENT_CONFIGS = mapValues(
  ARMOR_CONFIGS,
  getEquipmentConfigFromArmorConfig,
);
