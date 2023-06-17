import { DEFAULT_SHEET } from 'constants/characterSheet';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { noop } from 'lodash';
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
  const { stats } = sheet;

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

  return {
    sheet,
    setSheet,

    ...sheet,
    getStatModifier,

    onChangeName,

    onChangeProfBonus,

    onChangeStat,

    onChangeSkill,
    onToggleSkillProficiency,

    onToggleSavingThrowProficiency,

    onToggleToolProficiency,

    onToggleDeathSaveByIndex,

    onChangeHitDiceTotalByType,
  };
};
