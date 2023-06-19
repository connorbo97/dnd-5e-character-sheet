import { Rollable } from './rollable';

export enum ChatType {
  BASIC = 'basic',
  SPELL = 'spell',
  CHAT = 'chat',
  DAMAGE = 'damage',
}

export type ChatEntryFollowUp = {
  roll: Rollable;
  critModifier?: number;
  config: ChatEntryInputs;
};

export type ChatEntryInputs = {
  playerName?: string;
  result?: string;
  type?: ChatType;
  label?: string;
  labelSuffix?: string;

  description?: string;
  dc?: number;
  detailedResult?: string;

  isFollowUp?: boolean;
  followUp?: Array<ChatEntryFollowUp>;
};

export interface ChatEntry extends ChatEntryInputs {
  playerName: string;
  result: string;
  type: ChatType;
}
