import { BACKGROUNDS, BackgroundConfig } from './backgroundTypes';

export const BACKGROUND_CONFIGS: { [c in BACKGROUNDS]: BackgroundConfig } = {
  [BACKGROUNDS.ACOLYTE]: { label: 'Acolyte', createConfig: [] },
  [BACKGROUNDS.SOLDIER]: { label: 'Soldier', createConfig: [] },
  [BACKGROUNDS.CUSTOM]: { label: 'Custom', createConfig: [] },
};
