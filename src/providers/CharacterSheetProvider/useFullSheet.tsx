import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useDeathSaves } from './useDeathSaves';
import { useHitDice } from './useHitDice';
import { useHp } from './useHp';
import { useInspiration } from './useInspiration';
import { useSavingThrows } from './useSavingThrows';
import { useSkills } from './useSkills';
import { useCustomChecks } from './useCustomChecks';
import { useProfBonus } from './useProfBonus';
import { useName } from './useName';
import { useStats } from './useStats';
import { useRollableConfig } from './useRollableConfig';
import { useLevels } from './useLevels';
import { useAttacks } from './useAttacks';
import { useMoney } from './useMoney';
import { useInventory } from './useInventory';
import { useAdvantageToggle } from './useAdvantageToggle';
import { useWhisperToggle } from './useWhisperToggle';
import { useEffect } from 'react';
import { CHARACTER_SHEET_KEY } from 'constants/localStorage';
import { useResources } from './useResources';

export const useFullSheet = () => {
  const { sheet } = useCharacterSheet();
  const deathSavesHook = useDeathSaves();
  const skillsHook = useSkills();
  const inspirationHook = useInspiration();
  const savingThrowsHook = useSavingThrows();
  const customChecksHook = useCustomChecks();
  const hpHook = useHp();
  const hitDiceHook = useHitDice();
  const profBonusHook = useProfBonus();
  const nameHook = useName();
  const statsHook = useStats();
  const rollableConfigHook = useRollableConfig();
  const levelsHook = useLevels();
  const attacksHook = useAttacks();
  const moneyHook = useMoney();
  const inventoryHook = useInventory();
  const advantageToggle = useAdvantageToggle();
  const whisperToggle = useWhisperToggle();
  const resourcesHook = useResources();

  useEffect(() => {
    localStorage.setItem(CHARACTER_SHEET_KEY, JSON.stringify(sheet));
  }, [sheet]);

  return {
    ...sheet,
    ...deathSavesHook,
    ...skillsHook,
    ...inspirationHook,
    ...savingThrowsHook,
    ...customChecksHook,
    ...hpHook,
    ...hitDiceHook,
    ...profBonusHook,
    ...nameHook,
    ...statsHook,
    ...rollableConfigHook,
    ...levelsHook,
    ...attacksHook,
    ...moneyHook,
    ...inventoryHook,
    ...advantageToggle,
    ...whisperToggle,
    ...resourcesHook,
  };
};
