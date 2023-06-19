import { Rollable } from './rollable';

export enum ChatType {
  BASIC = 'BASIC',
  SPELL = 'SPELL',
  CHAT = 'CHAT',
  DAMAGE = 'DAMAGE',
}

export type ChatEntry = {
  playerName: string;

  type: ChatType;

  label?: string;

  result: string;
  description?: string;
  dc?: number;
  detailedResult?: string;

  isFollowUp?: boolean;
  followUp?: {
    roll: Rollable;
    type: ChatType;
  };
};
