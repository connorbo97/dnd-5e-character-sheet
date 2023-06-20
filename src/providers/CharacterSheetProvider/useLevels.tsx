import { values } from 'lodash';
import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useMemo } from 'react';

export const useLevels = () => {
  const { sheet } = useCharacterSheet();
  const { levels } = sheet;

  const totalLevels = useMemo(
    () => values(levels).reduce((acc, { total }) => acc + total, 0),
    [levels],
  );

  return { levels, totalLevels };
};
