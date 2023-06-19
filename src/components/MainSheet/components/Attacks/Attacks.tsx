import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import styles from './attacks.module.scss';
import { Tag } from 'common/components/Tag/Tag';
import {
  D20_DICE,
  calculateRollable,
  printRollable,
} from 'utils/rollableUtils';
import { RollableText } from 'common/components/RollableText/RollableText';
import { ROLLABLES, Rollable } from 'constants/rollable';
import { isNil } from 'lodash';
import { addNumberSign, wrapInParens } from 'utils/stringUtils';

export const Attacks = () => {
  const { attacks, rollableConfig } = useCharacterSheet();

  return (
    <div className={styles['container']}>
      <h3>Attacks</h3>
      <div>
        {attacks.map(
          (
            { label, source, description, attack, damage = [], savingThrow },
            index,
          ) => {
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

            return (
              <div
                key={`${index}-${label}`}
                className={styles['attack-container']}>
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
                  }}
                />
                {attack && (
                  <Tag
                    label={'attack'}
                    value={
                      <div className={styles['block']}>
                        <Tag label="stat" value={attackStat} />
                        <Tag label="mod" value={attackMod?.value} />
                        <Tag
                          label="proficient"
                          value={proficient ? 'yes' : 'no'}
                        />
                        <Tag label="range" value={range} />
                        <Tag label="crit range" value={critRange} />
                      </div>
                    }
                  />
                )}
                {damage && (
                  <div>
                    {damage.map((d, i) => {
                      const {
                        base,
                        stat: damageStat,
                        mod: damageMod,
                        type,
                        crit,
                      } = d;
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
          },
        )}
      </div>
    </div>
  );
};
