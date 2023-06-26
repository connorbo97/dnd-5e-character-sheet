import { useMemo } from 'react';
import styles from './dropdown.module.scss';
import { isObject } from 'lodash';
type OptionType = { value: any; label: any };
type Props = {
  options: Array<string | number | OptionType>;
  value: null | string | number | OptionType;
  onChange?: Function;
  allowEmpty?: boolean;
  placeholder?: string;
};
export const Dropdown = ({
  options,
  value,
  onChange = (e) => console.log(e.target.value),
  allowEmpty,
  placeholder,
}: Props) => {
  const formattedOptions: Array<OptionType> = useMemo(() => {
    let mappedOptions;
    if (!options?.length) {
      mappedOptions = [];
    } else {
      mappedOptions = options.map((o) =>
        isObject(o) ? o : { value: o, label: o },
      );
    }

    return allowEmpty || placeholder
      ? [
          { value: undefined, label: placeholder || 'Select...' },
          ...mappedOptions,
        ]
      : mappedOptions;
  }, [options, allowEmpty, placeholder]);

  const formattedValue = isObject(value) ? value.value : value;
  return (
    <select value={formattedValue} onChange={(e) => onChange(e)}>
      {formattedOptions.map((o) => (
        <option key={o.value || 'EMPTY'} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};
