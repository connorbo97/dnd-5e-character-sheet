import { useCharacterCreatorPath } from 'providers/CharacterCreatorProvider';
import styles from './choiceRaceSection.module.scss';
import { Dropdown } from 'common/components/Dropdown/Dropdown';
import { iSet } from 'utils/lodashUtils';
import { RACE_CONFIG_FORMAT } from 'constants/raceTypes';
import { get } from 'lodash';
import { addNumberSign } from 'utils/stringUtils';

type Props = {
  value: any;
  format: string;
  updatePath: string;
  options: Array<{ value: any; label: any }>;
  isSubRace?: boolean;
  config?: {
    header?: any;
    placeholder?: any;
    getLabelValue?: Function;
    getPlaceholder?: Function;
  };
};

export const ChoiceRaceSection = ({
  value,
  format,
  options,
  config = {},
  isSubRace,
  updatePath,
}: Props) => {
  const [, , updateRaceConfig] = useCharacterCreatorPath('race.config');
  const { header, placeholder, getLabelValue, getPlaceholder } = config;
  const statics = get(value, 'statics', []);
  const customValue = get(value, 'custom');
  const finalHeader = header || 'HEADER';

  const onChangeDropdown = (index, e) => {
    updateRaceConfig((prev) =>
      iSet(prev, `${updatePath}.value`, e.target.value),
    );
  };

  const onChangeCustom = (index, value) =>
    updateRaceConfig((prev) =>
      iSet(prev, `${updatePath}.value.custom.${index}.value`, value),
    );

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>{finalHeader}</div>
      <div className={styles['content']}>
        {format === RACE_CONFIG_FORMAT.DROPDOWN && options && (
          <Dropdown
            options={options}
            onChange={(e) => onChangeDropdown(0, e.target.value)}
            value={value}
            allowEmpty
            placeholder={placeholder || 'Choose'}
          />
        )}
        {format === RACE_CONFIG_FORMAT.STATIC_CHOICE && customValue && (
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
