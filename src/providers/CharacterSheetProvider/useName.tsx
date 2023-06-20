import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iSet } from 'utils/lodashUtils';

export const useName = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { name } = sheet;

  const onChangeName = useCallback(
    (val) => {
      setSheet(iSet(sheet, 'name', val));
    },
    [setSheet, sheet],
  );

  return { name, onChangeName };
};
