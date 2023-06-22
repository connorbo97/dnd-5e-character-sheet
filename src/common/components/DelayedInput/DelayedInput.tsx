import { useLayoutEffect, useState } from 'react';

export const DelayedInput = ({
  className = '',
  value,
  onSubmit: propOnSubmit,
  ...rest
}) => {
  const [display, setDisplay] = useState(value);

  useLayoutEffect(() => {
    setDisplay(value);
  }, [value]);

  const onSubmit = (val) => {
    setDisplay(value);
    propOnSubmit(val);
  };

  return (
    <input
      className={className}
      value={display}
      onChange={(e) => setDisplay(e.target.value)}
      onKeyUp={(e) => e.key === 'Enter' && onSubmit(display)}
      onBlur={() => onSubmit(display)}
      {...rest}
    />
  );
};
