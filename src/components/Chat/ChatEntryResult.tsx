import styles from './chatEntryResult.module.scss';
import { ChatEntry as ChatEntryType, ChatType } from 'constants/chat';
import { Tooltip } from 'react-mint';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

interface Props extends ChatEntryType {
  isCritSuccess: boolean;
  isCritFailure: boolean;
  shouldHighlightSecondResult: boolean;
}

export const ChatEntryResult = (props: Props) => {
  const {
    result,
    detailedResult,
    secondRoll = {},
    type,
    isFollowUp,
    isDisadvantage,
    isAdvantage,
    isCritFailure,
    isCritSuccess,
    shouldHighlightSecondResult,
  } = props;

  const { result: secondResult, detailedResult: secondDetailedResult } =
    secondRoll;

  const shouldRenderBothResults =
    (ChatType.ATTACK || ChatType.BASIC) &&
    (isDisadvantage || isAdvantage) &&
    !(isAdvantage && isDisadvantage);

  const content = !shouldRenderBothResults ? (
    <span
      className={classNameBuilder({
        crit: isCritSuccess,
        failure: isCritFailure,
      })}>
      {detailedResult && <Tooltip interactive>{detailedResult}</Tooltip>}
      {result}
    </span>
  ) : (
    <div className={styles['double-content']}>
      <div
        className={classNameBuilder('double-child', 'left', {
          highlight: !shouldHighlightSecondResult,
          crit: !shouldHighlightSecondResult && isCritSuccess,
          failure: !shouldHighlightSecondResult && isCritFailure,
        })}>
        {detailedResult && <Tooltip interactive>{detailedResult}</Tooltip>}
        {result}
      </div>
      <div
        className={classNameBuilder('double-child', 'right', {
          highlight: shouldHighlightSecondResult,
          crit: shouldHighlightSecondResult && isCritSuccess,
          failure: shouldHighlightSecondResult && isCritFailure,
        })}>
        {secondDetailedResult && (
          <Tooltip interactive>{secondDetailedResult}</Tooltip>
        )}
        {secondResult}
      </div>
    </div>
  );

  return (
    <div
      className={classNameBuilder('result', type, {
        'follow-up': isFollowUp,
      })}>
      {content}
    </div>
  );
};
