import { DRAGON_BORN_CREATE_CONFIG } from './race/dragonborn';
import { DWARF_CREATE_CONFIG } from './race/dwarf';
import { ELF_CREATE_CONFIG } from './race/elf';
import { RACES, RaceConfigs } from './raceTypes';

export const RACE_CONFIGS: RaceConfigs = {
  [RACES.DRAGONBORN]: {
    label: 'Dragonborn',
    createConfig: DRAGON_BORN_CREATE_CONFIG,
  },
  [RACES.DWARF]: {
    label: 'Dwarf',
    createConfig: DWARF_CREATE_CONFIG,
  },
  [RACES.ELF]: {
    label: 'Elf',
    createConfig: { base: [] },
  },
  [RACES.GNOME]: {
    label: 'Gnome',
    createConfig: { base: [] },
  },
  [RACES.HALF_ELF]: {
    label: 'Half Elf',
    createConfig: { base: [] },
  },
  [RACES.HALFLING]: {
    label: 'Halfling',
    createConfig: { base: [] },
  },
  [RACES.HALF_ORC]: {
    label: 'Half Orc',
    createConfig: { base: [] },
  },
  [RACES.HUMAN]: {
    label: 'Human',
    createConfig: { base: [] },
  },
  [RACES.TIEFLING]: {
    label: 'Tiefling',
    createConfig: { base: [] },
  },
  [RACES.TASHA_CUSTOM]: {
    label: "Tasha's Custom Lineage",
    createConfig: { base: [] },
  },
  [RACES.CUSTOM]: {
    label: 'Custom',
    createConfig: { base: [] },
  },
};

export const RACE_OPTIONS = Object.values(RACES).map((r) => ({
  value: r,
  label: RACE_CONFIGS[r].label || r,
}));
