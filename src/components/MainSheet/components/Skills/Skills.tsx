import { SKILL_CONFIGS } from 'constants/skills';
import styles from './skills.module.scss';
import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { STATS_CONFIGS } from 'constants/stats';
import { getProficiencyBonus } from 'constants/proficiencyUtils';
import { addNumberSign } from 'utils/stringUtils';
import { ProficiencyButton } from 'common/components/ProficiencyButton/ProficiencyButton';

export const Skills = () => {
  const {
    skills: playerSkills,
    onToggleSkillProficiency,
    getStatModifier,
    profBonus,
  } = useCharacterSheet();

  return (
    <div className={styles['container']}>
      <h3>Skills</h3>
      <div>
        {Object.entries(SKILL_CONFIGS).map(([skillType, { label, stat }]) => (
          <div key={skillType}>
            <u>
              {label} ({STATS_CONFIGS[stat].shortLabel})
            </u>
            <ProficiencyButton
              config={playerSkills[skillType]}
              onToggle={() => onToggleSkillProficiency(skillType)}
            />
            <span>
              :{' '}
              {addNumberSign(
                getStatModifier(stat) +
                  getProficiencyBonus(playerSkills[skillType], profBonus),
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
