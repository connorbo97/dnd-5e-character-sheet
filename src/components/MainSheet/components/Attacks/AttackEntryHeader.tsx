import { useCallback, useMemo } from 'react';
import styles from './attackEntryHeader.module.scss';
import classnames from 'classnames/bind';
import {
  D20_DICE,
  calculateRollable,
  parseRollable,
  simplifyRollable,
} from 'utils/rollableUtils';
import { addNumberSign, wrapInParens } from 'utils/stringUtils';
import { useRollableConfig } from 'providers/CharacterSheetProvider/useRollableConfig';
import { ROLLABLES, Rollable } from 'constants/rollable';
import { AttackEntry as AttackEntryType } from 'constants/attacks';
import { useChat } from 'providers/ChatProvider';
import { isNil } from 'lodash';
import { ChatEntryFollowUp, ChatType } from 'constants/chat';
import { Tooltip } from 'react-mint';

const classNameBuilder = classnames.bind(styles);

interface Props extends AttackEntryType {
  index: number;
  damageRollFollowups: Array<ChatEntryFollowUp>;
  damageRollDescription: string;
}

export const AttackEntryHeader = (props: Props) => {
  const {
    label,
    attack,
    savingThrow,
    damageRollFollowups,
    damageRollDescription,
  } = props;
  const { rollableConfig } = useRollableConfig();
  const { onRoll } = useChat();
  const {
    isEnabled: attackIsEnabled,
    stat: attackStat,
    mod: attackMod,
    proficient,
    range,
    critRange: attackCritRange,
  } = attack;
  const {
    isEnabled: savingThrowIsEnabled,
    stat: savingThrowStat,
    dc,
    dcSave,
    effect,
  } = savingThrow;

  const {
    attackRoll,
    attackModifierRoll,
    attackDCDescription,
    attackModifierRollDescription,
  } = useMemo(() => {
    let attackRoll: Rollable = [D20_DICE];
    let attackModifierRollDescription: Array<string> = [];

    if (attackStat) {
      attackRoll.push(attackStat);
      attackModifierRollDescription.push(attackStat);
    }
    if (!isNil(attackMod?.value)) {
      attackRoll.push(attackMod?.value as number);
      attackModifierRollDescription.push('Mod');
    }
    if (proficient) {
      attackRoll.push(ROLLABLES.PB);
      attackModifierRollDescription.push('PB');
    }

    const attackModifierRoll = attackRoll.slice(1);

    let attackDCDescription =
      savingThrowIsEnabled && dc
        ? `DC${8 + calculateRollable([dc], rollableConfig)}`
        : '';

    return {
      attackRoll,
      attackModifierRoll,
      attackDCDescription,
      attackModifierRollDescription,
    };
  }, [attackMod?.value, attackStat, dc, proficient, rollableConfig]);

  const { attackRollModifierString, attackRollModifierHelpString } =
    useMemo(() => {
      const attackRollModifierString = addNumberSign(
        simplifyRollable(attackModifierRoll, rollableConfig),
      );
      const calculatedAttackRollModifier = parseRollable(
        attackModifierRoll,
        rollableConfig,
      );
      const attackRollModifierHelpString = calculatedAttackRollModifier
        .map((cur, i) => {
          const formattedVal = i === 0 ? cur : addNumberSign(cur, ' ');
          return `${formattedVal} (${attackModifierRollDescription[i]})`;
        })
        .join('');

      return {
        attackRollModifierString,
        attackRollModifierHelpString,
      };
    }, [attackModifierRoll, attackModifierRollDescription, rollableConfig]);

  const onRollAttack = useCallback(
    (e) => {
      e.stopPropagation();
      onRoll(attackRoll, {
        type: ChatType.ATTACK,
        critRange: attackCritRange,
        label: label,
        labelSuffix: wrapInParens(
          addNumberSign(calculateRollable(attackModifierRoll, rollableConfig)),
        ),
        description: range,
        followUp: damageRollFollowups,
      });
    },
    [
      attackCritRange,
      attackModifierRoll,
      attackRoll,
      damageRollFollowups,
      label,
      onRoll,
      range,
      rollableConfig,
    ],
  );

  return (
    <div className={styles['header']}>
      <div className={styles['attack-roll-header']} onClick={onRollAttack}>
        <span className={classNameBuilder('attack-name-label', 'label')}>
          {label}
        </span>
        <span className={classNameBuilder('attack-mod-label', 'label')}>
          {attackIsEnabled && <Tooltip>{attackRollModifierHelpString}</Tooltip>}
          {attackIsEnabled
            ? attackRollModifierString
            : attackDCDescription || '-'}
        </span>
      </div>
      <span className={classNameBuilder('damage-label', 'label')}>
        <Tooltip>{damageRollDescription}</Tooltip>
        {damageRollDescription}
      </span>
    </div>
  );
};
