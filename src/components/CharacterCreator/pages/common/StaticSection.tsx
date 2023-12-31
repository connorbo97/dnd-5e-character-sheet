import { isObject, values } from 'lodash';
import styles from './staticSection.module.scss';
import { WALKING_TYPE } from 'constants/raceTypes';
import { SKILL_CONFIGS } from 'constants/skills';
import {
  CreateConfigEntryConfig,
  SECTION_CONFIG_FORMAT,
} from 'constants/characterCreatorSections';
import { getStatStringFromBlock } from 'utils/statUtils';

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

  let finalHeader = header;
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
  } else if (format === SECTION_CONFIG_FORMAT.FEATURE) {
    finalHeader = value?.label;
    finalValue = value?.description;
  } else if (format === SECTION_CONFIG_FORMAT.PROFICIENCY) {
    finalValue = values(value)
      .map(({ label }) => label)
      .join(', ');
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
  } else if (format === SECTION_CONFIG_FORMAT.NOTE) {
    return (
      <div className={styles['proficiency-class']}>
        <i>{header}</i>
      </div>
    );
  }

  return (
    <div className={styles['container']}>
      {finalHeader && <div className={styles['header']}>{finalHeader}</div>}
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
