import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iSet } from 'utils/lodashUtils';

export const useWhisperToggle = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { whisperToggle } = sheet;

  const onChangeWhisperToggle = useCallback(
    (value) => {
      setSheet((prevSheet) => iSet(prevSheet, 'whisperToggle', value));
    },
    [setSheet],
  );

  return { whisperToggle, onChangeWhisperToggle };
};
