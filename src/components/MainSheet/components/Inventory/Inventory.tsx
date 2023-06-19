import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import styles from './inventory.module.scss';
import { InventoryItem } from './InventoryItem';

export const Inventory = () => {
  const { inventory } = useCharacterSheet();

  return (
    <div className={styles['container']}>
      <h3>Inventory</h3>
      <div className={styles['content']}>
        {inventory.map((item, index) => (
          <InventoryItem {...item} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};
