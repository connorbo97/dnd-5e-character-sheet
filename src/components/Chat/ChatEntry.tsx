import { ChatEntry as ChatEntryType, ChatType } from 'constants/chat';
import styles from './chatEntry.module.scss';
import classnames from 'classnames/bind';
import { noop, sum } from 'lodash';
import { useChat } from 'providers/ChatProvider';
import { ChatEntryResult } from './ChatEntryResult';

const classNameBuilder = classnames.bind(styles);

interface Props extends ChatEntryType {}

export const ChatEntry = (props: Props) => {
  const {
    type,
    label,
    labelSuffix,
    playerName,
    description,
    descriptionLevel,
    critRange,
    followUp,
    isFollowUp,
    isAdvantage,
    isDisadvantage,
    isWhisper,
    resultArray,
    secondRoll,
  } = props;
  const { onRoll } = useChat();
  const finalPlayerName =
    type === ChatType.CHAT ? `${playerName} says:` : `${playerName}:`;

  const hasFollowUp = followUp && followUp.length > 0;

  const sanitizedCritRange = critRange || 20;

  let isCritSuccess = false;
  let isCritFailure = false;
  let shouldHighlightSecondResult = false;

  if (
    (!type || type === ChatType.ATTACK || type === ChatType.BASIC) &&
    resultArray
  ) {
    const firstResult = resultArray[0];
    const d20Result = Array.isArray(firstResult) ? firstResult : [firstResult];

    // check if the d20 roll >= crit range
    isCritSuccess = d20Result.some((r) => r >= sanitizedCritRange);
    isCritFailure = d20Result.some((r) => r === 1);

    if (secondRoll) {
      const secondFirstResult = secondRoll.resultArray?.[0];
      const secondD20Result = Array.isArray(secondFirstResult)
        ? secondFirstResult
        : [secondFirstResult];

      if (
        (isAdvantage && sum(secondD20Result) > sum(d20Result)) ||
        (isDisadvantage && sum(secondD20Result) < sum(d20Result))
      ) {
        shouldHighlightSecondResult = true;
        isCritSuccess = secondD20Result.some((r) => r >= sanitizedCritRange);
        isCritFailure = secondD20Result.some((r) => r === 1);
      }
    }
  }

  let sanitizedLabel = label;

  if (!sanitizedLabel) {
    if (type === ChatType.ATTACK) {
      sanitizedLabel = 'Attack Roll';
    }
  }

  return (
    <div className={classNameBuilder('container')}>
      {!isFollowUp && <div className={styles['header']}>{finalPlayerName}</div>}
      <div className={classNameBuilder('content', { whisper: isWhisper })}>
        <ChatEntryResult
          {...props}
          isCritSuccess={isCritSuccess}
          isCritFailure={isCritFailure}
          shouldHighlightSecondResult={shouldHighlightSecondResult}
          critRange={sanitizedCritRange}
        />

        {description && (
          <span className={classNameBuilder('description', descriptionLevel)}>
            {description}
          </span>
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
