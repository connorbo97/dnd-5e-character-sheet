import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iSet } from 'utils/lodashUtils';

export const useAdvantageToggle = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { advantageToggle } = sheet;

  const onChangeAdvantageToggle = useCallback(
    (value) => {
      setSheet((prevSheet) => iSet(prevSheet, 'advantageToggle', value));
    },
    [setSheet],
  );

  return { advantageToggle, onChangeAdvantageToggle };
};
