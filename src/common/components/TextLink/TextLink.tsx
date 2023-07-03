import { Link } from 'react-router-dom';
import styles from './textLink.module.scss';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

type Props = any;
export const TextLink = ({ to, className = '', children }: Props) => {
  return (
    <Link to={to} className={classNameBuilder('text', className)}>
      {children}
    </Link>
  );
};
