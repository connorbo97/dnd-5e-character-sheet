import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iSet } from 'utils/lodashUtils';

export const useHitDice = () => {
  const { setSheet, sheet } = useCharacterSheet();
  const { deathSaves } = sheet;

  const onChangeHitDiceTotalByType = useCallback(
    (diceType, newTotal) => {
      setSheet(iSet(sheet, `hitDice.${diceType}.total`, newTotal));
    },
    [setSheet, sheet],
  );

  return {
    deathSaves,
    onChangeHitDiceTotalByType,
  };
};
