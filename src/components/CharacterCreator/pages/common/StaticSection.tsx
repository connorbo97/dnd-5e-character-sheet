import { isObject, values } from 'lodash';
import styles from './staticSection.module.scss';
import { WALKING_TYPE } from 'constants/raceTypes';
import { SKILL_CONFIGS } from 'constants/skills';
import { getStatStringFromBlock } from 'utils/raceCreatorUtils';
import {
  CreateConfigEntryConfig,
  SECTION_CONFIG_FORMAT,
} from 'constants/characterCreatorSections';

type Props = {
  value: any;
  format: string;
  config?: CreateConfigEntryConfig;
};
export const StaticSection = ({ format, value, config = {} }: Props) => {
  const {
    header,
    subHeader,
    description,
    renderValue,
    hideValue,
    hideContent,
  } = config;

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
  } else if (format === SECTION_CONFIG_FORMAT.SKILL_PROFICIENCY) {
    finalValue = Object.keys(value)
      .map((s) => SKILL_CONFIGS[s].label)
      .join(', ');
  }

  if (renderValue) {
    finalValue = renderValue(value);
  } else if (isObject(finalValue)) {
    finalValue = JSON.stringify(finalValue);
  }

  if (format === SECTION_CONFIG_FORMAT.PROFICIENCY_CLASS) {
    return (
      <div className={styles['proficiency-class']}>
        <b>{header}: </b>
        {values(value)
          .map((v) => v.label)
          .join(', ')}
      </div>
    );
  }

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>{finalHeader}</div>
      {!hideContent && (
        <div className={styles['content']}>
          {description && (
            <div className={styles['description']}>{description}</div>
          )}
          {subHeader && <h3>{subHeader}</h3>}
          {!hideValue && <div className={styles['value']}>{finalValue}</div>}
        </div>
      )}
    </div>
  );
};
