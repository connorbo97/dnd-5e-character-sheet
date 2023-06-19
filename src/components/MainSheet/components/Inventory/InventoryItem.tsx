import Collapsible from 'react-collapsible';
import styles from './inventoryItem.module.scss';
import { Tag } from 'common/components/Tag/Tag';

import classnames from 'classnames/bind';
import { useState } from 'react';

const classNameBuilder = classnames.bind(styles);

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
    index,
  } = props;
  const [open, setOpen] = useState(false);
  return (
    <div className={styles['container']}>
      <Collapsible
        open={open}
        handleTriggerClick={() => setOpen((prev) => !prev)}
        transitionTime={1}
        trigger={
          <div className={classNameBuilder('header', { open })}>
            <div className={styles['label']}>{label}</div>
            <div className={styles['caret']}>v</div>
          </div>
        }>
        <div key={index} className={styles['content']}>
          <Tag label="description" value={description} />
          <Tag label="source" value={source} />
          <Tag label="equipped" value={equipped ? 'yes' : 'no'} />
          <Tag label="resource?" value={useAsResource ? 'yes' : 'no'} />
          <Tag label="total" value={total} />
          <Tag label="weight" value={weight} />
          <Tag label="total weight" value={total * weight} />
          <Tag label="ac mod" value={mods?.ac?.join(' + ')} />
        </div>
      </Collapsible>
    </div>
  );
};
