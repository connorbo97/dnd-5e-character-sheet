import { useFullSheet } from 'providers/CharacterSheetProvider/useFullSheet';
import styles from './customChecks.module.scss';
import { addNumberSign } from 'utils/stringUtils';
import { getProficiencyBonus } from 'constants/proficiencyUtils';
import { ProficiencyButton } from 'common/components/ProficiencyButton/ProficiencyButton';
import { Dropdown } from 'common/components/Dropdown/Dropdown';
import { ATTACK_STAT_DROPDOWN_OPTIONS } from 'constants/attacks';
import { useChat } from 'providers/ChatProvider';
import { D20_DICE } from 'utils/rollableUtils';
import { ChatType } from 'constants/chat';

export const CustomChecks = () => {
  const {
    getStatModifier,
    customChecks,
    onChangeCustomCheckModByIndex,
    onToggleCustomCheckProficiencyByIndex,
    onChangeCustomCheckStatByIndex,
    profBonus,
  } = useFullSheet();
  const { onRoll } = useChat();

  return (
    <div className={styles['container']}>
      <h3>Custom Checks</h3>
      <div>
        {customChecks.map((check, index) => {
          const modifier =
            getStatModifier(check.stat) +
            getProficiencyBonus(check, profBonus) +
            (check.mod || 0);
          const modifierWithSign = addNumberSign(modifier);
          return (
            <div key={index} className={styles['entry']}>
              <span
                className={styles['section']}
                onClick={() =>
                  onRoll([D20_DICE, modifier], {
                    type: ChatType.BASIC,
                    label: check.label,
                    labelSuffix: `(${modifierWithSign})`,
                  })
                }>{`${check.label} (${modifierWithSign})`}</span>
              <span className={styles['mod']}>
                <ProficiencyButton
                  config={check}
                  onToggle={() => onToggleCustomCheckProficiencyByIndex(index)}
                />
                <span>+</span>
                <Dropdown
                  options={ATTACK_STAT_DROPDOWN_OPTIONS}
                  value={check.stat || null}
                  onChange={(e) =>
                    onChangeCustomCheckStatByIndex(index, e.target.value)
                  }
                />
                <span>+</span>
                <input
                  type="number"
                  min={-99}
                  max={99}
                  placeholder="Mod"
                  value={check.mod || ''}
                  onChange={(e) =>
                    onChangeCustomCheckModByIndex(index, e.target.value)
                  }
                />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
