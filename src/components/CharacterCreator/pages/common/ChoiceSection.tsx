import styles from './choiceSection.module.scss';
import { Dropdown } from 'common/components/Dropdown/Dropdown';
import { iSet } from 'utils/lodashUtils';
import { get, keys, noop } from 'lodash';
import {
  CreateConfigEntry,
  SECTION_CONFIG_FORMAT,
} from 'constants/characterCreatorSections';
import classnames from 'classnames/bind';
import { RequiredIcon } from 'common/components/RequiredIcon/RequiredIcon';
import React from 'react';
import {
  CHARACTER_SHEET_PATH_SET,
  CharacterSheetPath,
} from 'constants/characterSheetPaths';
import { useCharacterCreatorSheet } from 'providers/CharacterCreatorProvider';
import { IGNORE_PATH } from 'constants/raceTypes';
// import { useCharacterCreatorSheet } from 'providers/CharacterCreatorProvider';
// import {
//   CHARACTER_SHEET_PATH_SET,
//   CharacterSheetPath,
// } from 'constants/characterSheetPaths';

const classNameBuilder = classnames.bind(styles);

interface Props extends CreateConfigEntry {
  updatePath: string;
  isSubRace?: boolean;
  onUpdate: Function;
  optional?: boolean;
  formPath?: string;
}

export const ChoiceSection = React.memo(
  ({
    value,
    format,
    options = [],
    config = {},
    optional = false,
    formPath,
    updatePath,
    path,
    onUpdate,
  }: Props) => {
    const { formSheets } = useCharacterCreatorSheet();
    const {
      header,
      subHeader,
      description,
      getDescription,
      getPostDescription,
      getLabelValue,
      getPlaceholder = noop,
      allowDupes = false,
    } = config;
    const statics = get(value, 'statics', []);
    const customValue = get(value, 'custom');
    const finalHeader = header || 'HEADER';
    let finalDescription = description;

    if (getDescription) {
      finalDescription = getDescription(value);
    }

    const onChangeDropdown = (newValue) => {
      onUpdate((prev) => iSet(prev, `${updatePath}.value`, newValue));
    };

    const onChangeCustom = (index, value) =>
      onUpdate((prev) =>
        iSet(prev, `${updatePath}.value.custom.${index}.value`, value),
      );

    // let disabledValues: Array<any> = [];

    // if (CHARACTER_SHEET_PATH_SET.has(path as CharacterSheetPath)) {
    //   const sheetValue = get(sheet, path);

    //   switch (path) {
    //     case CharacterSheetPath.skills:
    //     case CharacterSheetPath.otherProficiencies:
    //       disabledValues = keys(sheetValue);
    //       break;
    //     default:
    //   }
    // }

    let disabledValues: Array<any> = [];
    const sheetValue = get(
      get(formSheets, formPath || IGNORE_PATH) || {},
      path,
    );

    console.log(formPath, path, sheetValue, allowDupes);
    if (
      !allowDupes &&
      formPath &&
      CHARACTER_SHEET_PATH_SET.has(path as CharacterSheetPath) &&
      sheetValue
    ) {
      switch (path) {
        case CharacterSheetPath.skills:
        case CharacterSheetPath.otherProficiencies:
          disabledValues = keys(sheetValue);
          break;
        default:
      }
    }

    return (
      <div className={styles['container']}>
        <div className={classNameBuilder('header')}>
          {finalHeader}
          {!optional && <RequiredIcon />}
          {optional && '(Optional)'}
        </div>
        <div className={styles['content']}>
          {finalDescription && (
            <div className={styles['description']}>{finalDescription}</div>
          )}
          {subHeader && <h3>{subHeader}</h3>}
          {format === SECTION_CONFIG_FORMAT.DROPDOWN && options && (
            <Dropdown
              options={options}
              onChange={(e) => onChangeDropdown(e.target.value)}
              value={value}
              disabledValues={disabledValues}
              allowEmpty
              placeholder={getPlaceholder(config) || 'Choose'}
            />
          )}

          {format === SECTION_CONFIG_FORMAT.STATIC_CHOICE && customValue && (
            <div>
              {getLabelValue && getLabelValue(customValue, statics)}
              <div className={styles['custom-stat-dropdowns']}>
                {customValue.map((config, i) => (
                  <Dropdown
                    key={i}
                    value={config.value}
                    disabledValues={disabledValues}
                    options={config.options}
                    placeholder={getPlaceholder && getPlaceholder(config)}
                    onChange={(e) => onChangeCustom(i, e.target.value)}
                  />
                ))}
              </div>
            </div>
          )}
          {getPostDescription && (
            <div className={styles['description']}>
              {getPostDescription(value)}
            </div>
          )}
        </div>
      </div>
    );
  },
);
