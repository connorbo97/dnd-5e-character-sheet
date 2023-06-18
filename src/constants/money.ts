export enum MONEY {
  COPPER = 'COPPER',
  SILVER = 'SILVER',
  ELECTRUM = 'ELECTRUM',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}

type MoneyConfig = {
  label: string;
  shortLabel: string;
};
export const MONEY_CONFIGS: { [s in MONEY]: MoneyConfig } = {
  COPPER: {
    label: 'Copper',
    shortLabel: 'CP',
  },
  SILVER: {
    label: 'Silver',
    shortLabel: 'SP',
  },
  ELECTRUM: {
    label: 'Electrum',
    shortLabel: 'EP',
  },
  GOLD: {
    label: 'Gold',
    shortLabel: 'GP',
  },
  PLATINUM: {
    label: 'Platinum',
    shortLabel: 'PP',
  },
};
