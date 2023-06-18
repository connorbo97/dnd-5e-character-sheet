import { hasExpertise, hasProficiency } from 'constants/proficiencyUtils';
import styles from './proficiencyButton.module.scss';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

export const ProficiencyButton = ({ config, onToggle }) => {
  console.log(
    classNameBuilder(
      'button',
      {
        proficient: hasProficiency(config),
      },
      {
        expertise: hasExpertise(config),
      },
    ),
  );
  return (
    <button
      className={classNameBuilder(
        'button',
        {
          proficient: hasProficiency(config),
        },
        {
          expertise: hasExpertise(config),
        },
      )}
      onClick={onToggle}>
      <div
        className={classNameBuilder(
          'inner-circle',
          {
            proficient: hasProficiency(config),
          },
          {
            expertise: hasExpertise(config),
          },
        )}
      />
    </button>
  );
};
