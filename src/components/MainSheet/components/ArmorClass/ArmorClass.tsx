import { useFullSheet } from 'providers/CharacterSheetProvider/useFullSheet';
import styles from './armorClass.module.scss';
import { useMemo } from 'react';
import { STATS } from 'constants/stats';
import { parseStaticRollable } from 'utils/rollableUtils';
import { Tag } from 'common/components/Tag/Tag';

export const ArmorClass = () => {
  const { inventory, getStatModifier, stats, profBonus } = useFullSheet();

  const basicAC = 10 + getStatModifier(STATS.DEX);

  const inventoryAC = useMemo(() => {
    const inventoryWithAC = inventory.filter((item) => item?.mods?.ac);
    const mappedACs = inventoryWithAC.map(({ label, mods }) => ({
      label,
      formula: mods?.ac,
      total: parseStaticRollable(mods?.ac || [], {
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

  return (
    <div className={styles['container']}>
      <Tag label="AC" value={max} />
    </div>
  );
};
