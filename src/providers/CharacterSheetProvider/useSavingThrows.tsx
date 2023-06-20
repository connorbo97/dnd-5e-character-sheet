import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iUpdate } from 'utils/lodashUtils';

export const useSavingThrows = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { savingThrows } = sheet;

  const onToggleSavingThrowProficiency = useCallback(
    (stat) => {
      setSheet(
        iUpdate(sheet, `savingThrows.${stat}`, (prev) => ({
          ...prev,
          proficient: !prev?.proficient,
        })),
      );
    },
    [setSheet, sheet],
  );

  return {
    savingThrows,
    onToggleSavingThrowProficiency,
  };
};
