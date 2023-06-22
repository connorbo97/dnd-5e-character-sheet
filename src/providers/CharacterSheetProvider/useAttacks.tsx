import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iSet, iUpdate } from 'utils/lodashUtils';
import { generateRollableFromString } from 'utils/rollableUtils';

export const useAttacks = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { attacks } = sheet;

  // general
  const onToggleIsEnabled = (attackIndex, path) => {
    setSheet((prevSheet) =>
      iUpdate(
        prevSheet,
        `attacks.${attackIndex}.${path}.isEnabled`,
        (prev) => !prev,
      ),
    );
  };

  //attack
  const onChangeAttackPropertyByIndex = (index, property, value) => {
    setSheet((prevSheet) =>
      iSet(prevSheet, `attacks.${index}.attack.${property}`, value),
    );
  };
  const onChangeAttackStatByIndex = (index, value) => {
    onChangeAttackPropertyByIndex(index, 'stat', value);
  };
  const onChangeAttackModByIndex = (index, value) => {
    onChangeAttackPropertyByIndex(index, 'mod.value', value);
  };
  const onChangeAttackRangeByIndex = (index, value) => {
    onChangeAttackPropertyByIndex(index, 'range', value);
  };
  const onChangeAttackCritRangeByIndex = (index, value) => {
    onChangeAttackPropertyByIndex(index, 'critRange', value);
  };

  const onToggleAttackProficiencyByIndex = (index) => {
    setSheet((prevSheet) =>
      iUpdate(
        prevSheet,
        ['attacks', index, 'attack', 'proficient'],
        (prev) => !prev,
      ),
    );
  };

  // damage
  const onChangeAttackDamagePropertyByIndex = (index, property, value) => {
    setSheet((prevSheet) =>
      iSet(prevSheet, `attacks.${index}.damage.${property}`, value),
    );
  };
  const onChangeAttackDamageModByIndex = (attackIndex, damageIndex, value) => {
    onChangeAttackDamagePropertyByIndex(
      attackIndex,
      `${damageIndex}.mod.value`,
      value,
    );
  };
  const onChangeAttackDamageTypeByIndex = (attackIndex, damageIndex, value) => {
    onChangeAttackDamagePropertyByIndex(
      attackIndex,
      `${damageIndex}.type`,
      value,
    );
  };
  const onChangeAttackDamageLabelByIndex = (
    attackIndex,
    damageIndex,
    value,
  ) => {
    onChangeAttackDamagePropertyByIndex(
      attackIndex,
      `${damageIndex}.label`,
      value,
    );
  };
  const onChangeAttackDamageCritByIndex = (attackIndex, damageIndex, value) => {
    setSheet((prevSheet) =>
      iUpdate(
        prevSheet,
        ['attacks', attackIndex, 'damage', damageIndex, 'crit'],
        (prev) => {
          try {
            const a = generateRollableFromString(value);
            console.log(a);
            return a;
          } catch (err) {
            return prev;
          }
        },
      ),
    );
  };
  const onChangeAttackDamageBaseByIndex = (attackIndex, damageIndex, value) => {
    setSheet((prevSheet) =>
      iUpdate(
        prevSheet,
        ['attacks', attackIndex, 'damage', damageIndex, 'base'],
        (prev) => {
          try {
            return generateRollableFromString(value);
          } catch (err) {
            return prev;
          }
        },
      ),
    );
  };

  // metadata
  const onChangeAttackDescriptionByIndex = useCallback(
    (index, val) => {
      setSheet((prevSheet) =>
        iSet(prevSheet, ['attacks', index, 'description'], val),
      );
    },
    [setSheet],
  );
  const onChangeAttackLabelByIndex = (index, value) => {
    setSheet((prevSheet) =>
      iSet(prevSheet, ['attacks', index, 'label'], value),
    );
  };
  const onChangeAttackSourceByIndex = useCallback(
    (index, val) => {
      setSheet((prevSheet) =>
        iSet(prevSheet, ['attacks', index, 'source'], val),
      );
    },
    [setSheet],
  );

  return {
    attacks,

    onToggleIsEnabled,

    // attack
    onChangeAttackLabelByIndex,
    onChangeAttackStatByIndex,
    onChangeAttackModByIndex,
    onChangeAttackRangeByIndex,
    onChangeAttackCritRangeByIndex,
    onToggleAttackProficiencyByIndex,

    // damage
    onChangeAttackDamageBaseByIndex,
    onChangeAttackDamageModByIndex,
    onChangeAttackDamageTypeByIndex,
    onChangeAttackDamageCritByIndex,
    onChangeAttackDamageLabelByIndex,

    onChangeAttackDescriptionByIndex,
    onChangeAttackSourceByIndex,
  };
};
