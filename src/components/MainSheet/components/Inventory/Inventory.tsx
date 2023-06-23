import styles from './inventory.module.scss';
import { InventoryItem } from './InventoryItem';
import { useInventory } from 'providers/CharacterSheetProvider/useInventory';

export const Inventory = () => {
  const { inventory } = useInventory();

  return (
    <div className={styles['container']}>
      <h3>Inventory</h3>
      <div className={styles['content']}>
        {inventory.map((item, index) => (
          <InventoryItem key={index} index={index} />
        ))}
      </div>
    </div>
  );
};
