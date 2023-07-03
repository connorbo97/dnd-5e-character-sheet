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
import { find, get, identity } from 'lodash';
import converter from 'number-to-words';
import {
  capitalizeFirstLetter,
  joinAndStrings,
  joinOrStrings,
} from 'utils/stringUtils';

export const getInventoryItemFromEquipmentConfig = (
  config: EquipmentConfig,
  total,
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
export const getStaticEquipment = (
  inventory: Array<InventoryItem | undefined>,
  { attacks = [] as Array<AttackEntry | undefined> } = {},
): CreateConfigEntry => ({
  type: SECTION_CONFIG_TYPE.STATIC,
  format: SECTION_CONFIG_FORMAT.BASIC,
  path: MULTI_PATH,
  value: joinAndStrings(inventory.filter(identity).map((i) => i?.label)),
  config: {
    getFinalValue: () => ({
      [CharacterSheetPath.inventory]: inventory.filter(identity),
      [CharacterSheetPath.attacks]: attacks.filter(identity),
    }),
  },
});
export const convertEquipmentConfigEntryToOption = ([k, c]) => ({
  value: k,
  label: c.label,
  item: getInventoryItemFromEquipmentConfig(c, 1),
  attack: c?.attack,
});

export const getEquipmentChoice = (
  custom: Array<{
    label?: string;
    options: Array<{
      value: any;
      label: any;
      item: InventoryItem;
      attack?: AttackEntry;
    }>;
  }>,
) => {
  const baseHeader = joinOrStrings(
    custom.map(
      (c) => c.label || joinOrStrings(c.options.map(({ label }) => label)),
    ),
  );
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
      getFinalValue: ({ custom }, i) => {
        const inventory = custom
          .map(({ value: selectedValue }) =>
            find(
              get(custom, [i, 'options']),
              ({ value }) => value === selectedValue,
            ),
          )
          .filter(identity);

        return {
          [CharacterSheetPath.inventory]: inventory.map((i) => i.item),
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
