import { useFullSheet } from 'providers/CharacterSheetProvider/useFullSheet';
import styles from './attacks.module.scss';
import { AttackEntry } from './AttackEntry';

export const Attacks = () => {
  const { attacks } = useFullSheet();

  return (
    <div className={styles['container']}>
      <h3>Attacks</h3>
      <div>
        {attacks.map((attack, index) => {
          return <AttackEntry {...attack} key={index} index={index} />;
        })}
      </div>
    </div>
  );
};
