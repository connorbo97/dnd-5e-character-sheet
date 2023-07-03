import { AttackEntry } from 'constants/attacks';
import {
  CreateConfigEntry,
  SECTION_CONFIG_FORMAT,
  SECTION_CONFIG_TYPE,
} from 'constants/characterCreatorSections';
import { CharacterSheetPath } from 'constants/characterSheetPaths';
import { EquipmentConfig } from 'constants/equipmentTypes';
import { InventoryItem } from 'constants/inventory';
import { getStaticWithChoices } from 'constants/race/commonCreatorConfigs';
import { MULTI_PATH } from 'constants/raceTypes';
import { find, identity } from 'lodash';
import converter from 'number-to-words';
import {
  capitalizeFirstLetter,
  joinAndStrings,
  joinOrStrings,
} from 'utils/stringUtils';

export const getInventoryItemFromEquipmentConfig = (
  config: EquipmentConfig,
  total = 1,
): InventoryItem => {
  // if (!config) {
  //   console.trace(config);
  //   return null;
  // }

  const { label, weight, cost, ...rest } = config;
  return {
    ...rest,
    label,
    source: '',
    total,
    weight,
    equipped: true,
  };
};

const getInventoryItemEquipmentLabel = (
  input: InventoryItem | Array<InventoryItem> | undefined,
) => {
  const isArray = Array.isArray(input);
  const getLabel = (i) =>
    `${i?.label}${(i?.total || 0) > 1 ? ` (${i?.total})` : ''}`;
  return isArray
    ? joinAndStrings(input.map((i) => getLabel(i)))
    : getLabel(input);
};
export const getStaticEquipment = (
  inventory: Array<InventoryItem | undefined>,
  { attacks = [] as Array<AttackEntry | undefined> } = {},
): CreateConfigEntry => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.BASIC,
  path: MULTI_PATH,
  value: joinAndStrings(
    inventory.filter(identity).map(getInventoryItemEquipmentLabel),
  ),
  config: {
    getFinalValue: () => ({
      [CharacterSheetPath.inventory]: inventory.filter(identity),
      [CharacterSheetPath.attacks]: attacks.filter(identity),
    }),
  },
});
export const convertEquipmentConfigEntryToOption = (
  [k, c],
  total = 1,
  customLabel = '',
) => ({
  value: k,
  label: customLabel || `${c.label}${total > 1 ? ` (${total})` : ''}`,
  item: getInventoryItemFromEquipmentConfig(c, total),
});

const getEquipmentChoiceLabel = (c) =>
  c.label ||
  joinOrStrings(
    c.options.map(({ item }) => getInventoryItemEquipmentLabel(item)),
  );
export const getEquipmentChoice = (
  custom: Array<{
    label?: string;
    options: Array<{
      value: any;
      label: any;
      item: InventoryItem | Array<InventoryItem>;
      attack?: AttackEntry;
    }>;
  }>,
) => {
  const baseHeader = joinOrStrings(custom.map(getEquipmentChoiceLabel));
  return getStaticWithChoices(
    { path: MULTI_PATH, custom },
    {
      getDescription:
        custom.length > 1
          ? ({ custom }) =>
              joinAndStrings(
                custom
                  .map(({ value: selectedValue, options }) => {
                    const selectedLabel = find(
                      options,
                      ({ value }) => value === selectedValue,
                    )?.label;

                    return selectedLabel;
                  })
                  .filter(identity),
              )
          : undefined,
      getFinalValue: ({ custom }) => {
        const inventory = custom
          .map(({ value: selectedValue, options }) =>
            find(options, ({ value }) => value === selectedValue),
          )
          .filter(identity);

        return {
          [CharacterSheetPath.inventory]: inventory.map((i) => i.item).flat(),
          [CharacterSheetPath.attacks]: inventory
            .map((i) => i.attack)
            .filter(identity),
        };
      },
      header:
        custom.length > 1
          ? `${capitalizeFirstLetter(
              converter.toWords(custom.length),
            )} of (${baseHeader})`
          : baseHeader,
      getPlaceholder: () => 'Choose',
    },
  );
};
