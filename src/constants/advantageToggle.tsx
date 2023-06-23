export enum ADVANTAGE_TOGGLE {
  NORMAL = 'NORMAL',
  ADVANTAGE = 'ADVANTAGE',
  DISADVANTAGE = 'DISADVANTAGE',
}

export const ADVANTAGE_TOGGLE_OPTIONS = [
  { value: ADVANTAGE_TOGGLE.DISADVANTAGE, label: 'Disadvantage' },
  { value: ADVANTAGE_TOGGLE.NORMAL, label: 'Normal' },
  { value: ADVANTAGE_TOGGLE.ADVANTAGE, label: 'Advantage' },
];
