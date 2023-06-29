import { DRAGON_BORN_CREATE_CONFIG } from './race/dragonborn';
import { DWARF_CREATE_CONFIG } from './race/dwarf';
import { ELF_CREATE_CONFIG } from './race/elf';
import { GNOME_CREATE_CONFIG } from './race/gnome';
import { HALF_ELF_CREATE_CONFIG } from './race/halfElf';
import { HALF_ORC_CREATE_CONFIG } from './race/halfOrc';
import { HALFLING_CREATE_CONFIG } from './race/halfling';
import { HUMAN_CREATE_CONFIG } from './race/human';
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
    createConfig: ELF_CREATE_CONFIG,
  },
  [RACES.GNOME]: {
    label: 'Gnome',
    createConfig: GNOME_CREATE_CONFIG,
  },
  [RACES.HALF_ELF]: {
    label: 'Half Elf',
    createConfig: HALF_ELF_CREATE_CONFIG,
  },
  [RACES.HALF_ORC]: {
    label: 'Half Orc',
    createConfig: HALF_ORC_CREATE_CONFIG,
  },
  [RACES.HALFLING]: {
    label: 'Halfling',
    createConfig: HALFLING_CREATE_CONFIG,
  },
  [RACES.HUMAN]: {
    label: 'Human',
    createConfig: HUMAN_CREATE_CONFIG
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
