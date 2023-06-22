import { Tag } from 'common/components/Tag/Tag';
import attackEntryStyles from './attackEntry.module.scss';
import styles from './attackEntryAttack.module.scss';
import { ProficiencyButton } from 'common/components/ProficiencyButton/ProficiencyButton';
import { useAttacks } from 'providers/CharacterSheetProvider/useAttacks';
import { ATTACK_STAT_DROPDOWN_OPTIONS } from 'constants/attacks';
import { Dropdown } from 'common/components/Dropdown/Dropdown';

export const AttackEntryAttack = ({ attackIndex }) => {
  const {
    attacks,
    onToggleIsEnabled,
    onChangeAttackStatByIndex,
    onChangeAttackModByIndex,
    onChangeAttackRangeByIndex,
    onChangeAttackCritRangeByIndex,
    onToggleAttackProficiencyByIndex,
  } = useAttacks();
  const {
    isEnabled: attackIsEnabled,
    stat: attackStat,
    mod: attackMod,
    proficient,
    range,
    critRange: attackCritRange,
  } = attacks[attackIndex].attack;

  return (
    <div>
      <span className={attackEntryStyles['section-header']}>
        <ProficiencyButton
          config={{ proficient: attackIsEnabled }}
          onToggle={() => onToggleIsEnabled(attackIndex, `attack`)}
        />
        <h5>Attack Roll</h5>
      </span>
      <div className={attackEntryStyles['block']}>
        <Tag
          label="stat"
          value={
            <Dropdown
              options={ATTACK_STAT_DROPDOWN_OPTIONS}
              value={attackStat}
              onChange={(e) =>
                onChangeAttackStatByIndex(attackIndex, e.target.value)
              }
            />
          }
        />
        <Tag
          label="mod"
          value={
            <input
              placeholder="0"
              value={attackMod?.value}
              min={-100}
              max={100}
              type="number"
              onChange={(e) =>
                onChangeAttackModByIndex(attackIndex, e.target.value)
              }
            />
          }
        />
        <Tag
          label="proficient"
          value={
            <ProficiencyButton
              config={{ proficient: proficient }}
              onToggle={() => onToggleAttackProficiencyByIndex(attackIndex)}
            />
          }
        />
        <Tag
          label="range"
          value={
            <input
              className={styles['range']}
              value={range}
              onChange={(e) =>
                onChangeAttackRangeByIndex(attackIndex, e.target.value)
              }
            />
          }
        />
        <Tag
          label="crit range"
          value={
            <input
              value={attackCritRange}
              placeholder="20"
              min={0}
              max={20}
              type="number"
              onChange={(e) =>
                onChangeAttackCritRangeByIndex(attackIndex, e.target.value)
              }
            />
          }
        />
      </div>
    </div>
  );
};
