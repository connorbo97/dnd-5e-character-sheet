import styles from './requiredIcon.module.scss';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

type Props = any;
export const RequiredIcon = ({ className = '' }: Props) => {
  return <span className={classNameBuilder('icon', className)}>*</span>;
};
