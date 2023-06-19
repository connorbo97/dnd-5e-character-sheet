import { ChatEntry as ChatEntryType, ChatType } from 'constants/chat';
import styles from './chatEntry.module.scss';
import classnames from 'classnames/bind';
import { noop } from 'lodash';
import { useChat } from 'providers/ChatProvider';

const classNameBuilder = classnames.bind(styles);

interface Props extends ChatEntryType {}

export const ChatEntry = ({
  result,
  type,
  label,
  labelSuffix,
  playerName,
  description,
  critRange,
  followUp,
  resultArray,
}: Props) => {
  const { onRoll } = useChat();
  const finalPlayerName =
    type === ChatType.CHAT ? `${playerName} says:` : `${playerName}:`;

  const hasFollowUp = followUp && followUp.length > 0;

  const sanitizedCritRange = critRange || 20;

  let isCritSuccess = false;
  let isCritFailure = false;

  if ((type === ChatType.ATTACK || type === ChatType.BASIC) && resultArray) {
    const firstResult = resultArray[0];
    const d20Result = Array.isArray(firstResult) ? firstResult : [firstResult];

    // check if the d20 roll >= crit range
    isCritSuccess = d20Result.some((r) => r >= sanitizedCritRange);
    isCritFailure = d20Result.some((r) => r === 1);
  }

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>{finalPlayerName}</div>
      <div className={styles['content']}>
        <span
          className={classNameBuilder('result', type, {
            crit: isCritSuccess,
            failure: isCritFailure,
          })}>
          {result}
        </span>
        {description && (
          <span className={styles['description']}>{description}</span>
        )}
        {label && (
          <span
            className={classNameBuilder('label', {
              'follow-up': hasFollowUp,
            })}
            onClick={
              hasFollowUp
                ? noop
                : () =>
                    followUp?.forEach((f) => {
                      onRoll(f.roll, { ...f.config, isCrit: isCritSuccess });
                    })
            }>
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
