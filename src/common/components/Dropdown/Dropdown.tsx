import { useMemo } from 'react';
import styles from './dropdown.module.scss';
import { difference, isObject } from 'lodash';

type OptionType = { value: any; label: any };
type Props = {
  options: Array<string | number | OptionType>;
  disabledValues?: Array<any>;
  value: null | string | number | OptionType;
  onChange?: Function;
  allowEmpty?: boolean;
  placeholder?: string;
};
export const Dropdown = ({
  options,
  disabledValues = [],
  value,
  onChange = (e) => console.log(e.target.value),
  allowEmpty,
  placeholder,
}: Props) => {
  const mappedOptions = useMemo(() => {
    let mappedOptions;
    if (!options?.length) {
      mappedOptions = [];
    } else {
      mappedOptions = options.map((o) =>
        isObject(o) ? o : { value: o, label: o },
      );
    }
    return mappedOptions;
  }, [options]);
  const shouldNotDisable =
    difference(
      mappedOptions.map((o) => o.value),
      disabledValues,
    ).length === 0;

  const formattedOptions: Array<OptionType> = useMemo(() => {
    return allowEmpty || placeholder
      ? [{ value: '', label: placeholder || 'Select...' }, ...mappedOptions]
      : mappedOptions;
  }, [allowEmpty, placeholder, mappedOptions]);

  const formattedValue = isObject(value) ? value.value : value;
  return (
    <select
      value={formattedValue}
      onChange={(e) => {
        onChange(e);
      }}>
      {formattedOptions.map((o) => (
        <option
          key={o.value || 'EMPTY'}
          value={o.value}
          disabled={!shouldNotDisable && disabledValues.includes(o.value)}>
          {o.label}
        </option>
      ))}
    </select>
  );
};
