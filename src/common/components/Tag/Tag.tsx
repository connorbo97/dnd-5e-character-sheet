import styles from './tag.module.scss';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

export const Tag = ({ label, value, className = '' }) => {
  return (
    <div className={classNameBuilder('container', className)}>
      <u>{label}:</u>
      <span> {value}</span>
    </div>
  );
};
