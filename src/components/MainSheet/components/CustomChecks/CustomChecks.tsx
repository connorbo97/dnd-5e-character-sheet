import { useFullSheet } from 'providers/CharacterSheetProvider/useFullSheet';
import styles from './customChecks.module.scss';
import { STATS_CONFIGS } from 'constants/stats';
import { addNumberSign } from 'utils/stringUtils';
import { getProficiencyBonus } from 'constants/proficiencyUtils';

export const CustomChecks = () => {
  const { getStatModifier, customChecks, onToggleToolProficiency, profBonus } =
    useFullSheet();

  return (
    <div className={styles['container']}>
      <h3>Custom Checks</h3>
      <div>
        {customChecks.map(({ label, stat }, index) => (
          <div key={index} onClick={() => onToggleToolProficiency(index)}>
            <u>
              {label} ({stat ? STATS_CONFIGS[stat].shortLabel : 'NO STAT'})
            </u>
            <span>
              :{' '}
              {addNumberSign(
                getStatModifier(stat) +
                  getProficiencyBonus(customChecks[index], profBonus),
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
