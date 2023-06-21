import {
  DiceRoll,
  ROLLABLES,
  Rollable,
  RollableEntry,
  RollableUtilConfig,
  StaticRollable,
  StaticRollableEntry,
} from 'constants/rollable';
import { STATS } from 'constants/stats';
import { isNil, isNumber, partition, sum } from 'lodash';
import { getModifier } from './statUtils';
import { DICE, DICE_VALUES_SET } from 'constants/dice';
import { DEFAULT_SHEET } from 'constants/characterSheet';
import { getDiceMax } from './diceUtils';

const DEFAULT_CONFIG = {
  stats: DEFAULT_SHEET.stats,
  profBonus: 0,
  spellcastingAbility: 'NONE',
};

export const getRandom = (n, { baseNum = 0 } = {}) =>
  Math.floor(Math.random() * n) + baseNum;

export const getRollableDice = (dice: DICE, n: number = 1): [number, DICE] => {
  return [n, dice];
};
export const D20_DICE = getRollableDice(DICE.d20, 1);

export const parseStaticRollableEntry = (
  entry: StaticRollableEntry,
  config: RollableUtilConfig,
): number | string => {
  const { stats, spellcastingAbility, profBonus } = config || DEFAULT_CONFIG;
  if (entry in STATS) {
    return getModifier(stats[entry]);
  }

  if (entry === ROLLABLES.SPELL) {
    return stats[spellcastingAbility]
      ? profBonus + getModifier(stats[spellcastingAbility])
      : 0;
  }

  if (entry === ROLLABLES.PB) {
    return profBonus;
  }

  if (isNumber(entry)) {
    return entry;
  }

  return 0;
};

export const isDiceRoll = (entry: RollableEntry | string) => {
  return (
    Array.isArray(entry) &&
    entry.length === 2 &&
    isNumber(entry[0]) &&
    DICE_VALUES_SET.has(entry[1])
  );
};

export const parseRollableEntry = (
  entry: RollableEntry,
  config: RollableUtilConfig,
  options?: {
    disableDiceParse?: boolean;
    shouldDoubleDice?: boolean;
  },
): string | number | DiceRoll => {
  if (isDiceRoll(entry)) {
    const newDice: DiceRoll = options?.shouldDoubleDice
      ? [entry[0] * 2, entry[1]]
      : (entry as DiceRoll);
    return options?.disableDiceParse ? (newDice as DiceRoll) : newDice.join('');
  }

  return parseStaticRollableEntry(entry as StaticRollableEntry, config);
};

export const parseStaticRollable = (
  staticRollable: StaticRollable,
  config: RollableUtilConfig,
) => {
  const { stats, spellcastingAbility, profBonus } = config;

  return sum(
    staticRollable.map((e) =>
      parseStaticRollableEntry(e, {
        stats,
        spellcastingAbility,
        profBonus,
      }),
    ),
  );
};

export const parseRollable = (
  rollable: Rollable,
  config: RollableUtilConfig,
  options?: {
    disableDiceParse?: boolean;
    shouldDoubleDice?: boolean;
  },
): Array<number | string | DiceRoll> => {
  return rollable.map((e) => parseRollableEntry(e, config, options));
};

export const simplifyRollable = (
  roll: Rollable,
  config: RollableUtilConfig,
  options?: {
    disableDiceParse?: boolean;
    shouldDoubleDice?: boolean;
  },
) => {
  const parsed = parseRollable(roll, config, options);
  const [dice, numbers] = partition(parsed, (p) => !isNumber(p));
  const numbersArr = numbers.length ? [sum(numbers)] : numbers;

  return [...dice, ...numbersArr];
};

export const calculateRollable = (
  rollable: Rollable,
  config: RollableUtilConfig,
  options?: {
    shouldDoubleDice?: boolean;
  },
) => {
  const parsed = parseRollable(rollable, config, {
    ...options,
    disableDiceParse: true,
  });

  return sum(
    parsed.map((p) =>
      isDiceRoll(p) ? p[0] * getRandom(getDiceMax(p[1]), { baseNum: 1 }) : p,
    ),
  );
};

export const printParsedRollable = (rawInput: Array<string | number>) => {
  return rawInput
    .map((val, i) => {
      if (i === 0) {
        return val;
      }

      const parsedVal = parseInt(val + '');

      if (!isNaN(parsedVal) && parsedVal < 0) {
        return `- ${val}`;
      }

      return `+ ${val}`;
    })
    .join(' ');
};

export const printRollable = (
  rawInput: Array<RollableEntry | undefined | null>,
  config: RollableUtilConfig,
) => {
  // @ts-ignore
  const input: Array<RollableEntry> = rawInput.filter((i) => !isNil(i));

  return printParsedRollable(parseRollable(input, config));
};
