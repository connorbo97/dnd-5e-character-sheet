import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iUpdate } from 'utils/lodashUtils';

export const useInspiration = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { inspiration } = sheet;

  const onToggleInspiration = useCallback(() => {
    setSheet(iUpdate(sheet, 'inspiration', (prev) => !prev));
  }, [setSheet, sheet]);

  return { inspiration, onToggleInspiration };
};
