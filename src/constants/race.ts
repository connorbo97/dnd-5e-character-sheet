export enum RACES {
  DRAGONBORN = 'DRAGONBORN',
  DWARF = 'DWARF',
  GNOME = 'GNOME',
  HALF_ELF = 'HALF_ELF',
  HALFLING = 'HALFLING',
  HALF_ORC = 'HALF_ORC',
  HUMAN = 'HUMAN',
  TIEFLING = 'TIEFLING',
}

type RaceConfigs = {
  [r in RACES]: { label: string };
};
export const RACE_CONFIGS: RaceConfigs = {
  [RACES.DRAGONBORN]: { label: 'Dragonborn' },
  [RACES.DWARF]: { label: 'Dwarf' },
  [RACES.GNOME]: { label: 'Gnome' },
  [RACES.HALF_ELF]: { label: 'Half Elf' },
  [RACES.HALFLING]: { label: 'Halfling' },
  [RACES.HALF_ORC]: { label: 'Half Orc' },
  [RACES.HUMAN]: { label: 'Human' },
  [RACES.TIEFLING]: { label: 'Tiefling' },
};
