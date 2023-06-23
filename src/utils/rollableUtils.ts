import {
  DiceRoll,
  ROLLABLES,
  Rollable,
  RollableEntry,
  RollableUtilConfig,
  StaticRollable,
  StaticRollableEntry,
  OPERATORS,
  OPERATORS_SET,
  ROLLABLES_SET,
} from 'constants/rollable';
import { STATS, STATS_SET } from 'constants/stats';
import { isNil, isNumber, partition, sum } from 'lodash';
import { getModifier } from './statUtils';
import { DICE, DICE_VALUES_SET } from 'constants/dice';
import { DEFAULT_SHEET } from 'constants/characterSheet';
import { getDiceMax } from './diceUtils';
import { getNumMatches } from './stringUtils';

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
      ? getModifier(stats[spellcastingAbility])
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

export const printNonParsedRollable = (rawInput: Array<RollableEntry>) => {
  return rawInput
    .map((val, i) => {
      let stringVal = val + '';
      let parsedVal;
      let isNumberVal = false;

      if (isDiceRoll(val)) {
        parsedVal = (val as DiceRoll).join('');
      } else if (isStringDiceRoll(stringVal)) {
        parsedVal = val;
      } else {
        const numberVal = parseInt(stringVal);
        isNumberVal = isNumber(parsedVal) && !isNaN(parsedVal) && parsedVal < 0;
        parsedVal = isNumberVal ? numberVal : val;
      }

      if (i === 0) {
        return parsedVal;
      }

      if (isNumberVal && parsedVal < 0) {
        return `- ${Math.abs(parsedVal)}`;
      }

      return `+ ${parsedVal}`;
    })
    .join(' ');
};
export const printParsedRollable = (
  rawInput: Array<string | number | DiceRoll>,
) => {
  return rawInput
    .map((val, i) => {
      if (i === 0) {
        return val;
      }

      const parsedVal = isDiceRoll(val)
        ? (val as DiceRoll).join('')
        : parseInt(val + '');

      if (isNumber(parsedVal) && !isNaN(parsedVal) && parsedVal < 0) {
        return `- ${Math.abs(parsedVal)}`;
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

export const generateRollableFromString = (input) => {
  if (isNil(input)) {
    return [];
  }

  const pieces: Array<string> = input.trim().split(/\s+/);

  let curOperator: string = OPERATORS.PLUS;
  // get(pieces, '0.0') === OPERATORS.MINUS ? OPERATORS.MINUS : ;
  let finalPieces: Rollable = [];

  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i];

    if (!piece) {
      throw new Error(`empty piece encountered: ${piece}`);
    }

    // if there's no operator
    if (!curOperator) {
      // and the piece isn't an operator, then invalid
      if (!OPERATORS_SET.has(piece as OPERATORS)) {
        throw new Error(`piece should be operator: ${piece}`);
      }

      curOperator = piece;
      continue;
    }

    const pieceAsNumber = parseInt(piece);
    const pieceIsNumber =
      getNumMatches(piece, /[-0-9]/g) === piece.length && !isNaN(pieceAsNumber);
    const pieceAsDice = parseStringDiceRoll(piece);
    const isValidRollableString =
      STATS_SET.has(piece as STATS) || ROLLABLES_SET.has(piece as ROLLABLES);
    if (curOperator === OPERATORS.MINUS) {
      if (pieceIsNumber) {
        finalPieces.push(-1 * pieceAsNumber);
      } else {
        throw new Error(`piece has negative but is not a number: ${piece}`);
      }
    } else if (pieceIsNumber) {
      finalPieces.push(pieceAsNumber);
    } else if (pieceAsDice !== null) {
      finalPieces.push(pieceAsDice);
    } else if (isValidRollableString) {
      finalPieces.push(piece as RollableEntry);
    } else {
      throw new Error(`piece is not a number, dice, or rollable: ${piece}`);
    }

    curOperator = '';
  }

  return finalPieces;
};

export const isStringDiceRoll = (entry: string) =>
  parseStringDiceRoll(entry) === null;
export const parseStringDiceRoll = (entry: string) => {
  if (isNil(entry)) {
    return null;
  }

  const [rawTotal, diceFace] = entry.split('d');
  const total = parseInt(rawTotal);
  const dice = `d${diceFace}`;

  if (!DICE_VALUES_SET.has(dice as DICE)) {
    return null;
  }

  if (isNaN(total) || total < 0 || total.toString() !== rawTotal) {
    return null;
  }

  const result: DiceRoll = [total, dice as DICE];

  return result;
};
