const base = process.env.PUBLIC_URL;
export const DEFAULT_DICE_OPTIONS = {
  assetPath: `${base}/assets/dice-box/`, // required,
  id: 'dice-canvas',
  theme: 'default',
  themeColor: '#FF0000',
  friction: 0.9,
  scale: 5,
  gravity: 5,
  mass: 8,
  linearDamping: 0.6,
  angularDamping: 0.6,
  spinForce: 1,
  throwForce: 30,
  shadowTransparency: 0.6,
  startingHeight: 5,
};

export const ROLL_AUDIOS = [
  new Audio(`${base}/roll.mp3`),
  new Audio(`${base}/roll-2.mp3`),
  new Audio(`${base}/roll-3.mp3`),
  new Audio(`${base}/roll-4.mp3`),
];

export type DiceBoxResult = {
  value: number;
  resultArray: Array<number | Array<number>>;
  resultText: string;
};
