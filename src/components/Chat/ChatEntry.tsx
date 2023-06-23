import { ChatEntry as ChatEntryType, ChatType } from 'constants/chat';
import styles from './chatEntry.module.scss';
import classnames from 'classnames/bind';
import { noop } from 'lodash';
import { useChat } from 'providers/ChatProvider';
import { Tooltip } from 'react-mint';

const classNameBuilder = classnames.bind(styles);

interface Props extends ChatEntryType {}

export const ChatEntry = ({
  result,
  detailedResult,
  type,
  label,
  labelSuffix,
  playerName,
  description,
  critRange,
  followUp,
  isFollowUp,
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

  let sanitizedLabel = label;

  if (!sanitizedLabel) {
    if (type === ChatType.ATTACK) {
      sanitizedLabel = 'Attack Roll';
    }
  }

  return (
    <div className={styles['container']}>
      {!isFollowUp && <div className={styles['header']}>{finalPlayerName}</div>}
      <div className={styles['content']}>
        <span
          className={classNameBuilder('result', type, {
            crit: isCritSuccess,
            failure: isCritFailure,
            'follow-up': isFollowUp,
          })}>
          {detailedResult && <Tooltip interactive>{detailedResult}</Tooltip>}
          {result}
        </span>
        {description && (
          <span className={styles['description']}>{description}</span>
        )}
        {sanitizedLabel && (
          <span
            className={classNameBuilder('label', type, {
              'follow-up': hasFollowUp,
            })}
            onClick={
              hasFollowUp
                ? async () => {
                    for (let i = 0; i < followUp.length; i++) {
                      const followUpConfig = followUp[i];
                      const critDmg =
                        isCritSuccess && followUpConfig.critDamage
                          ? followUpConfig.critDamage
                          : [];
                      const followUpRoll = Array.isArray(followUpConfig.roll)
                        ? [...followUpConfig.roll, ...critDmg]
                        : followUp[i].roll;
                      await onRoll(
                        followUpRoll,
                        {
                          ...followUpConfig.config,
                          isCrit: isCritSuccess,
                          isFollowUp: true,
                        },
                        {},
                      );
                    }
                  }
                : noop
            }>
            {sanitizedLabel}
            {labelSuffix && (
              <span className={styles['label-suffix']}>{labelSuffix}</span>
            )}
          </span>
        )}
      </div>
    </div>
  );
};