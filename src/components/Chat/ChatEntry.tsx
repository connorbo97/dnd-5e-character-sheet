import { ChatEntry as ChatEntryType, ChatType } from 'constants/chat';
import styles from './chatEntry.module.scss';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

interface Props extends ChatEntryType {}

export const ChatEntry = ({
  result,
  type,
  label,
  labelSuffix,
  playerName,
  description,
}: Props) => {
  const finalPlayerName =
    type === ChatType.CHAT ? `${playerName} says:` : `${playerName}:`;
  return (
    <div className={styles['container']}>
      <div className={styles['header']}>{finalPlayerName}</div>
      <div className={styles['content']}>
        <span className={classNameBuilder('result', type)}>{result}</span>
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
