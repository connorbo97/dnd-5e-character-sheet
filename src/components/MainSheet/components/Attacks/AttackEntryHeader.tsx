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
import { STATS_CONFIGS } from 'constants/stats';

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
  const { isEnabled: savingThrowIsEnabled, dc, dcSave, effect } = savingThrow;
  const damageIsEnabled = damageRollFollowups.length > 0;

  const {
    attackRoll,
    attackModifierRoll,
    attackDCDescription,
    attackModifierRollDescription,
  } = useMemo(() => {
    let attackRoll: Rollable = [D20_DICE];
    let attackModifierRollDescription: Array<string> = [];

    if (attackIsEnabled) {
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
    }

    const attackModifierRoll = attackRoll.slice(1);

    let attackDCDescription =
      savingThrowIsEnabled && dc
        ? `DC ${calculateRollable([8, ROLLABLES.PB, dc], rollableConfig)}`
        : '';

    return {
      attackRoll,
      attackModifierRoll,
      attackDCDescription,
      attackModifierRollDescription,
    };
  }, [
    attackIsEnabled,
    attackMod?.value,
    attackStat,
    dc,
    proficient,
    rollableConfig,
    savingThrowIsEnabled,
  ]);

  const savingThrowConfig = useMemo(
    () => ({
      type: ChatType.DAMAGE,
      description: effect,
      result: attackDCDescription,
      label: `${STATS_CONFIGS[dcSave].label} Save`,
    }),
    [attackDCDescription, dcSave, effect],
  );

  const { attackRollModifierString, attackRollModifierHelpString } =
    useMemo(() => {
      const attackRollModifierString = addNumberSign(
        simplifyRollable(attackModifierRoll, rollableConfig),
      );
      const attackRollModifierHelpString = parseRollable(
        attackModifierRoll,
        rollableConfig,
      )
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
    async (e) => {
      e.stopPropagation();
      let roll;
      const followUp = savingThrowIsEnabled
        ? [
            {
              roll: null,
              config: { ...savingThrowConfig },
            },
            ...damageRollFollowups,
          ]
        : damageRollFollowups;
      let config;

      if (attackIsEnabled) {
        roll = attackRoll;
        config = {
          type: ChatType.ATTACK,
          critRange: attackCritRange,
          label: label,
          labelSuffix: wrapInParens(
            addNumberSign(
              calculateRollable(attackModifierRoll, rollableConfig),
            ),
          ),
          description: range,
          followUp,
        };

        onRoll(roll, config);
      } else if (savingThrowIsEnabled) {
        roll = null;
        config = savingThrowConfig;
        await onRoll(roll, config);

        for (let i = 0; i < damageRollFollowups.length; i++) {
          await onRoll(damageRollFollowups[i].roll as Rollable, {
            ...damageRollFollowups[i].config,
            isFollowUp: true,
          });
        }
      }
    },
    [
      attackCritRange,
      attackIsEnabled,
      attackModifierRoll,
      attackRoll,
      damageRollFollowups,
      label,
      onRoll,
      range,
      rollableConfig,
      savingThrowConfig,
      savingThrowIsEnabled,
    ],
  );

  const onRollDamage = useCallback(
    async (e) => {
      e.stopPropagation();

      let rolls: Array<ChatEntryFollowUp> = [];

      if (savingThrowIsEnabled) {
        rolls.push({ roll: '', config: savingThrowConfig });
      }

      rolls = [...rolls, ...damageRollFollowups];
      for (let i = 0; i < rolls.length; i++) {
        await onRoll(rolls[i].roll, {
          ...rolls[i].config,
          isFollowUp: i !== 0,
        });
      }
    },
    [damageRollFollowups, onRoll, savingThrowConfig, savingThrowIsEnabled],
  );

  return (
    <div className={styles['header']}>
      <div
        className={classNameBuilder('attack-roll-header', {
          disabled: !attackIsEnabled,
        })}
        onClick={onRollAttack}>
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
      <span
        className={classNameBuilder('damage-label', 'label', {
          disabled: !damageIsEnabled,
        })}
        onClick={onRollDamage}>
        <Tooltip>{damageRollDescription}</Tooltip>
        {damageRollDescription}
      </span>
    </div>
  );
};
