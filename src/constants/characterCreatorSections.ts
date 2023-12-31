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
  EQUIPMENT = 'EQUIPMENT',
  STATIC_CHOICE = 'STATIC_CHOICE',
  STATS = 'STATS',
  SPEED = 'SPEED',
  PROFICIENCY = 'PROFICIENCY',
  PROFICIENCY_CLASS = 'PROFICIENCY_CLASS',
  SKILL_PROFICIENCY = 'SKILL_PROFICIENCY',
  DROPDOWN = 'DROPDOWN',
  FEATURE = 'FEATURE',
  HIDDEN = 'HIDDEN',
  NOTE = 'NOTE',
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
  getDescription?: Function;
  getPostDescription?: Function;
  isFullValue?: Function;
  hideValue?: boolean;
  hideContent?: boolean;
  disableValidation?: boolean;
  allowPartial?: boolean;
  allowDupes?: boolean;
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
  getDisabledOptions?: (form, index) => Array<any>;
};
