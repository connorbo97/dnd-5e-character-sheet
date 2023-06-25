export enum FeatureSource {
  CLASS = 'Class',
  CUSTOM = 'Custom',
  SUBCLASS = 'Subclass',
  RACE = 'Race',
  BACKGROUND = 'Background',
}

export type FeatureConfig = {
  label: string;
  source: FeatureSource;
  sourceLabel: string;
  description: string;
};
