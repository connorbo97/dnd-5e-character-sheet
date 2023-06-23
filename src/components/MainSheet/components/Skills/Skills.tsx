import { SKILLS, SKILL_SORT, SKILL_SORT_OPTIONS } from 'constants/skills';
import styles from './skills.module.scss';
import { STATS } from 'constants/stats';
import { Tag } from 'common/components/Tag/Tag';
import { Skill } from './Skill';
import { useFullSheet } from 'providers/CharacterSheetProvider/useFullSheet';
import { getProficiencyBonus } from 'constants/proficiencyUtils';
import { Dropdown } from 'common/components/Dropdown/Dropdown';

export const Skills = () => {
  const {
    skills,
    skillSort,
    orderedSkillEntries,
    onChangeSkillSort,
    getStatModifier,
    profBonus,
  } = useFullSheet();

  let prevStat: STATS | null = null;
  let addStatLabel = false;

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h3>Skills</h3>
        <Dropdown
          options={SKILL_SORT_OPTIONS}
          value={skillSort}
          onChange={(e) => onChangeSkillSort(e.target.value)}
        />
      </div>
      <div className={styles['skills']}>
        {orderedSkillEntries.map(([skillType, config]) => {
          if (skillSort === SKILL_SORT.ABILITY && config.stat !== prevStat) {
            prevStat = config.stat;
            addStatLabel = true;
          } else {
            addStatLabel = false;
          }
          return (
            <Skill
              config={config}
              type={skillType}
              key={skillType}
              addStatLabel={addStatLabel}
            />
          );
        })}
        <br />
        <Tag
          label="Passive Perception"
          labelClassName={styles['passive-label']}
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
