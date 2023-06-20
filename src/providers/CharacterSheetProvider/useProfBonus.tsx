import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iSet } from 'utils/lodashUtils';

export const useProfBonus = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { profBonus } = sheet;

  const onChangeProfBonus = useCallback(
    (val) => {
      setSheet(iSet(sheet, 'profBonus', val));
    },
    [setSheet, sheet],
  );

  return { profBonus, onChangeProfBonus };
};
