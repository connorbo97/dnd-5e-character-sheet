import styles from './toggle.module.scss';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

export const Toggle = ({
  options,
  onChange,
  selected,
  optionClassName = '',
}) => {
  return (
    <div className={styles['toggle']}>
      {options.map(({ value, label }) => {
        return (
          <div
            className={classNameBuilder('btn', optionClassName, {
              selected: value === selected,
            })}
            onClick={() => onChange(value, label)}>
            {label}
          </div>
        );
      })}
    </div>
  );
};
