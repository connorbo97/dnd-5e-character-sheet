import { entries, isObject } from 'lodash';
import styles from './staticRaceSection.module.scss';
import { STATS_CONFIGS } from 'constants/stats';
import { addNumberSign } from 'utils/stringUtils';
import { RACE_CONFIG_FORMAT, WALKING_TYPE } from 'constants/raceTypes';
import { SKILL_CONFIGS } from 'constants/skills';
import { getStatStringFromBlock } from 'utils/raceCreatorUtils';

type Props = {
  value: any;
  format: string;
  config?: {
    header?: any;
    subHeader?: any;
    description?: any;
    renderValue?: Function;
  };
};
export const StaticRaceSection = ({ format, value, config = {} }: Props) => {
  const { header, subHeader, description, renderValue } = config;

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
        <div className={styles['value']}>{finalValue}</div>
      </div>
    </div>
  );
};
