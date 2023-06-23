import { WHISPER_TOGGLE } from 'constants/whisperToggle';
import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback, useMemo } from 'react';
import { iSet } from 'utils/lodashUtils';

export const useWhisperToggle = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { whisperToggle } = sheet;

  const isWhispering = useMemo(
    () => whisperToggle === WHISPER_TOGGLE.GM,
    [whisperToggle],
  );

  const onChangeWhisperToggle = useCallback(
    (value) => {
      setSheet((prevSheet) => iSet(prevSheet, 'whisperToggle', value));
    },
    [setSheet],
  );

  return { whisperToggle, isWhispering, onChangeWhisperToggle };
};
