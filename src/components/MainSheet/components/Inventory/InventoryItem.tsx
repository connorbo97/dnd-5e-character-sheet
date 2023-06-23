import styles from './inventoryItem.module.scss';
import { Tag } from 'common/components/Tag/Tag';
import { CollapsibleCard } from 'common/components/CollapsibleCard/CollapsibleCard';
import { useInventory } from 'providers/CharacterSheetProvider/useInventory';
import { BooleanButton } from 'common/components/ProficiencyButton/BooleanButton';
import { useMemo } from 'react';
import { printNonParsedRollable } from 'utils/rollableUtils';
import { DelayedInput } from 'common/components/DelayedInput/DelayedInput';

export const InventoryItem = ({ index }) => {
  const {
    inventory,

    onToggleInventoryEquippedByIndex,
    onToggleInventoryUseAsResourceByIndex,

    onChangeInventoryLabelByIndex,
    onChangeInventoryDescriptionByIndex,
    onChangeInventorySourceByIndex,
    onChangeInventoryTotalByIndex,
    onChangeInventoryWeightByIndex,
    onChangeInventoryACByIndex,
  } = useInventory();

  const {
    label,
    description,
    equipped,
    mods,
    source,
    total,
    useAsResource,
    weight,
  } = inventory[index];

  const acMod = useMemo(
    () => printNonParsedRollable(mods?.ac || []),
    [mods?.ac],
  );

  return (
    <div className={styles['container']}>
      <CollapsibleCard header={label} contentClassName={styles['content']}>
        <input
          className={styles['label-input']}
          value={label}
          onChange={(e) => onChangeInventoryLabelByIndex(index, e.target.value)}
        />
        <Tag
          label="description"
          value={
            <input
              className={styles['input']}
              value={description}
              onChange={(e) =>
                onChangeInventoryDescriptionByIndex(index, e.target.value)
              }
            />
          }
        />
        <Tag
          label="source"
          value={
            <input
              className={styles['input']}
              value={source}
              onChange={(e) =>
                onChangeInventorySourceByIndex(index, e.target.value)
              }
            />
          }
        />
        <Tag
          label="equipped"
          value={
            <BooleanButton
              value={equipped}
              onToggle={() => onToggleInventoryEquippedByIndex(index)}
            />
          }
        />
        <Tag
          label="Use as resource"
          value={
            <BooleanButton
              value={useAsResource}
              onToggle={() => onToggleInventoryUseAsResourceByIndex(index)}
            />
          }
        />
        <Tag
          label="total"
          value={
            <input
              type="number"
              min={0}
              max={999999}
              value={total}
              onChange={(e) =>
                onChangeInventoryTotalByIndex(index, e.target.value)
              }
            />
          }
        />
        <Tag
          label="weight"
          value={
            <input
              type="number"
              min={0}
              max={999999}
              value={weight}
              onChange={(e) =>
                onChangeInventoryWeightByIndex(index, e.target.value)
              }
            />
          }
        />
        <Tag label="total weight" value={(total * weight).toFixed(2)} />
        <Tag
          label="ac mod"
          value={
            <DelayedInput
              className={styles['input']}
              value={acMod}
              onSubmit={(value) => onChangeInventoryACByIndex(index, value)}
            />
          }
        />
      </CollapsibleCard>
    </div>
  );
};
