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

  const onChangeAttackPropertyByIndex = (index, property, value) => {
    setSheet((prevSheet) =>
      iSet(prevSheet, `attacks.${index}.attack.${property}`, value),
    );
  };

  const onChangeAttackStatByIndex = (index, value) => {
    onChangeAttackPropertyByIndex(index, 'stat', value);
  };
  const onChangeAttackModByIndex = (index, value) => {
    onChangeAttackPropertyByIndex(index, 'mod.value', value);
  };
  const onToggleAttackProficiencyByIndex = (index) => {
    setSheet((prevSheet) =>
      iUpdate(
        prevSheet,
        ['attacks', index, 'attack', 'proficient'],
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

    onChangeAttackStatByIndex,
    onChangeAttackModByIndex,
    onToggleAttackProficiencyByIndex,

    onChangeAttackDescriptionByIndex,
    onChangeAttackSourceByIndex,
  };
};
