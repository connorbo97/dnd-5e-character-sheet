import { SKILLS, SKILL_CONFIGS } from 'constants/skills';
import styles from './skills.module.scss';
import { STATS } from 'constants/stats';
import { Tag } from 'common/components/Tag/Tag';
import { Skill } from './Skill';
import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { getProficiencyBonus } from 'constants/proficiencyUtils';

export const Skills = () => {
  const { skills, getStatModifier, profBonus } = useCharacterSheet();

  return (
    <div className={styles['container']}>
      <h3>Skills</h3>
      <div>
        {Object.entries(SKILL_CONFIGS).map(([skillType, config]) => (
          <Skill config={config} type={skillType} key={skillType} />
        ))}
        <br />
        <Tag
          label="Passive Perception"
          value={
            10 +
            getProficiencyBonus(skills[SKILLS.PERCEPTION], profBonus) +
            getStatModifier(STATS.WIS)
          }
        />
      </div>
    </div>
  );
};
