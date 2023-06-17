import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import styles from './inventory.module.scss';
import { Tag } from 'common/components/Tag/Tag';

export const Inventory = () => {
  const { inventory } = useCharacterSheet();

  return (
    <div className={styles['container']}>
      <h3>Inventory</h3>
      <div>
        {inventory.map(
          (
            {
              label,
              description,
              equipped,
              mods,
              source,
              total,
              useAsResource,
              weight,
            },
            index,
          ) => (
            <div key={index}>
              <h5>{label}</h5>
              <Tag label="description" value={description} />
              <Tag label="source" value={source} />
              <Tag label="equipped" value={equipped ? 'yes' : 'no'} />
              <Tag label="resource?" value={useAsResource ? 'yes' : 'no'} />
              <Tag label="total" value={total} />
              <Tag label="weight" value={weight} />
              <Tag label="total weight" value={total * weight} />
              <Tag label="ac mod" value={mods?.ac?.join(' + ')} />
            </div>
          ),
        )}
      </div>
    </div>
  );
};
