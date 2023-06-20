import { Tag } from 'common/components/Tag/Tag';
import styles from './attackEntry.module.scss';
import { ROLLABLES, Rollable } from 'constants/rollable';
import {
  D20_DICE,
  calculateRollable,
  parseRollable,
  printParsedRollable,
  printRollable,
  simplifyRollable,
} from 'utils/rollableUtils';
import { get, isNil, noop } from 'lodash';
import { ChatEntryFollowUp, ChatEntryInputs, ChatType } from 'constants/chat';
import { RollableText } from 'common/components/RollableText/RollableText';
import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { CollapsibleCard } from 'common/components/CollapsibleCard/CollapsibleCard';
import classnames from 'classnames/bind';
import { addNumberSign, wrapInParens } from 'utils/stringUtils';
import { Tooltip } from 'react-mint';
import { useCallback, useMemo } from 'react';
import { useChat } from 'providers/ChatProvider';
import { ProficiencyButton } from 'common/components/ProficiencyButton/ProficiencyButton';

const classNameBuilder = classnames.bind(styles);

// used to have an array of size 2 for damage types
const DAMAGES_TEMPLATE = [null, null];

export const AttackEntry = (props: any) => {
  const {
    label,
    source,
    description,
    attack,
    damage = [],
    savingThrow,
    index,
  } = props;
  const { rollableConfig } = useCharacterSheet();
  const { onRoll } = useChat();

  const {
    isEnabled: attackIsEnabled,
    stat: attackStat,
    mod: attackMod,
    proficient,
    range,
    critRange: attackCritRange,
  } = attack || {};
  const {
    isEnabled: savingThrowIsEnabled,
    stat: savingThrowStat,
    dc,
    dcSave,
    effect,
  } = savingThrow || {};

  const { damageRollFollowups, damageRollDescription } = useMemo(() => {
    let damageRollFollowups: Array<ChatEntryFollowUp> = (damage || []).map(
      (d) => {
        const {
          base,
          stat: damageStat,
          mod: damageMod,
          type,
          crit,
          label: damageLabel,
        } = d;

        let damageRoll = [...base];

        if (damageStat) {
          damageRoll.push(damageStat);
        }

        if (!isNil(damageMod?.value)) {
          damageRoll.push(damageMod?.value as number);
        }

        const chatConfig: ChatEntryInputs = {
          type: ChatType.DAMAGE,
          description: type,
          label: damageLabel,
        };

        return {
          config: chatConfig,
          critDamage: crit,
          roll: damageRoll,
        };
      },
    );

    const damageRollDescription =
      damageRollFollowups
        .map(({ config, roll }) => {
          const simplified = simplifyRollable(roll, rollableConfig).filter(
            (i) => i !== 0,
          );

          return `${printParsedRollable(simplified)}${
            config.description ? ' ' + config.description : ''
          }`;
        })
        .join(' + ') || 'None';

    return { damageRollFollowups, damageRollDescription };
  }, [damage, rollableConfig]);

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

    let attackDCDescription = dc
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

  const collapsibleHeader = (
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

  return (
    <div key={`${index}-${label}`} className={styles['container']}>
      <CollapsibleCard
        header={collapsibleHeader}
        contentClassName={styles['content']}>
        <div>
          <span className={styles['section-header']}>
            <ProficiencyButton
              config={{ proficient: attackIsEnabled }}
              onToggle={noop}
            />
            <h5>Attack Roll</h5>
          </span>
          <div className={styles['block']}>
            <Tag label="stat" value={attackStat} />
            <Tag label="mod" value={attackMod?.value} />
            <Tag label="proficient" value={proficient ? 'yes' : 'no'} />
            <Tag label="range" value={range} />
            <Tag label="crit range" value={attackCritRange} />
          </div>
        </div>
        {DAMAGES_TEMPLATE.map((unused, i) => {
          const {
            base = [],
            isEnabled: damageIsEnabled,
            stat: damageStat,
            mod: damageMod,
            type,
            crit,
            label: damageLabel,
          } = damage[i] || {};

          const damageRoll = get(damageRollFollowups, [i, 'roll']) || [];
          const damageRollConfig =
            get(damageRollFollowups, [i, 'config']) || {};

          return (
            <div>
              <span className={styles['section-header']}>
                <ProficiencyButton
                  config={{ proficient: damageIsEnabled }}
                  onToggle={noop}
                />
                <RollableText
                  value={`Damage${i > 0 ? `${i + 1}` : ''}:`}
                  disabled={!!damageRollFollowups[i]}
                  roll={damageRoll}
                  chatConfig={{
                    ...damageRollConfig,
                    label: undefined,
                  }}
                />
              </span>
              <div className={styles['block']}>
                <Tag label="base" value={printRollable(base, rollableConfig)} />
                <Tag label="stat" value={damageStat} />
                <Tag label="mod" value={damageMod?.value} />
                <Tag label="type" value={type} />
                <Tag label="crit" value={crit} />
                <Tag label="label" value={damageLabel} />
              </div>
            </div>
          );
        })}
        <div className={styles['saving-throw']}>
          <span className={styles['section-header']}>
            <ProficiencyButton
              config={{ proficient: savingThrowIsEnabled }}
              onToggle={noop}
            />
            <h5>Saving Throw</h5>
          </span>
          <div className={styles['block']}>
            <Tag label="stat" value={savingThrowStat} />
            <Tag label="dc" value={dc} />
            <Tag label="dc save" value={dcSave} />
            <Tag label="effect" value={effect} />
          </div>
        </div>

        <div className={styles['description']}>
          <h5>Description</h5>
          <textarea value={description} />
        </div>
        <div className={styles['source']}>
          <h5>source</h5>
          <textarea value={source} />
        </div>
      </CollapsibleCard>
    </div>
  );
};
