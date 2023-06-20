import { useFullSheet } from 'providers/CharacterSheetProvider/useFullSheet';
import styles from './otherProficiencies.module.scss';

export const OtherProficiencies = () => {
  const { otherProficiencies } = useFullSheet();

  return (
    <div className={styles['container']}>
      <h3>Other Proficiencies</h3>
      <div>
        {Object.entries(otherProficiencies).map(
          ([profType, { label, category }]) => (
            <div key={profType}>
              <u>{category}:</u>
              <span> {label}</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
