import { useDiceRoller } from 'providers/DiceRollerProvider';
import styles from './chat.module.scss';

export const Chat = () => {
  const { rolls } = useDiceRoller();

  return (
    <div className={styles['container']}>
      <h3>Chat</h3>
      <div className={styles['chats']}>
        {rolls.map(({ value }) => (
          <div>{value}</div>
        ))}
      </div>
    </div>
  );
};
