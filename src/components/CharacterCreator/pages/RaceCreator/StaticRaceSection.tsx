import { isObject } from 'lodash';
import styles from './staticRaceSection.module.scss';
import {
  RACE_CONFIG_FORMAT,
  RaceCreateConfigEntryConfig,
  WALKING_TYPE,
} from 'constants/raceTypes';
import { SKILL_CONFIGS } from 'constants/skills';
import { getStatStringFromBlock } from 'utils/raceCreatorUtils';

type Props = {
  value: any;
  format: string;
  config?: RaceCreateConfigEntryConfig;
};
export const StaticRaceSection = ({ format, value, config = {} }: Props) => {
  const { header, subHeader, description, renderValue, hideValue } = config;

  let finalHeader = header || 'HEADER';
  let finalValue = value;

  if (format === 'STATS') {
    finalHeader = 'Stats';
    finalValue = getStatStringFromBlock(value);
  } else if (format === 'SPEED') {
    finalHeader = 'Speed';
    finalValue = value
      .map(
        ({ value, type }) =>
          `${value}${type !== WALKING_TYPE ? ' ' + type : ''}`,
      )
      .join(', ');
  } else if (format === 'FEATURE') {
    finalHeader = `Feature: ${value?.label}`;
    finalValue = value?.description;
  } else if (format === 'PROFICIENCY') {
    finalValue = value.map(({ label }) => label).join(', ');
  } else if (format === RACE_CONFIG_FORMAT.SKILL_PROFICIENCY) {
    finalValue = Object.keys(value)
      .map((s) => SKILL_CONFIGS[s].label)
      .join(', ');
  }

  if (renderValue) {
    finalValue = renderValue(value);
  } else if (isObject(finalValue)) {
    finalValue = JSON.stringify(finalValue);
  }

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>{finalHeader}</div>
      <div className={styles['content']}>
        {description && (
          <div className={styles['description']}>{description}</div>
        )}
        {subHeader && <h3>{subHeader}</h3>}
        {!hideValue && <div className={styles['value']}>{finalValue}</div>}
      </div>
    </div>
  );
};
