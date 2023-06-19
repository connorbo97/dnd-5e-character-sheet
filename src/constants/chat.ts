import { Rollable } from './rollable';

export enum ChatType {
  BASIC = 'basic',
  ATTACK = 'attack',
  SPELL = 'spell',
  CHAT = 'chat',
  DAMAGE = 'damage',
}

export type ChatEntryFollowUp = {
  roll: Rollable;
  critRange?: number;
  config: ChatEntryInputs;
};

export type ChatEntryInputs = {
  playerName?: string;
  result?: string;
  resultArray?: Array<number>;
  type?: ChatType;
  label?: string;
  labelSuffix?: string;

  // used for attacks; if you roll >= this, its a crit
  critRange?: number;
  // used for damage; if this is true, double any dice
  isCrit?: boolean;

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
