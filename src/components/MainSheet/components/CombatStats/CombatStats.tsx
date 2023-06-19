import { Tag } from 'common/components/Tag/Tag';
import { ArmorClass } from '../ArmorClass/ArmorClass';
import { HitPoints } from '../HitPoints/HitPoints';
import { Initiative } from '../Initiative/Initiative';
import styles from './combatStats.module.scss';

export const CombatStats = () => {
  return (
    <div className={styles['container']}>
      <h3>CombatStats</h3>
      <Initiative />
      <ArmorClass />
      <HitPoints />
      <Tag label="Movement Speed" value="30 ft" />
    </div>
  );
};
