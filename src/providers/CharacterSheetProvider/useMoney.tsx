import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iSet } from 'utils/lodashUtils';

export const useMoney = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { money } = sheet;

  const onChangeMoneyByType = useCallback(
    (type, value) => {
      setSheet((prevSheet) => iSet(prevSheet, `money.${type}`, value));
    },
    [setSheet],
  );

  return { money, onChangeMoneyByType };
};
