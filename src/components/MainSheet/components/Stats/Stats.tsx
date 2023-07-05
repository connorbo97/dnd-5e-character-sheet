import { useFullSheet } from 'providers/CharacterSheetProvider/useFullSheet';
import styles from './stats.module.scss';
import { STATS, STATS_CONFIGS } from 'constants/stats';
import { getModifier } from 'utils/statUtils';
import { addNumberSign, wrapInParens } from 'utils/stringUtils';
import {
  getProficiencyBonus,
  hasProficiency,
} from 'constants/proficiencyUtils';
import { RollableText } from 'common/components/RollableText/RollableText';
import { D20_DICE, calculateRollable } from 'utils/rollableUtils';
import { ROLLABLES } from 'constants/rollable';
import { ProficiencyButton } from 'common/components/ProficiencyButton/ProficiencyButton';

export const Stats = () => {
  const {
    profBonus,
    stats,
    onChangeStat,
    savingThrows,
    onToggleSavingThrowProficiency,
    rollableConfig,
  } = useFullSheet();
  return (
    <div className={styles['container']}>
      <h3>Stats</h3>
      <div>
        {Object.values(STATS).map((stat) => (
          <div className={styles['stat-container']} key={stat}>
            <RollableText
              className={styles['label']}
              value={`${STATS_CONFIGS[stat].label}:`}
              roll={[D20_DICE, stat as STATS]}
              chatConfig={{
                label: `${STATS_CONFIGS[stat].label} Check`,
                labelSuffix: wrapInParens(
                  addNumberSign(getModifier(stats[stat])),
                ),
              }}
            />
            <div className={styles['content']}>
              <input
                value={stats[stat]}
                onChange={(e) => onChangeStat(e.target.value, stat)}
                type="number"
                min={1}
                max={30}
              />
              <div>{wrapInParens(addNumberSign(getModifier(stats[stat])))}</div>
            </div>
          </div>
        ))}
      </div>
      <h5>Saving Throws</h5>
      <div>
        {Object.values(STATS).map((stat) => (
          <div className={styles['stat-container']} key={stat}>
            <ProficiencyButton
              config={savingThrows[stat]}
              onToggle={() => onToggleSavingThrowProficiency(stat)}
            />
            <RollableText
              className={styles['label']}
              value={`${STATS_CONFIGS[stat].label}:`}
              roll={
                hasProficiency(savingThrows[stats[stat]])
                  ? [D20_DICE, stat as STATS, ROLLABLES.PB]
                  : [D20_DICE, stat as STATS]
              }
              chatConfig={{
                label: `${STATS_CONFIGS[stat].label} Saving Throw`,
                labelSuffix: wrapInParens(
                  addNumberSign(
                    calculateRollable(
                      hasProficiency(savingThrows[stats[stat]])
                        ? [stat as STATS, ROLLABLES.PB]
                        : [stat as STATS],
                      rollableConfig,
                    ),
                  ),
                ),
              }}
            />
            <span>
              {addNumberSign(
                getModifier(stats[stat]) +
                  getProficiencyBonus(savingThrows[stat], profBonus),
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
