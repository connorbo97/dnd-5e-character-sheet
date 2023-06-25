import styles from './scrollToTop.module.scss';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

export const ScrollToTop = ({ targetRef, className = '' }) => {
  const onClick = () => {
    const el: Element = targetRef.current;

    el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  return (
    <div className={classNameBuilder('container', className)} onClick={onClick}>
      Scroll to top
    </div>
  );
};
