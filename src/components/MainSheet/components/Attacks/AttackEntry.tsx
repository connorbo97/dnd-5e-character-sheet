import { Tag } from 'common/components/Tag/Tag';
import styles from './attackEntry.module.scss';
import { ROLLABLES, Rollable } from 'constants/rollable';
import {
  D20_DICE,
  calculateRollable,
  printRollable,
} from 'utils/rollableUtils';
import { isNil } from 'lodash';
import { ChatType } from 'constants/chat';
import { addNumberSign, wrapInParens } from 'utils/stringUtils';
import { RollableText } from 'common/components/RollableText/RollableText';
import { useCharacterSheet } from 'providers/CharacterSheetProvider';

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

  const {
    stat: attackStat,
    mod: attackMod,
    proficient,
    range,
    critRange,
  } = attack || {};
  const { stat: savingThrowStat, dc, effect } = savingThrow || {};

  let attackRoll: Rollable = [D20_DICE];

  if (attackStat) {
    attackRoll.push(attackStat);
  }
  if (!isNil(attackMod?.value)) {
    attackRoll.push(attackMod?.value as number);
  }
  if (proficient) {
    attackRoll.push(ROLLABLES.PB);
  }

  let damageRoll = [];

  const damageChatConfig = {
    type: ChatType.DAMAGE,
    label: label,
    labelSuffix: wrapInParens(
      addNumberSign(calculateRollable(damageRoll.slice(1), rollableConfig)),
    ),
  };

  return (
    <div key={`${index}-${label}`} className={styles['container']}>
      <RollableText
        value={label}
        roll={attackRoll}
        chatConfig={{
          label: label,
          labelSuffix: wrapInParens(
            addNumberSign(
              calculateRollable(attackRoll.slice(1), rollableConfig),
            ),
          ),
          description: range,
          followUp: {
            roll: damageRoll,
            config: damageChatConfig,
          },
        }}
      />
      {attack && (
        <Tag
          label={'attack'}
          value={
            <div className={styles['block']}>
              <Tag label="stat" value={attackStat} />
              <Tag label="mod" value={attackMod?.value} />
              <Tag label="proficient" value={proficient ? 'yes' : 'no'} />
              <Tag label="range" value={range} />
              <Tag label="crit range" value={critRange} />
            </div>
          }
        />
      )}
      {damage && (
        <div>
          {damage.map((d, i) => {
            const { base, stat: damageStat, mod: damageMod, type, crit } = d;
            return (
              <Tag
                key={i}
                label={`damage-${i}`}
                value={
                  <div className={styles['block']}>
                    <Tag
                      label="base"
                      value={printRollable(base, rollableConfig)}
                    />
                    <Tag label="stat" value={damageStat} />
                    <Tag label="mod" value={damageMod?.value} />
                    <Tag label="type" value={type} />
                    <Tag label="crit" value={crit} />
                  </div>
                }
              />
            );
          })}
        </div>
      )}
      {savingThrow && (
        <Tag
          label="saving throw"
          value={
            <div className={styles['block']}>
              <Tag label="stat" value={savingThrowStat} />
              <Tag label="dc" value={dc} />
              <Tag label="effect" value={effect} />
            </div>
          }
        />
      )}
      <Tag label="description" value={description} />
      <Tag label="source" value={source} />
    </div>
  );
};
