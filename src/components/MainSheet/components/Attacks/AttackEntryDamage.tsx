import { Tag } from 'common/components/Tag/Tag';
import attackEntryStyles from './attackEntry.module.scss';
import styles from './attackEntryDamage.module.scss';
import { printRollable } from 'utils/rollableUtils';
import { useAttacks } from 'providers/CharacterSheetProvider/useAttacks';
import { ProficiencyButton } from 'common/components/ProficiencyButton/ProficiencyButton';
import { useRollableConfig } from 'providers/CharacterSheetProvider/useRollableConfig';
import { DelayedInput } from 'common/components/DelayedInput/DelayedInput';
import { useMemo } from 'react';

export const AttackEntryDamage = ({ attackIndex }) => {
  const {
    attacks,
    onToggleIsEnabled,
    onChangeAttackDamageBaseByIndex,
    onChangeAttackDamageModByIndex,
    onChangeAttackDamageTypeByIndex,
    onChangeAttackDamageCritByIndex,
    onChangeAttackDamageLabelByIndex,
  } = useAttacks();
  const { rollableConfig } = useRollableConfig();
  const damage = attacks[attackIndex].damage;

  const damageBases = useMemo(
    () =>
      [damage[0].base, damage[1].base].map((d) =>
        printRollable(d, rollableConfig),
      ),
    [damage, rollableConfig],
  );
  const critDamages = useMemo(
    () =>
      [damage[0].crit, damage[1].crit].map((c) =>
        printRollable(c || [], rollableConfig),
      ),
    [damage, rollableConfig],
  );
  console.log({ damageBases, critDamages });
  return (
    <>
      {damage.map((d, i) => {
        const {
          isEnabled: damageIsEnabled,
          stat: damageStat,
          mod: damageMod,
          type,
          label: damageLabel,
        } = d;

        return (
          <div key={i}>
            <span className={attackEntryStyles['section-header']}>
              <ProficiencyButton
                config={{ proficient: damageIsEnabled }}
                onToggle={() => onToggleIsEnabled(attackIndex, `damage.${i}`)}
              />
              <h5>{`Damage${i > 0 ? `${i + 1}` : ''}:`}</h5>
            </span>
            <div className={attackEntryStyles['block']}>
              <Tag
                label="base"
                value={
                  <DelayedInput
                    className={styles['input']}
                    value={damageBases[i]}
                    onSubmit={(val) =>
                      onChangeAttackDamageBaseByIndex(attackIndex, i, val)
                    }
                  />
                }
              />
              <Tag label="stat" value={damageStat} />
              <Tag
                label="mod"
                value={
                  <input
                    placeholder="0"
                    value={damageMod?.value || ''}
                    min={-100}
                    max={100}
                    type="number"
                    onChange={(e) =>
                      onChangeAttackDamageModByIndex(
                        attackIndex,
                        i,
                        e.target.value,
                      )
                    }
                  />
                }
              />
              <Tag
                label="type"
                value={
                  <input
                    placeholder="Slashing"
                    value={type || ''}
                    className={styles['input']}
                    onChange={(e) =>
                      onChangeAttackDamageTypeByIndex(
                        attackIndex,
                        i,
                        e.target.value,
                      )
                    }
                  />
                }
              />
              <Tag
                label="crit"
                value={
                  <DelayedInput
                    className={styles['input']}
                    value={critDamages[i]}
                    placeholder="1d6"
                    onSubmit={(val) =>
                      onChangeAttackDamageCritByIndex(attackIndex, i, val)
                    }
                  />
                }
              />
              <Tag
                label="type"
                value={
                  <input
                    placeholder="Name"
                    value={damageLabel || ''}
                    className={styles['input']}
                    onChange={(e) =>
                      onChangeAttackDamageLabelByIndex(
                        attackIndex,
                        i,
                        e.target.value,
                      )
                    }
                  />
                }
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
