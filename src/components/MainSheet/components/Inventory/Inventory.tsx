import { Tag } from 'common/components/Tag/Tag';
import styles from './inventory.module.scss';
import { InventoryItem } from './InventoryItem';
import { useInventory } from 'providers/CharacterSheetProvider/useInventory';

export const Inventory = () => {
  const { inventory, totalWeight } = useInventory();

  return (
    <div className={styles['container']}>
      <h3>Inventory</h3>
      <div>
        <Tag value={totalWeight} label={'Total Weight'} />
      </div>
      <div className={styles['content']}>
        {inventory.map((item, index) => (
          <InventoryItem key={index} index={index} />
        ))}
      </div>
    </div>
  );
};
