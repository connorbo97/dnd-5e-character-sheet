import { values } from 'lodash';

export enum ALIGNMENTS {
  LG = 'Lawful Good',
  LN = 'Lawful Neutral',
  LE = 'Lawful Evil',
  NG = 'Neutral Good',
  N = 'Neutral',
  NE = 'Neutral Evil',
  CG = 'Chaotic Good',
  CN = 'Chaotic Neutral',
  CE = 'Chaotic Evil',
}

export const ALIGNMENT_OPTIONS = values(ALIGNMENTS).map((v) => ({
  value: v,
  label: v,
}));
