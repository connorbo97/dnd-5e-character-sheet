import { useAdvantageToggle } from 'providers/CharacterSheetProvider/useAdvantageToggle';
import styles from './advantageToggle.module.scss';
import { ADVANTAGE_TOGGLE_OPTIONS } from 'constants/advantageToggle';
import { Toggle } from 'common/components/Toggle/Toggle';

export const AdvantageToggle = () => {
  const { advantageToggle, onChangeAdvantageToggle } = useAdvantageToggle();
  return (
    <div className={styles['container']}>
      <h5>Advantage Toggle</h5>
      <Toggle
        options={ADVANTAGE_TOGGLE_OPTIONS}
        onChange={(value) => onChangeAdvantageToggle(value)}
        selected={advantageToggle}
      />
    </div>
  );
};
