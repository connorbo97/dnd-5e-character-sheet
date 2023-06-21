import { Tag } from 'common/components/Tag/Tag';
import styles from './attackEntry.module.scss';
import {
  printParsedRollable,
  printRollable,
  simplifyRollable,
} from 'utils/rollableUtils';
import { get, isNil } from 'lodash';
import { ChatEntryFollowUp, ChatEntryInputs, ChatType } from 'constants/chat';
import { RollableText } from 'common/components/RollableText/RollableText';
import { CollapsibleCard } from 'common/components/CollapsibleCard/CollapsibleCard';
import { useMemo } from 'react';
import { ProficiencyButton } from 'common/components/ProficiencyButton/ProficiencyButton';
import { useAttacks } from 'providers/CharacterSheetProvider/useAttacks';
import { useRollableConfig } from 'providers/CharacterSheetProvider/useRollableConfig';
import { AttackEntry as AttackEntryType } from 'constants/attacks';
import { AttackEntryHeader } from './AttackEntryHeader';

interface Props extends AttackEntryType {
  index: number;
}

export const AttackEntry = (props: Props) => {
  const {
    label,
    source,
    description,
    attack,
    damage = [],
    savingThrow,
    index,
  } = props;
  const { rollableConfig } = useRollableConfig();
  const {
    onToggleIsEnabled,
    onChangeAttackDescriptionByIndex,
    onChangeAttackSourceByIndex,
  } = useAttacks();

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

  const { damageRollFollowups, damageRollDescription } = useMemo(() => {
    let damageRollFollowups: Array<ChatEntryFollowUp> = damage
      .filter((d) => d.isEnabled)
      .map((d) => {
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
      });

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

  return (
    <div key={`${index}-${label}`} className={styles['container']}>
      <CollapsibleCard
        header={
          <AttackEntryHeader
            {...props}
            damageRollFollowups={damageRollFollowups}
            damageRollDescription={damageRollDescription}
          />
        }
        contentClassName={styles['content']}>
        <div>
          <span className={styles['section-header']}>
            <ProficiencyButton
              config={{ proficient: attackIsEnabled }}
              onToggle={() => onToggleIsEnabled(index, `attack`)}
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
        {damage.map((d, i) => {
          const {
            base = [],
            isEnabled: damageIsEnabled,
            stat: damageStat,
            mod: damageMod,
            type,
            crit,
            label: damageLabel,
          } = d;

          const damageRoll = get(damageRollFollowups, [i, 'roll']) || [];
          const damageRollConfig =
            get(damageRollFollowups, [i, 'config']) || {};

          return (
            <div key={i}>
              <span className={styles['section-header']}>
                <ProficiencyButton
                  config={{ proficient: damageIsEnabled }}
                  onToggle={() => onToggleIsEnabled(index, `damage.${i}`)}
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
              onToggle={() => onToggleIsEnabled(index, `savingThrow`)}
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
          <textarea
            value={description}
            onChange={(e) =>
              onChangeAttackDescriptionByIndex(index, e.target.value)
            }
          />
        </div>
        <div className={styles['source']}>
          <h5>source</h5>
          <textarea
            value={source}
            onChange={(e) => onChangeAttackSourceByIndex(index, e.target.value)}
          />
        </div>
      </CollapsibleCard>
    </div>
  );
};
