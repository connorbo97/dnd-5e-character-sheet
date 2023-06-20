import styles from './tag.module.scss';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

export const Tag = ({ label, value, className = '', labelClassName = '' }) => {
  return (
    <div className={classNameBuilder('container', className)}>
      <span className={classNameBuilder('label', labelClassName)}>
        {label}:
      </span>
      <span> {value}</span>
    </div>
  );
};
