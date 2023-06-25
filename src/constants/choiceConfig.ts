export type ChoiceConfig = {
  isChoice: true;
  minSelect?: number;
  maxSelect?: number;
  mustSelect?: number;
  options: Array<{ value: any; label: string | Node }>;
  metadata?: any;

  value?: any;
};
