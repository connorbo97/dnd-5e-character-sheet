import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iSet } from 'utils/lodashUtils';

export const useResources = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { resources } = sheet;

  const onChangeResourcePropertyByIndex = useCallback(
    (index, path, value) => {
      setSheet((prevSheet) =>
        iSet(prevSheet, `resources.${index}.${path}`, value),
      );
    },
    [setSheet],
  );

  const onChangeResourceTotalByIndex = (index, value) => {
    onChangeResourcePropertyByIndex(index, 'total', value);
  };

  const onChangeResourceMaxByIndex = (index, value) => {
    onChangeResourcePropertyByIndex(index, 'max', value);
  };

  return {
    resources,
    onChangeResourcePropertyByIndex,
    onChangeResourceTotalByIndex,
    onChangeResourceMaxByIndex,
  };
};
