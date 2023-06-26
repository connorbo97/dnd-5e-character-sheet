import { useCharacterCreatorPath } from 'providers/CharacterCreatorProvider';
import styles from './choiceRaceSection.module.scss';
import { Dropdown } from 'common/components/Dropdown/Dropdown';
import { iSet } from 'utils/lodashUtils';
import { RACE_CONFIG_FORMAT } from 'constants/raceTypes';
import { get } from 'lodash';
import { addNumberSign } from 'utils/stringUtils';
import {
  convertCustomStatsToStatBlock,
  getStatStringFromBlock,
  mergeStatBlocks,
} from 'utils/raceCreatorUtils';

type Props = {
  value: any;
  format: string;
  updatePath: string;
  options: Array<{ value: any; label: any }>;
  isSubRace?: boolean;
  config?: {
    header?: any;
    placeholder?: any;
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
  const { header, placeholder } = config;
  const staticStats = get(value, 'staticStats', {});
  const customStats = get(value, 'customStats');
  const customStatsBlock = convertCustomStatsToStatBlock(customStats || []);
  let finalHeader = header || 'HEADER';

  const onChangeDropdown = (e) =>
    updateRaceConfig((prev) =>
      iSet(prev, `${updatePath}.value`, e.target.value),
    );
  const onChangeStat = (index, value) =>
    updateRaceConfig((prev) =>
      iSet(prev, `${updatePath}.value.customStats.${index}.value`, value),
    );

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>{finalHeader}</div>
      <div className={styles['content']}>
        {format === RACE_CONFIG_FORMAT.DROPDOWN && options && (
          <Dropdown
            options={options}
            onChange={onChangeDropdown}
            value={value}
            allowEmpty
            placeholder={placeholder || 'Choose'}
          />
        )}
        {format === RACE_CONFIG_FORMAT.STATS && customStats && (
          <div>
            {getStatStringFromBlock(
              mergeStatBlocks(staticStats, customStatsBlock),
            )}
            <div className={styles['custom-stat-dropdowns']}>
              {customStats.map(({ mod, options, value }, i) => (
                <Dropdown
                  value={value}
                  options={options}
                  placeholder={`Choose stat for ${addNumberSign(mod)}`}
                  onChange={(e) => onChangeStat(i, e.target.value)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
