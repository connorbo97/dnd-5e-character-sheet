import styles from './tag.module.scss';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

type Props = {
  label: string;
  value?: any;
  className?: string;
  labelClassName?: string;
};
export const Tag = ({
  label,
  value,
  className = '',
  labelClassName = '',
}: Props) => {
  return (
    <div className={classNameBuilder('container', className)}>
      <span className={classNameBuilder('label', labelClassName)}>
        {label}:
      </span>
      <span> {value}</span>
    </div>
  );
};
