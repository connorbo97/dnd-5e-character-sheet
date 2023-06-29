import { STATS } from './stats';

export type CreationStatConfig = {
  stat: STATS;
  value: number;
};
export enum SECTION_CONFIG_TYPE {
  STATIC = 'STATIC',
  CHOICE = 'CHOICE',
}
export enum SECTION_CONFIG_FORMAT {
  BASIC = 'BASIC',
  STATIC_CHOICE = 'STATIC_CHOICE',
  STATS = 'STATS',
  SPEED = 'SPEED',
  PROFICIENCY = 'PROFICIENCY',
  SKILL_PROFICIENCY = 'SKILL_PROFICIENCY',
  DROPDOWN = 'DROPDOWN',
  FEATURE = 'FEATURE',
}

export type CreateConfigEntryConfig = {
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

export type CreateConfigEntry = {
  type: SECTION_CONFIG_TYPE;
  format: SECTION_CONFIG_FORMAT;
  path: string;
  value?: any;
  optional?: boolean;
  choiceCondition?: Function;
  options?: Array<{ value: any; label: any }>;
  config?: CreateConfigEntryConfig;
};