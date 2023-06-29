export enum BACKGROUNDS {
  ACOLYTE = 'ACOLYTE',
  SOLDIER = 'SOLDIER',
  CUSTOM = 'CUSTOM',
}

export enum BACKGROUND_CONFIG_TYPE {
  STATIC = 'STATIC',
  CHOICE = 'CHOICE',
}
export enum BACKGROUND_CONFIG_FORMAT {
  BASIC = 'BASIC',
  STATIC_CHOICE = 'STATIC_CHOICE',
  STATS = 'STATS',
  SPEED = 'SPEED',
  PROFICIENCY = 'PROFICIENCY',
  SKILL_PROFICIENCY = 'SKILL_PROFICIENCY',
  DROPDOWN = 'DROPDOWN',
  FEATURE = 'FEATURE',
}
export type BackgroundCreateConfigEntryConfig = {
  header?: string;
  reference?: string;
  description?: string;
  subHeader?: string;
  renderValue?: Function;
  getLabelValue?: Function;
  getFinalValue?: Function;
  getPlaceholder?: Function;
  isFullValue?: Function;
  hideValue?: boolean;
};

type BackgroundCreateConfigEntry = {
  type: BACKGROUND_CONFIG_TYPE;
  format: BACKGROUND_CONFIG_FORMAT;
  path: string;
  value?: any;
  optional?: boolean;
  choiceCondition?: Function;
  options?: Array<{ value: any; label: any }>;
  config?: BackgroundCreateConfigEntryConfig;
};
export type BackgroundConfigsCreateConfig = Array<BackgroundCreateConfigEntry>;
export type BackgroundConfig = {
  label: string;
  createConfig: BackgroundConfigsCreateConfig;
};
