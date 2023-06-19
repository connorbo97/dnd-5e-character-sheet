import { useDiceRoller } from 'providers/DiceRollerProvider';
import styles from './chat.module.scss';
import { ChatEntry } from './ChatEntry';

export const Chat = () => {
  const { rolls } = useDiceRoller();

  return (
    <div className={styles['container']}>
      <h3>Chat</h3>
      <div className={styles['chats']}>
        {rolls.map((entry) => (
          <ChatEntry {...entry} />
        ))}
      </div>
    </div>
  );
};
