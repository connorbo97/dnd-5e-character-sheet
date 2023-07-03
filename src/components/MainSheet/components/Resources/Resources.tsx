import styles from './resources.module.scss';
import { useResources } from 'providers/CharacterSheetProvider/useResources';
import { useInventory } from 'providers/CharacterSheetProvider/useInventory';
import { useMemo } from 'react';
import { ResourceConfig } from 'constants/resources';
import { isNil } from 'lodash';
import { ResourceEntry } from './ResourceEntry';
// TODO: IMPLEMENT PB AND STATS AS MAX VALUE
export const Resources = () => {
  const {
    inventory,
    onChangeInventoryTotalByIndex,
    onChangeInventoryMaxByIndex,
  } = useInventory();
  const {
    resources,
    onChangeResourceTotalByIndex,
    onChangeResourceMaxByIndex,
  } = useResources();

  const inventoryResources: Array<ResourceConfig> = useMemo(() => {
    return inventory
      .map((i, index) => ({
        label: i.label,
        source: 'Inventory',
        itemResourceIndex: i.useAsResource ? index : -1,
        total: i.total,
        max: isNil(i.max) ? i.total : i.max,
      }))
      .filter((c) => c?.itemResourceIndex !== -1);
  }, [inventory]);

  return (
    <div className={styles['container']}>
      <h3>Resources</h3>
      {resources.map((r, i) => (
        <ResourceEntry
          key={`${i}-${r.label}`}
          resource={r}
          onChangeTotal={(v) => onChangeResourceTotalByIndex(i, v)}
          onChangeMax={(v) => onChangeResourceMaxByIndex(i, v)}
        />
      ))}
      {inventoryResources.map((r, i) => (
        <ResourceEntry
          key={`${i}-${r.label}`}
          resource={r}
          onChangeTotal={(v) =>
            onChangeInventoryTotalByIndex(r.itemResourceIndex, v)
          }
          onChangeMax={(v) =>
            onChangeInventoryMaxByIndex(r.itemResourceIndex, v)
          }
        />
      ))}
    </div>
  );
};
