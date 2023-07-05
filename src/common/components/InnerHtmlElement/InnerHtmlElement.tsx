import { useLayoutEffect, useRef } from 'react';
import styles from './innerHtmlElement.module.scss';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

type Props = any;
export const InnerHtmlElement = ({ html, className }: Props) => {
  const ref: any = useRef();

  useLayoutEffect(() => {
    ref.current.innerHTML = html;
  }, [html]);

  return <div ref={ref} className={classNameBuilder('container', className)} />;
};
