import { useFullSheet } from 'providers/CharacterSheetProvider/useFullSheet';
import styles from './inventory.module.scss';
import { InventoryItem } from './InventoryItem';

export const Inventory = () => {
  const { inventory } = useFullSheet();

  return (
    <div className={styles['container']}>
      <h3>Inventory</h3>
      <div className={styles['content']}>
        {inventory.map((item, index) => (
          <InventoryItem {...item} key={index} />
        ))}
      </div>
    </div>
  );
};
