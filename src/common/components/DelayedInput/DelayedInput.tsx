import { useLayoutEffect, useState } from 'react';

export const DelayedInput = ({ className = '', value, onSubmit, ...rest }) => {
  const [display, setDisplay] = useState(value);

  useLayoutEffect(() => {
    setDisplay(value);
  }, [value]);

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
