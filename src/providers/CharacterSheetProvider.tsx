import { DEFAULT_SHEET } from 'constants/characterSheet';
import { createContext, useContext, useMemo, useState } from 'react';
import { noop } from 'lodash';
import { CHARACTER_SHEET_KEY } from 'constants/localStorage';

const CharacterSheetContext = createContext({
  sheet: DEFAULT_SHEET,
  setSheet: noop,
});

export const CharacterSheetProvider = ({ ...rest }) => {
  const initialData = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(CHARACTER_SHEET_KEY) || '');
    } catch (err) {
      return DEFAULT_SHEET;
    }
  }, []);
  const [sheet, setSheet] = useState(initialData);

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

  return {
    sheet,
    setSheet,
  };
};
