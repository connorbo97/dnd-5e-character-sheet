import { useCharacterCreatorPath } from 'providers/CharacterCreatorProvider';
import styles from './choiceRaceSection.module.scss';
import { Dropdown } from 'common/components/Dropdown/Dropdown';
import { iSet } from 'utils/lodashUtils';

type Props = {
  value: any;
  format: string;
  index: number;
  options: Array<{ value: any; label: any }>;
  isSubRace?: boolean;
  config?: {
    header?: any;
    placeholder?: any;
  };
};
export const ChoiceRaceSection = ({
  value,
  options,
  config = {},
  isSubRace,
  index,
}: Props) => {
  const [, , updateRaceConfig] = useCharacterCreatorPath('race.config');
  const { header, placeholder } = config;
  let finalHeader = header || 'HEADER';

  const onChange = (e) =>
    updateRaceConfig((prev) =>
      iSet(
        prev,
        `${isSubRace ? 'subRace' : 'base'}.${index}.value`,
        e.target.value,
      ),
    );

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>{finalHeader}</div>
      <div className={styles['content']}>
        {options && (
          <Dropdown
            options={options}
            onChange={onChange}
            value={value}
            allowEmpty
            placeholder={placeholder || 'Choose'}
          />
        )}
      </div>
    </div>
  );
};
