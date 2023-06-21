import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iSet, iUpdate } from 'utils/lodashUtils';

export const useAttacks = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { attacks } = sheet;

  const onToggleIsEnabled = (attackIndex, path) => {
    setSheet((prevSheet) =>
      iUpdate(
        prevSheet,
        `attacks.${attackIndex}.${path}.isEnabled`,
        (prev) => !prev,
      ),
    );
  };

  const onChangeAttackDescriptionByIndex = useCallback(
    (index, val) => {
      setSheet((prevSheet) =>
        iSet(prevSheet, ['attacks', index, 'description'], val),
      );
    },
    [setSheet],
  );

  const onChangeAttackSourceByIndex = useCallback(
    (index, val) => {
      setSheet((prevSheet) =>
        iSet(prevSheet, ['attacks', index, 'source'], val),
      );
    },
    [setSheet],
  );

  return {
    attacks,
    onToggleIsEnabled,
    onChangeAttackDescriptionByIndex,
    onChangeAttackSourceByIndex,
  };
};
