import styles from './inventoryItem.module.scss';
import { Tag } from 'common/components/Tag/Tag';
import { CollapsibleCard } from 'common/components/CollapsibleCard/CollapsibleCard';

export const InventoryItem = (props: any) => {
  const {
    label,
    description,
    equipped,
    mods,
    source,
    total,
    useAsResource,
    weight,
  } = props;

  return (
    <div className={styles['container']}>
      <CollapsibleCard header={label} contentClassName={styles['content']}>
        <Tag label="description" value={description} />
        <Tag label="source" value={source} />
        <Tag label="equipped" value={equipped ? 'yes' : 'no'} />
        <Tag label="resource?" value={useAsResource ? 'yes' : 'no'} />
        <Tag label="total" value={total} />
        <Tag label="weight" value={weight} />
        <Tag label="total weight" value={total * weight} />
        <Tag label="ac mod" value={mods?.ac?.join(' + ')} />
      </CollapsibleCard>
    </div>
  );
};
