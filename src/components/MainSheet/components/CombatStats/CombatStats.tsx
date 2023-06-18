import { ArmorClass } from '../ArmorClass/ArmorClass';
import { Initiative } from '../Initiative/Initiative';
import styles from './combatStats.module.scss';

export const CombatStats = () => {
  return (
    <div className={styles['container']}>
      <h3>CombatStats</h3>
      <Initiative />
      <ArmorClass />
    </div>
  );
};