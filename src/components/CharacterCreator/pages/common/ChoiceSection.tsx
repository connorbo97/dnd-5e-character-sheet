import styles from './choiceSection.module.scss';
import { Dropdown } from 'common/components/Dropdown/Dropdown';
import { iSet } from 'utils/lodashUtils';
import { get, noop } from 'lodash';
import {
  CreateConfigEntryConfig,
  SECTION_CONFIG_FORMAT,
} from 'constants/characterCreatorSections';

type Props = {
  value?: any;
  format: string;
  updatePath: string;
  options?: Array<{ value: any; label: any }>;
  isSubRace?: boolean;
  config?: CreateConfigEntryConfig;
  onUpdate: Function;
};

export const ChoiceSection = ({
  value,
  format,
  options = [],
  config = {},
  updatePath,
  onUpdate,
}: Props) => {
  const {
    header,
    subHeader,
    description,
    getLabelValue,
    getPlaceholder = noop,
  } = config;
  const statics = get(value, 'statics', []);
  const customValue = get(value, 'custom');
  const finalHeader = header || 'HEADER';

  const onChangeDropdown = (newValue) => {
    onUpdate((prev) => iSet(prev, `${updatePath}.value`, newValue));
  };

  const onChangeCustom = (index, value) =>
    onUpdate((prev) =>
      iSet(prev, `${updatePath}.value.custom.${index}.value`, value),
    );

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>{finalHeader}</div>
      <div className={styles['content']}>
        {description && (
          <div className={styles['description']}>{description}</div>
        )}
        {subHeader && <h3>{subHeader}</h3>}
        {format === SECTION_CONFIG_FORMAT.DROPDOWN && options && (
          <Dropdown
            options={options}
            onChange={(e) => onChangeDropdown(e.target.value)}
            value={value}
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
                  options={config.options}
                  placeholder={getPlaceholder && getPlaceholder(config)}
                  onChange={(e) => onChangeCustom(i, e.target.value)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
