import { D20_DICE } from 'utils/rollableUtils';
import styles from './skill.module.scss';
import { STATS_CONFIGS } from 'constants/stats';
import { ProficiencyButton } from 'common/components/ProficiencyButton/ProficiencyButton';
import { useFullSheet } from 'providers/CharacterSheetProvider/useFullSheet';
import { addNumberSign } from 'utils/stringUtils';
import { getProficiencyBonus } from 'constants/proficiencyUtils';
import { RollableText } from 'common/components/RollableText/RollableText';
import { SKILLS } from 'constants/skills';
import { ChatType } from 'constants/chat';

export const Skill = ({ type, config }) => {
  const {
    skills,
    onToggleSkillProficiency,
    getStatModifier,
    profBonus,
    disadvantageStealthCheck,
    disadvantageStealthSource,
  } = useFullSheet();
  const { stat, label } = config;

  const statModifier =
    getStatModifier(stat) + getProficiencyBonus(skills[type], profBonus);
  const labelStatModifier = addNumberSign(statModifier);

  const finalLabel = `${label}(${STATS_CONFIGS[stat].shortLabel})`;
  const isStealthCheck = type === SKILLS.STEALTH;

  return (
    <div key={type} className={styles['container']}>
      <ProficiencyButton
        config={skills[type]}
        onToggle={() => onToggleSkillProficiency(type)}
      />
      <RollableText
        className={styles['label']}
        value={finalLabel + ':'}
        roll={[D20_DICE, statModifier]}
        chatConfig={{
          type: ChatType.BASIC,
          label: finalLabel,
          labelSuffix: `(${labelStatModifier})`,
          descriptionLevel: isStealthCheck ? 'bad' : undefined,
          description: isStealthCheck ? disadvantageStealthSource : undefined,
        }}
        rollOptions={{
          isDisadvantage: isStealthCheck && disadvantageStealthCheck,
        }}
      />
      <span>{labelStatModifier}</span>
    </div>
  );
};
