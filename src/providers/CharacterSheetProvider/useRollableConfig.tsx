import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useMemo } from 'react';

export const useRollableConfig = () => {
  const { sheet } = useCharacterSheet();
  const { stats, spellcastingAbility, profBonus } = sheet;

  const rollableConfig = useMemo(
    () => ({
      stats,
      spellcastingAbility,
      profBonus,
    }),
    [profBonus, spellcastingAbility, stats],
  );

  return { rollableConfig };
};
