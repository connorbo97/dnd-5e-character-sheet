import { useChat } from 'providers/ChatProvider';
import styles from './rollableText.module.scss';
import classnames from 'classnames/bind';
import { Rollable } from 'constants/rollable';
import { noop } from 'lodash';
import { ChatEntryInputs } from 'constants/chat';

const classNameBuilder = classnames.bind(styles);

type Props = {
  value: any;
  disabled?: boolean;
  className?: string;
  roll: Rollable | string;
  chatConfig?: ChatEntryInputs;
  rollOptions?: object;
  onRollStart?: Function;
  onRollEnd?: Function;
};

export const RollableText = ({
  value,
  disabled,
  className = '',
  roll,
  chatConfig = {},
  rollOptions = {},
  onRollStart = noop,
  onRollEnd = noop,
  ...rest
}: Props) => {
  const { onRoll } = useChat();

  return (
    <span
      className={classNameBuilder('container', className, {
        disabled,
      })}
      onClick={async (e) => {
        if (disabled) {
          return;
        }
        onRollStart(e);
        let res;
        try {
          res = await onRoll(roll, chatConfig, rollOptions);
          onRollEnd(res);
        } catch (err) {
          console.error(err);
        }
      }}
      {...rest}>
      {value}
    </span>
  );
};
