import { CharacterSheet } from 'constants/characterSheet';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { noop } from 'lodash';
import { iSet, iUpdate } from 'utils/lodashUtils';

type CharacterSheetContextValue = {
  sheet: CharacterSheet;
  setSheet: Function;
};
const initialSheet = {
  name: 'Placeholder',
  profBonus: 2,
  stats: {
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10,
  },
  skills: {},
  savingThrows: {},
};
const initialState: CharacterSheetContextValue = {
  sheet: initialSheet,
  setSheet: noop,
};

const CharacterSheetContext = createContext(initialState);

export const CharacterSheetProvider = ({ ...rest }) => {
  const [sheet, setSheet] = useState(initialSheet);

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
  const { name, stats, skills, savingThrows, profBonus } = sheet;

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

  return {
    sheet,
    setSheet,

    name,
    onChangeName,

    profBonus,
    onChangeProfBonus,

    stats,
    onChangeStat,

    skills,
    onChangeSkill,
    onToggleSkillProficiency,

    savingThrows,
    onToggleSavingThrowProficiency,
  };
};
