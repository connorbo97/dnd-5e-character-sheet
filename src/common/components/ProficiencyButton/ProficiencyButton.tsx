import { hasExpertise, hasProficiency } from 'constants/proficiencyUtils';
import styles from './proficiencyButton.module.scss';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

export const ProficiencyButton = ({ config, onToggle, color = '' }) => {
  const hasProficiencyBool = hasProficiency(config);
  const hasExpertiseBool = hasExpertise(config);
  const hasEither = hasProficiencyBool || hasExpertiseBool;
  return (
    <button
      style={{ borderColor: hasEither ? color : undefined }}
      className={classNameBuilder(
        'button',
        {
          proficient: hasProficiencyBool,
        },
        {
          expertise: hasExpertiseBool,
        },
      )}
      onClick={onToggle}>
      <div
        style={{ backgroundColor: hasEither ? color : undefined }}
        className={classNameBuilder(
          'inner-circle',
          {
            proficient: hasProficiencyBool,
          },
          {
            expertise: hasExpertiseBool,
          },
        )}
      />
    </button>
  );
};
