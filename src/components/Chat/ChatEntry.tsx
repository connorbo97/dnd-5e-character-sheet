import { ChatEntry as ChatEntryType } from 'constants/chat';
import styles from './chatEntry.module.scss';

interface Props extends ChatEntryType {}

export const ChatEntry = ({
  result,
  label,
  labelSuffix,
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
        {label && (
          <span className={styles['label']}>
            {label}
            {labelSuffix && (
              <span className={styles['label-suffix']}>{labelSuffix}</span>
            )}
          </span>
        )}
      </div>
    </div>
  );
};
