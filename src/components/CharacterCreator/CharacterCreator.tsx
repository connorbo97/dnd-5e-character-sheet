import styles from './characterCreator.module.scss';
import { RaceCreator } from './pages/RaceCreator';

export const CharacterCreator = () => {
  return (
    <div className={styles['container']}>
      <RaceCreator />
    </div>
  );
};
