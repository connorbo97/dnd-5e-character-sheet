import { useDiceRoller } from 'providers/DiceRollerProvider';
import styles from './rollableText.module.scss';
import classnames from 'classnames/bind';
import { Rollable } from 'constants/rollable';
import { noop } from 'lodash';
import { ChatEntryInputs } from 'constants/chat';

const classNameBuilder = classnames.bind(styles);

type Props = {
  value: any;
  className?: string;
  roll: Rollable;
  chatConfig?: ChatEntryInputs;
  rollOptions?: object;
  onRollStart?: Function;
};

export const RollableText = ({
  value,
  className = '',
  roll,
  chatConfig = {},
  rollOptions = {},
  onRollStart = noop,
  ...rest
}: Props) => {
  const { onRoll } = useDiceRoller();

  return (
    <span
      className={classNameBuilder('container', className)}
      onClick={(e) => {
        onRollStart(e);
        onRoll(roll, chatConfig, rollOptions);
      }}
      {...rest}>
      {value}
    </span>
  );
};
