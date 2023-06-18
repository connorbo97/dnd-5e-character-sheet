import { DEFAULT_SHEET } from 'constants/characterSheet';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { noop, values } from 'lodash';
import { iSet, iUpdate } from 'utils/lodashUtils';
import { getModifier } from 'utils/statUtils';

const CharacterSheetContext = createContext({
  sheet: DEFAULT_SHEET,
  setSheet: noop,
});

export const CharacterSheetProvider = ({ ...rest }) => {
  const [sheet, setSheet] = useState(DEFAULT_SHEET);

  const value = useMemo(
    () => ({
      sheet,
      setSheet,
    }),
    [sheet],
  );
  return <CharacterSheetContext.Provider value={value} {...rest} />;
};

export const useCharacterSheet = () => {
  const { sheet, setSheet } = useContext(CharacterSheetContext);
  const { stats, levels, curHp } = sheet;

  const onChangeProfBonus = useCallback(
    (val) => {
      setSheet(iSet(sheet, 'profBonus', val));
    },
    [setSheet, sheet],
  );

  const onChangeName = useCallback(
    (val) => {
      setSheet(iSet(sheet, 'name', val));
    },
    [setSheet, sheet],
  );

  const onChangeStat = useCallback(
    (val, stat) => {
      setSheet(iSet(sheet, `stats.${stat}`, val));
    },
    [setSheet, sheet],
  );

  const onChangeSkill = useCallback(
    (newVal, skill) => {
      setSheet(iSet(sheet, `skills.${skill}`, newVal));
    },
    [setSheet, sheet],
  );

  const onToggleInspiration = useCallback(() => {
    setSheet(iUpdate(sheet, 'inspiration', (prev) => !prev));
  }, [setSheet, sheet]);

  const onToggleSkillProficiency = useCallback(
    (skill) => {
      setSheet(
        iUpdate(sheet, `skills.${skill}`, (prev) => ({
          ...prev,
          proficient: !prev?.proficient,
        })),
      );
    },
    [setSheet, sheet],
  );

  const onToggleSavingThrowProficiency = useCallback(
    (stat) => {
      setSheet(
        iUpdate(sheet, `savingThrows.${stat}`, (prev) => ({
          ...prev,
          proficient: !prev?.proficient,
        })),
      );
    },
    [setSheet, sheet],
  );

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

  const getStatModifier = useCallback(
    (stat) => {
      if (!stat) {
        return 0;
      }
      return getModifier(stats[stat]);
    },
    [stats],
  );

  const onToggleDeathSaveByIndex = (index, isSuccess = false) => {
    setSheet(
      iUpdate(
        sheet,
        `deathSaves.${isSuccess ? 'successes' : 'failures'}.${index}`,
        (prev) => !prev,
      ),
    );
  };

  const onChangeHitDiceTotalByType = (diceType, newTotal) => {
    setSheet(iSet(sheet, `hitDice.${diceType}.total`, newTotal));
  };

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

  const totalLevels = useMemo(
    () => values(levels).reduce((acc, { total }) => acc + total, 0),
    [levels],
  );

  return {
    sheet,
    setSheet,

    ...sheet,
    totalLevels,

    getStatModifier,

    onChangeName,

    onToggleInspiration,

    onChangeProfBonus,

    onChangeStat,

    onChangeCurHp,
    onChangeTempHp,
    onChangeTempMaxHp,

    onChangeSkill,
    onToggleSkillProficiency,

    onToggleSavingThrowProficiency,

    onToggleToolProficiency,

    onToggleDeathSaveByIndex,

    onChangeHitDiceTotalByType,
  };
};
