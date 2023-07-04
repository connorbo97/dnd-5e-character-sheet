import { ReactNode } from 'react';
import styles from './tag.module.scss';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

type Props = {
  label: string | ReactNode;
  value?: any;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
};
export const Tag = ({
  label,
  value,
  className = '',
  labelClassName = '',
  valueClassName = '',
}: Props) => {
  return (
    <div className={classNameBuilder('container', className)}>
      <span className={classNameBuilder('label', labelClassName)}>
        {label}:
      </span>
      <span className={classNameBuilder('value', valueClassName)}>
        {' '}
        {value}
      </span>
    </div>
  );
};
