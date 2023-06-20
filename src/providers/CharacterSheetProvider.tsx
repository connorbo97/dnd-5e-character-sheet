import { DEFAULT_SHEET } from 'constants/characterSheet';
import { createContext, useContext, useMemo, useState } from 'react';
import { noop } from 'lodash';

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

  return {
    sheet,
    setSheet,
  };
};
