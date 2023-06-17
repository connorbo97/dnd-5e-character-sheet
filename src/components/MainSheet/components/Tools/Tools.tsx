import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import styles from './tools.module.scss';
import { STATS_CONFIGS } from 'constants/stats';
import { getProficiencyBonus } from 'constants/proficiencyUtils';
import { addNumberSign } from 'utils/stringUtils';

export const Tools = () => {
  const { getStatModifier, tools, onToggleToolProficiency, profBonus } =
    useCharacterSheet();

  return (
    <div className={styles['container']}>
      <h3>Tools</h3>
      <div>
        {Object.entries(tools).map(([toolType, { label, stat }]) => (
          <div key={toolType} onClick={() => onToggleToolProficiency(toolType)}>
            <u>
              {label} ({stat ? STATS_CONFIGS[stat].shortLabel : 'NO STAT'})
            </u>
            <span>
              :{' '}
              {addNumberSign(
                getStatModifier(stat) +
                  getProficiencyBonus(tools[toolType], profBonus),
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
