import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useDeathSaves } from './useDeathSaves';
import { useHitDice } from './useHitDice';
import { useHp } from './useHp';
import { useInspiration } from './useInspiration';
import { useSavingThrows } from './useSavingThrows';
import { useSkills } from './useSkills';
import { useTools } from './useTools';
import { useProfBonus } from './useProfBonus';
import { useName } from './useName';
import { useStats } from './useStats';
import { useRollableConfig } from './useRollableConfig';
import { useLevels } from './useLevels';

export const useFullSheet = () => {
  const { sheet } = useCharacterSheet();
  const deathSavesHook = useDeathSaves();
  const skillsHook = useSkills();
  const inspirationHook = useInspiration();
  const savingThrowsHook = useSavingThrows();
  const toolsHook = useTools();
  const hpHook = useHp();
  const hitDiceHook = useHitDice();
  const profBonusHook = useProfBonus();
  const nameHook = useName();
  const statsHook = useStats();
  const rollableConfigHook = useRollableConfig();
  const levelsHook = useLevels();

  return {
    ...sheet,
    ...deathSavesHook,
    ...skillsHook,
    ...inspirationHook,
    ...savingThrowsHook,
    ...toolsHook,
    ...hpHook,
    ...hitDiceHook,
    ...profBonusHook,
    ...nameHook,
    ...statsHook,
    ...rollableConfigHook,
    ...levelsHook,
  };
};
