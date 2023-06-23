import { useAdvantageToggle } from 'providers/CharacterSheetProvider/useAdvantageToggle';
import styles from './advantageToggle.module.scss';
import classnames from 'classnames/bind';
import { ADVANTAGE_TOGGLE } from 'constants/advantageToggle';

const classNameBuilder = classnames.bind(styles);

export const AdvantageToggle = () => {
  const { advantageToggle, onChangeAdvantageToggle } = useAdvantageToggle();
  return (
    <div className={styles['container']}>
      <h5>Advantage Toggle</h5>
      <div className={styles['toggle']}>
        <div
          className={classNameBuilder('btn', {
            selected: advantageToggle === ADVANTAGE_TOGGLE.DISADVANTAGE,
          })}
          onClick={() =>
            onChangeAdvantageToggle(ADVANTAGE_TOGGLE.DISADVANTAGE)
          }>
          Disadvantage
        </div>
        <div
          className={classNameBuilder('btn', {
            selected: advantageToggle === ADVANTAGE_TOGGLE.NORMAL,
          })}
          onClick={() => onChangeAdvantageToggle(ADVANTAGE_TOGGLE.NORMAL)}>
          Normal
        </div>
        <div
          className={classNameBuilder('btn', {
            selected: advantageToggle === ADVANTAGE_TOGGLE.ADVANTAGE,
          })}
          onClick={() => onChangeAdvantageToggle(ADVANTAGE_TOGGLE.ADVANTAGE)}>
          Advantage
        </div>
      </div>
    </div>
  );
};
