import {
  ROLLABLES,
  StaticRollable,
  StaticRollableEntry,
} from 'constants/rollable';
import { STATS } from 'constants/stats';
import { isNumber, sum } from 'lodash';
import { getModifier } from './statUtils';

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
