import { Rollable } from './rollable';

export enum ChatType {
  BASIC = 'BASIC',
  SPELL = 'SPELL',
  CHAT = 'CHAT',
  DAMAGE = 'DAMAGE',
}

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
  followUp?: {
    roll: Rollable;
    type: ChatType;
  };
};

export interface ChatEntry extends ChatEntryInputs {
  playerName: string;
  result: string;
  type: ChatType;
}
