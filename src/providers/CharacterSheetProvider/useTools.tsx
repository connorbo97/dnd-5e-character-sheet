import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iUpdate } from 'utils/lodashUtils';

export const useTools = () => {
  const { setSheet, sheet } = useCharacterSheet();
  const { deathSaves } = sheet;

  const onToggleToolProficiency = useCallback(
    (tool) => {
      setSheet(
        iUpdate(sheet, `tools.${tool}`, (prev) => ({
          ...prev,
          proficient: !prev?.proficient,
        })),
      );
    },
    [setSheet, sheet],
  );

  return {
    deathSaves,
    onToggleToolProficiency,
  };
};
