import { sum } from 'lodash';
import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback, useMemo } from 'react';
import { iSet, iUpdate } from 'utils/lodashUtils';
import { generateRollableFromString } from 'utils/rollableUtils';

export const useInventory = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { inventory } = sheet;

  const totalWeight = useMemo(() => {
    return sum(inventory.map(({ total, weight }) => total * weight)).toFixed(2);
  }, [inventory]);
  const { disadvantageStealthCheck, label: disadvantageStealthSource } =
    useMemo(() => {
      return (
        inventory.find(
          ({ disadvantageStealthCheck }) => disadvantageStealthCheck,
        ) || { disadvantageStealthCheck: false, label: '' }
      );
    }, [inventory]);

  const onChangeInventoryPropertyByIndex = useCallback(
    (index, property, value) => {
      setSheet((prev) => iSet(prev, `inventory.${index}.${property}`, value));
    },
    [setSheet],
  );
  const onToggleInventoryEquippedByIndex = (index) =>
    setSheet((prev) =>
      iUpdate(prev, `inventory.${index}.equipped`, (prevE) => !prevE),
    );
  const onToggleInventoryUseAsResourceByIndex = (index) =>
    setSheet((prev) =>
      iUpdate(prev, `inventory.${index}.useAsResource`, (prevE) => !prevE),
    );
  const onToggleInventoryDisadvantageStealthCheckByIndex = (index) =>
    setSheet((prev) =>
      iUpdate(
        prev,
        `inventory.${index}.disadvantageStealthCheck`,
        (prevE) => !prevE,
      ),
    );

  const onChangeInventoryLabelByIndex = (index, value) =>
    onChangeInventoryPropertyByIndex(index, 'label', value);
  const onChangeInventoryDescriptionByIndex = (index, value) =>
    onChangeInventoryPropertyByIndex(index, 'description', value);
  const onChangeInventorySourceByIndex = (index, value) =>
    onChangeInventoryPropertyByIndex(index, 'source', value);
  const onChangeInventoryTotalByIndex = (index, value) =>
    onChangeInventoryPropertyByIndex(index, 'total', value);
  const onChangeInventoryWeightByIndex = (index, value) =>
    onChangeInventoryPropertyByIndex(index, 'weight', value);
  const onChangeInventoryModByIndex = (index, mod, value) =>
    onChangeInventoryPropertyByIndex(index, `mods.${mod}`, value);
  const onChangeInventoryACByIndex = (index, value) => {
    setSheet((prevSheet) =>
      iUpdate(prevSheet, ['inventory', index, 'mods', 'ac'], (prev) => {
        try {
          const a = generateRollableFromString(value);

          return a;
        } catch (err) {
          return prev;
        }
      }),
    );
  };
  const onChangeInventoryMaxByIndex = (index, value) => {
    console.log(index, value, sheet);
    setSheet((prevSheet) =>
      iSet(prevSheet, ['inventory', index, 'max'], value),
    );
  };

  return {
    inventory,
    disadvantageStealthCheck,
    disadvantageStealthSource,
    totalWeight,

    onToggleInventoryEquippedByIndex,
    onToggleInventoryUseAsResourceByIndex,
    onToggleInventoryDisadvantageStealthCheckByIndex,

    onChangeInventoryLabelByIndex,
    onChangeInventoryDescriptionByIndex,
    onChangeInventorySourceByIndex,
    onChangeInventoryTotalByIndex,
    onChangeInventoryWeightByIndex,
    onChangeInventoryModByIndex,
    onChangeInventoryACByIndex,
    onChangeInventoryMaxByIndex,
  };
};
