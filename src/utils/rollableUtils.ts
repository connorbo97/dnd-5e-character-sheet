import {
  ROLLABLES,
  Rollable,
  RollableEntry,
  StaticRollable,
  StaticRollableEntry,
} from 'constants/rollable';
import { STATS } from 'constants/stats';
import { isNumber, sum } from 'lodash';
import { getModifier } from './statUtils';
import { DICE, DICE_VALUES_SET } from 'constants/dice';

export const calculateStaticRollableEntry = (
  entry: StaticRollableEntry,
  { stats, spellcastingAbility, profBonus },
) => {
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
  { stats, spellcastingAbility, profBonus },
) => {
  if (isDiceRoll(entry)) {
    return (entry as [number, DICE]).join('');
  }

  return calculateStaticRollableEntry(entry as StaticRollableEntry, {
    stats,
    spellcastingAbility,
    profBonus,
  });
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

export const calculateRollable = (
  rollable: Rollable,
  { stats, spellcastingAbility, profBonus },
) => {
  return sum(
    rollable.map((e) =>
      calculateRollableEntry(e, {
        stats,
        spellcastingAbility,
        profBonus,
      }),
    ),
  );
};
