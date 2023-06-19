import {
  ROLLABLES,
  Rollable,
  RollableEntry,
  RollableUtilConfig,
  StaticRollable,
  StaticRollableEntry,
} from 'constants/rollable';
import { STATS } from 'constants/stats';
import { isNil, isNumber, sum } from 'lodash';
import { getModifier } from './statUtils';
import { DICE, DICE_VALUES_SET } from 'constants/dice';
import { DEFAULT_SHEET } from 'constants/characterSheet';

const DEFAULT_CONFIG = {
  stats: DEFAULT_SHEET.stats,
  profBonus: 0,
  spellcastingAbility: 'NONE',
};

export const getRandom = (n) => Math.floor(Math.random() * n);

export const calculateStaticRollableEntry = (
  entry: StaticRollableEntry,
  config?: RollableUtilConfig,
) => {
  const { stats, spellcastingAbility, profBonus } = config || DEFAULT_CONFIG;
  if (entry in STATS) {
    return getModifier(stats[entry]);
  }

  if (entry === ROLLABLES.SPELL) {
    return stats[spellcastingAbility]
      ? profBonus + stats[spellcastingAbility] + 8
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

export const isDiceRoll = (entry: RollableEntry) => {
  return (
    Array.isArray(entry) &&
    entry.length === 2 &&
    isNumber(entry[0]) &&
    DICE_VALUES_SET.has(entry[1])
  );
};

export const calculateRollableEntry = (
  entry: RollableEntry,
  config?: RollableUtilConfig,
  options?: {
    disableDiceParse?: boolean;
  },
) => {
  if (isDiceRoll(entry)) {
    return options?.disableDiceParse
      ? entry
      : (entry as [number, DICE]).join('');
  }

  return calculateStaticRollableEntry(entry as StaticRollableEntry, config);
};

export const calculateStaticRollable = (
  staticRollable: StaticRollable,
  { stats, spellcastingAbility, profBonus },
) => {
  return sum(
    staticRollable.map((e) =>
      calculateStaticRollableEntry(e, {
        stats,
        spellcastingAbility,
        profBonus,
      }),
    ),
  );
};

export const parseRollableArray = (
  rollable: Rollable,
  config?: RollableUtilConfig,
  options?: {
    disableDiceParse?: boolean;
  },
) => {
  return rollable.map((e) => calculateRollableEntry(e, config, options));
};

export const calculateRollable = (
  rollable: Rollable,
  config?: RollableUtilConfig,
) => {
  const parsed = parseRollableArray(rollable, config, {
    disableDiceParse: true,
  });

  return sum(parsed.map((p) => (isDiceRoll(p) ? p[0] * getRandom(p[1]) : p)));
};

export const printRollable = (
  rawInput: Array<RollableEntry | undefined | null>,
  config?: RollableUtilConfig,
) => {
  // @ts-ignore
  const input: Array<RollableEntry> = rawInput.filter((i) => !isNil(i));
  return input
    .map((i) => calculateRollableEntry(i, config))
    .map((val, i) => {
      if (i === 0) {
        return val;
      }

      const parsedVal = parseInt(val);

      if (parsedVal < 0) {
        return `- ${val}`;
      }
      return `+ ${val}`;
    })
    .join(' ');
};
