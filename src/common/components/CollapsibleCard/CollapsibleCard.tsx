import Collapsible from 'react-collapsible';
import styles from './collapsibleCard.module.scss';
import { useState } from 'react';
import classnames from 'classnames/bind';
import { isNil } from 'lodash';

const classNameBuilder = classnames.bind(styles);

type Props = {
  initialOpen?: boolean;
  open?: boolean;
  setOpen?: Function;
  header: any;
  children: any;
  contentClassName?: string;
  headerClassName?: string;
  transitionTime?: number;
};

const HIDE_CHILDREN_THRESHOLD = 50;

export const CollapsibleCard = ({
  initialOpen = false,
  open: propsOpen,
  setOpen: propsSetOpen,
  header,
  children,
  contentClassName = '',
  headerClassName = '',
  transitionTime = 1,
}: Props) => {
  const [open, setOpen] = useState(initialOpen);
  const [closed, setClosed] = useState(
    !initialOpen && transitionTime < HIDE_CHILDREN_THRESHOLD,
  );

  const finalOpen = !isNil(propsOpen) ? propsOpen : open;
  const finalSetOpen = !isNil(propsSetOpen) ? propsSetOpen : setOpen;

  return (
    <Collapsible
      open={finalOpen}
      handleTriggerClick={() => {
        if (transitionTime < HIDE_CHILDREN_THRESHOLD) {
          if (finalOpen) {
            finalSetOpen((prev) => !prev);

            window.requestAnimationFrame(() => {
              setClosed((prev) => !prev);
            });
          } else {
            setClosed((prev) => !prev);

            window.requestAnimationFrame(() => {
              finalSetOpen((prev) => !prev);
            });
          }
        } else {
          finalSetOpen((prev) => !prev);
        }
      }}
      transitionTime={transitionTime}
      trigger={
        <div
          className={classNameBuilder('header', headerClassName, {
            open: finalOpen,
          })}>
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
