import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iUpdate } from 'utils/lodashUtils';

export const useCustomChecks = () => {
  const { setSheet, sheet } = useCharacterSheet();
  const { deathSaves } = sheet;

  const onToggleToolProficiency = useCallback(
    (tool) => {
      setSheet(iUpdate(sheet, `tools.${tool}.proficient`, (prev) => !prev));
    },
    [setSheet, sheet],
  );

  return {
    deathSaves,
    onToggleToolProficiency,
  };
};
