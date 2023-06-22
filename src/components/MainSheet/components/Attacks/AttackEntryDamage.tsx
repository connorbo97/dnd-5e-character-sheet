import { Tag } from 'common/components/Tag/Tag';
import attackEntryStyles from './attackEntry.module.scss';
import styles from './attackEntryDamage.module.scss';
import { printRollable } from 'utils/rollableUtils';
import { useAttacks } from 'providers/CharacterSheetProvider/useAttacks';
import { ProficiencyButton } from 'common/components/ProficiencyButton/ProficiencyButton';
import { useRollableConfig } from 'providers/CharacterSheetProvider/useRollableConfig';

export const AttackEntryDamage = ({ attackIndex, damageRollFollowups }) => {
  const { attacks, onToggleIsEnabled } = useAttacks();
  const { rollableConfig } = useRollableConfig();
  const damage = attacks[attackIndex].damage;

  return (
    <>
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
    </>
  );
};
