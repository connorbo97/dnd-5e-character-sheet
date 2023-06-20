import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iSet } from 'utils/lodashUtils';
import { getModifier } from 'utils/statUtils';

export const useStats = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { stats } = sheet;

  const onChangeStat = useCallback(
    (val, stat) => {
      setSheet(iSet(sheet, `stats.${stat}`, val));
    },
    [setSheet, sheet],
  );

  const getStatModifier = useCallback(
    (stat) => {
      if (!stat) {
        return 0;
      }
      return getModifier(stats[stat]);
    },
    [stats],
  );

  return { stats, onChangeStat, getStatModifier };
};
