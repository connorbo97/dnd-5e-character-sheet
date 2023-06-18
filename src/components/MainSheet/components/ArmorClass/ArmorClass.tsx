import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import styles from './armorClass.module.scss';
import { useMemo } from 'react';
import { STATS } from 'constants/stats';
import { calculateStaticRollable } from 'utils/rollableUtils';

export const ArmorClass = () => {
  const { inventory, getStatModifier, stats, profBonus } = useCharacterSheet();

  const basicAC = 10 + getStatModifier(STATS.DEX);

  const inventoryAC = useMemo(() => {
    const inventoryWithAC = inventory.filter((item) => item?.mods?.ac);
    const mappedACs = inventoryWithAC.map(({ label, mods }) => ({
      label,
      formula: mods?.ac,
      total: calculateStaticRollable(mods?.ac || [], {
        stats,
        spellcastingAbility: STATS.WIS,
        profBonus,
      }),
    }));

    return mappedACs.reduce(
      (acc, cur) => {
        const { total: curMax } = acc;
        const { total } = cur;

        if (total > curMax) {
          return cur;
        }

        return acc;
      },
      { total: 0, label: 'INVALID', formula: [] },
    );
  }, [inventory, profBonus, stats]);

  const max = Math.max(inventoryAC.total, basicAC);
  console.log(inventoryAC, basicAC);

  return (
    <div className={styles['container']}>
      <h5>AC: {max}</h5>
    </div>
  );
};