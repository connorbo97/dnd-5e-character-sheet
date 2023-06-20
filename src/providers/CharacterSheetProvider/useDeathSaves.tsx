import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iUpdate } from 'utils/lodashUtils';

export const useDeathSaves = () => {
  const { setSheet, sheet } = useCharacterSheet();
  const { deathSaves } = sheet;

  const updateDeathSaves = useCallback(
    (update, index, isSuccess) => {
      setSheet((prevSheet) =>
        iUpdate(
          prevSheet,
          `deathSaves.${isSuccess ? 'successes' : 'failures'}.${index}`,
          update,
        ),
      );
    },
    [setSheet],
  );

  const onToggleDeathSaveByIndex = (index, isSuccess = false) => {
    updateDeathSaves((prev) => !prev, index, isSuccess);
  };

  const onDeathSaveSuccess = (n = 1) => {
    let numSuccessesAdded = 0;

    for (let i = 0; i < 3; i++) {
      if (!deathSaves.successes[i]) {
        onToggleDeathSaveByIndex(i, true);
        numSuccessesAdded += 1;

        if (numSuccessesAdded === n) {
          break;
        }
      }
    }
  };

  const onDeathSaveFailure = (n = 1) => {
    let numFailuresAdded = 0;
    for (let i = 0; i < 3; i++) {
      if (!deathSaves.failures[i]) {
        onToggleDeathSaveByIndex(i, false);
        numFailuresAdded += 1;

        if (numFailuresAdded === n) {
          break;
        }
      }
    }
  };
  return {
    deathSaves,
    onToggleDeathSaveByIndex,
    onDeathSaveFailure,
    onDeathSaveSuccess,
  };
};
