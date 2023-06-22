import styles from './attackEntry.module.scss';
import { printParsedRollable, simplifyRollable } from 'utils/rollableUtils';
import { isNil } from 'lodash';
import { ChatEntryFollowUp, ChatEntryInputs, ChatType } from 'constants/chat';
import { CollapsibleCard } from 'common/components/CollapsibleCard/CollapsibleCard';
import { useMemo, useState } from 'react';
import { useAttacks } from 'providers/CharacterSheetProvider/useAttacks';
import { useRollableConfig } from 'providers/CharacterSheetProvider/useRollableConfig';
import { AttackEntry as AttackEntryType } from 'constants/attacks';
import { AttackEntryHeader } from './AttackEntryHeader';
import { Rollable } from 'constants/rollable';
import { AttackEntryAttack } from './AttackEntryAttack';
import { AttackEntryDamage } from './AttackEntryDamage';
import { AttackEntrySavingThrow } from './AttackEntrySavingThrow';

interface Props extends AttackEntryType {
  index: number;
}

export const AttackEntry = (props: Props) => {
  const { label, source, description, damage = [], index } = props;
  const { rollableConfig } = useRollableConfig();
  const {
    onChangeAttackLabelByIndex,
    onChangeAttackDescriptionByIndex,
    onChangeAttackSourceByIndex,
  } = useAttacks();
  const [contentOpen, setContentOpen] = useState(false);

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
          const simplified = simplifyRollable(
            roll as Rollable,
            rollableConfig,
          ).filter((i) => i !== 0);

          return `${printParsedRollable(simplified as Array<string | number>)}${
            config.description ? ' ' + config.description : ''
          }`;
        })
        .join(' + ') || 'None';

    return { damageRollFollowups, damageRollDescription };
  }, [damage, rollableConfig]);

  return (
    <div className={styles['container']}>
      <CollapsibleCard
        header={
          <AttackEntryHeader
            {...props}
            damageRollFollowups={damageRollFollowups}
            damageRollDescription={damageRollDescription}
          />
        }
        open={contentOpen}
        setOpen={setContentOpen}
        contentClassName={styles['content']}>
        <div className={styles['label-input-container']}>
          <input
            value={label}
            placeholder="Attack Name"
            onChange={(e) => onChangeAttackLabelByIndex(index, e.target.value)}
          />
        </div>
        <AttackEntryAttack attackIndex={index} />
        <AttackEntryDamage attackIndex={index} />
        <AttackEntrySavingThrow attackIndex={index} />
        <div className={styles['metadata']}>
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
              onChange={(e) =>
                onChangeAttackSourceByIndex(index, e.target.value)
              }
            />
          </div>
        </div>
      </CollapsibleCard>
    </div>
  );
};
