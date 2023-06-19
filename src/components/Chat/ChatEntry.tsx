import { ChatEntry as ChatEntryType } from 'constants/chat';
import styles from './chatEntry.module.scss';

interface Props extends ChatEntryType {}

export const ChatEntry = ({
  result,
  label,
  playerName,
  description,
}: Props) => {
  return (
    <div className={styles['container']}>
      <div className={styles['header']}>{playerName}</div>
      <div className={styles['content']}>
        <span className={styles['result']}>{result}</span>
        {description && (
          <span className={styles['description']}>{description}</span>
        )}
        {label && <span className={styles['label']}>{label}</span>}
      </div>
    </div>
  );
};
