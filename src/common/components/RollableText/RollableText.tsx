import { useDiceRoller } from 'providers/DiceRollerProvider';
import styles from './rollableText.module.scss';
import classnames from 'classnames/bind';

const classNameBuilder = classnames.bind(styles);

export const RollableText = ({
  value,
  className = '',
  roll,
  chatConfig,
  rollOptions = {},
  ...rest
}) => {
  const { onRoll } = useDiceRoller();

  return (
    <span
      className={classNameBuilder('container', className)}
      onClick={() => onRoll(roll, chatConfig, rollOptions)}
      {...rest}>
      {value}
    </span>
  );
};
