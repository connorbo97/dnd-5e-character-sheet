import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iSet } from 'utils/lodashUtils';

export const useHp = () => {
  const { setSheet, sheet } = useCharacterSheet();
  const { curHp, tempMaxHp, tempHp } = sheet;

  const onChangeCurHp = useCallback(
    (val) => {
      setSheet(iSet(sheet, 'curHp', val));
    },
    [setSheet, sheet],
  );

  const onChangeTempHp = useCallback(
    (val) => {
      setSheet(iSet(sheet, 'tempHp', val));
    },
    [setSheet, sheet],
  );

  const onChangeTempMaxHp = useCallback(
    (val, totalHp) => {
      setSheet(iSet(sheet, 'tempMaxHp', val));

      if (curHp > totalHp + val) {
        onChangeCurHp(totalHp + val);
      }
    },
    [curHp, onChangeCurHp, setSheet, sheet],
  );

  return {
    curHp,
    tempHp,
    tempMaxHp,
    onChangeCurHp,
    onChangeTempHp,
    onChangeTempMaxHp,
  };
};
