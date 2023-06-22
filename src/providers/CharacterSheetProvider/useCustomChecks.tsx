import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iSet, iUpdate } from 'utils/lodashUtils';

export const useCustomChecks = () => {
  const { setSheet, sheet } = useCharacterSheet();
  const { customChecks } = sheet;

  const onToggleCustomCheckProficiencyByIndex = useCallback(
    (index) => {
      setSheet(
        iUpdate(sheet, `customChecks.${index}.proficient`, (prev) => !prev),
      );
    },
    [setSheet, sheet],
  );
  const onChangeCustomCheckStatByIndex = useCallback(
    (index, value) => {
      setSheet(iSet(sheet, `customChecks.${index}.stat`, value));
    },
    [setSheet, sheet],
  );
  const onChangeCustomCheckModByIndex = useCallback(
    (index, value) => {
      setSheet(
        iUpdate(sheet, `customChecks.${index}.mod`, (prev) => {
          return !isNaN(parseInt(value)) ? parseInt(value) : prev;
        }),
      );
    },
    [setSheet, sheet],
  );

  return {
    customChecks,
    onToggleCustomCheckProficiencyByIndex,
    onChangeCustomCheckStatByIndex,
    onChangeCustomCheckModByIndex,
  };
};
