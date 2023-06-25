import { useFeatures } from 'providers/CharacterSheetProvider/useFeatures';
import styles from './features.module.scss';
import { FeatureEntry } from './FeatureEntry';

export const Features = () => {
  const { features } = useFeatures();
  return (
    <div className={styles['container']}>
      <h3 className={styles['header']}>Features</h3>
      <div className={styles['content']}>
        {features.map((f, i) => (
          <FeatureEntry key={i} index={i} feature={f} />
        ))}
      </div>
    </div>
  );
};
