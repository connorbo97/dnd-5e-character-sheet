export enum BACKGROUNDS {
  ACOLYTE = 'ACOLYTE',
  SOLDIER = 'SOLDIER',
  CUSTOM = 'CUSTOM',
}

export type BackgroundConfig = { label: string };
export const BACKGROUND_CONFIGS: { [c in BACKGROUNDS]: BackgroundConfig } = {
  [BACKGROUNDS.ACOLYTE]: { label: 'Acolyte' },
  [BACKGROUNDS.SOLDIER]: { label: 'Soldier' },
  [BACKGROUNDS.CUSTOM]: { label: 'Custom' },
};
