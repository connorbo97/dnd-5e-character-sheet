import styles from './toggle.module.scss';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

export const Toggle = ({
  options,
  onChange,
  selected,
  className = '',
  optionClassName = '',
}) => {
  return (
    <div className={classNameBuilder('toggle', className)}>
      {options.map(({ value, label }) => {
        return (
          <div
            key={value}
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
