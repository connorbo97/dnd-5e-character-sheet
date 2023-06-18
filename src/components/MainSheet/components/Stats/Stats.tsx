import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import styles from './stats.module.scss';
import { STATS_CONFIGS } from 'constants/stats';
import { getModifier } from 'utils/statUtils';
import { addNumberSign } from 'utils/stringUtils';
import {
  getProficiencyBonus,
  hasProficiency,
} from 'constants/proficiencyUtils';

export const Stats = () => {
  const {
    profBonus,
    stats,
    onChangeStat,
    savingThrows,
    onToggleSavingThrowProficiency,
  } = useCharacterSheet();
  return (
    <div className={styles['container']}>
      <h3>Stats</h3>
      <div>
        {Object.entries(stats).map(([stat, value]) => (
          <div className={styles['stat-container']} key={stat}>
            <u className={styles['label']}>{STATS_CONFIGS[stat].label}:</u>
            <div className={styles['content']}>
              <input
                value={value}
                onChange={(e) => onChangeStat(e.target.value, stat)}
                type="number"
                min={1}
                max={30}
              />
              <div>{addNumberSign(getModifier(value))}</div>
              <div>
                <div>
                  <span>
                    <span>Saving Throw:</span>
                    <button
                      onClick={() => onToggleSavingThrowProficiency(stat)}>
                      {hasProficiency(savingThrows[stat]) ? 'O' : 'X'}
                    </button>
                  </span>
                  <span>
                    {addNumberSign(
                      getModifier(value) +
                        getProficiencyBonus(savingThrows[stat], profBonus),
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
