import { useMemo } from 'react';
import styles from './dropdown.module.scss';
import { isObject } from 'lodash';
type OptionType = { value: any; label: any };
type Props = {
  options: Array<string | number | OptionType>;
  value: null | string | number | OptionType;
  onChange: Function;
};
export const Dropdown = ({ options, value, onChange }: Props) => {
  const formattedOptions: Array<OptionType> = useMemo(() => {
    if (!options?.length) {
      return [];
    }

    return options.map((o) => (isObject(o) ? o : { value: o, label: o }));
  }, [options]);

  const formattedValue = isObject(value) ? value.value : value;
  return (
    <select value={formattedValue} onChange={(e) => onChange(e)}>
      {formattedOptions.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};
