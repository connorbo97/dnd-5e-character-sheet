import { Rollable } from './rollable';

export enum ChatType {
  BASIC = 'basic',
  ATTACK = 'attack',
  SPELL = 'spell',
  CHAT = 'chat',
  DAMAGE = 'damage',
}

export type ChatEntryFollowUp = {
  roll: Rollable | string;
  critDamage?: Rollable;
  config: ChatEntryInputs;
};

export type ChatEntryInputs = {
  playerName?: string;
  result?: string | Array<string>;
  resultArray?: number | Array<number>;
  detailedResult?: string | Array<string>;
  isWhisper?: boolean;
  isDisadvantage?: boolean;
  secondRoll?: {
    result?: string | Array<string>;
    resultArray?: number | Array<number>;
    detailedResult?: string | Array<string>;
  };
  isAdvantage?: boolean;
  type?: ChatType;
  label?: string;
  labelSuffix?: string;

  // used for attacks; if you roll >= this, its a crit
  critRange?: number;
  // used for damage; if this is true, double any dice
  isCrit?: boolean;

  description?: string;
  descriptionLevel?: 'good' | 'bad';
  dc?: number;

  isFollowUp?: boolean;
  followUp?: Array<ChatEntryFollowUp>;
};

export interface ChatEntry extends ChatEntryInputs {
  playerName: string;
  result: string | Array<string>;
  type: ChatType;
}
