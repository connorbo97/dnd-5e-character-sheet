import { ProficiencyButton } from 'common/components/ProficiencyButton/ProficiencyButton';
import attackEntryStyles from './attackEntry.module.scss';
import styles from './attackEntrySavingThrow.module.scss';
import { useAttacks } from 'providers/CharacterSheetProvider/useAttacks';
import { Tag } from 'common/components/Tag/Tag';
import { SAVING_THROW_DROPDOWN_OPTIONS } from 'constants/attacks';
import { Dropdown } from 'common/components/Dropdown/Dropdown';
import { STATS_OPTIONS } from 'constants/stats';

export const AttackEntrySavingThrow = ({ attackIndex }) => {
  const {
    attacks,
    onToggleIsEnabled,
    onChangeAttackSavingThrowDCByIndex,
    onChangeAttackSavingThrowDCSaveByIndex,
    onChangeAttackSavingThrowEffectByIndex,
    onChangeAttackSavingThrowFlatDCByIndex,
  } = useAttacks();

  const { savingThrow } = attacks[attackIndex];
  const { isEnabled, dc, dcSave, effect, flatDC } = savingThrow;

  return (
    <div className={attackEntryStyles['saving-throw']}>
      <span className={attackEntryStyles['section-header']}>
        <ProficiencyButton
          config={{ proficient: isEnabled }}
          onToggle={() => onToggleIsEnabled(attackIndex, `savingThrow`)}
        />
        <h5>Saving Throw</h5>
      </span>
      <div className={attackEntryStyles['block']}>
        <Tag
          label="DC Type"
          value={
            <Dropdown
              options={SAVING_THROW_DROPDOWN_OPTIONS}
              value={dc}
              onChange={(e) =>
                onChangeAttackSavingThrowDCByIndex(attackIndex, e.target.value)
              }
            />
          }
        />
        {dc === 'FLAT' && (
          <Tag
            label="Flat DC"
            value={
              <input
                placeholder="10"
                value={flatDC}
                min={-100}
                max={100}
                type="number"
                onChange={(e) =>
                  onChangeAttackSavingThrowFlatDCByIndex(
                    attackIndex,
                    e.target.value,
                  )
                }
              />
            }
          />
        )}
        <Tag
          label="Save Type"
          value={
            <Dropdown
              options={STATS_OPTIONS}
              value={dcSave}
              onChange={(e) =>
                onChangeAttackSavingThrowDCSaveByIndex(
                  attackIndex,
                  e.target.value,
                )
              }
            />
          }
        />
        <Tag
          label="effect"
          value={
            <textarea
              className={styles['effect']}
              value={effect}
              rows={3}
              onChange={(e) =>
                onChangeAttackSavingThrowEffectByIndex(
                  attackIndex,
                  e.target.value,
                )
              }
            />
          }
        />
      </div>
    </div>
  );
};
