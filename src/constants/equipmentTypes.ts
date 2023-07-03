import { AttackEntry } from './attacks';
import { InventoryItemMods } from './inventory';

export type EquipmentConfig = {
  label: string;
  cost: number;
  weight: number;
  mods?: InventoryItemMods;
  description?: string;
  disadvantageStealthCheck?: boolean;
  isMartial?: boolean;
  attack?: AttackEntry;
};
