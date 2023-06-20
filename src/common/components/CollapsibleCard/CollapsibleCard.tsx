import Collapsible from 'react-collapsible';
import styles from './collapsibleCard.module.scss';
import { useState } from 'react';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

export const CollapsibleCard = ({
  initialOpen = false,
  header,
  children,
  contentClassName = '',
  headerClassName = '',
}) => {
  const [open, setOpen] = useState(initialOpen);
  const [closed, setClosed] = useState(!initialOpen);

  return (
    <Collapsible
      open={open}
      handleTriggerClick={() => {
        if (open) {
          setOpen((prev) => !prev);

          window.requestAnimationFrame(() => {
            setClosed((prev) => !prev);
          });
        } else {
          setClosed((prev) => !prev);

          window.requestAnimationFrame(() => {
            setOpen((prev) => !prev);
          });
        }
      }}
      transitionTime={1}
      trigger={
        <div className={classNameBuilder('header', headerClassName, { open })}>
          <div className={styles['label']}>{header}</div>
          <div className={styles['caret']}>v</div>
        </div>
      }>
      <div className={classNameBuilder('content', contentClassName)}>
        {closed ? null : children}
      </div>
    </Collapsible>
  );
};
