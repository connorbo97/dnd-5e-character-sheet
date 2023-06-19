import { getRollableDice } from 'utils/rollableUtils';
import styles from './skill.module.scss';
import { useDiceRoller } from 'providers/DiceRollerProvider';
import { DICE } from 'constants/dice';
import { STATS_CONFIGS } from 'constants/stats';
import { ProficiencyButton } from 'common/components/ProficiencyButton/ProficiencyButton';
import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { addNumberSign } from 'utils/stringUtils';
import { getProficiencyBonus } from 'constants/proficiencyUtils';

export const Skill = ({ type, config }) => {
  const { skills, onToggleSkillProficiency, getStatModifier, profBonus } =
    useCharacterSheet();
  const { onRoll } = useDiceRoller();
  const { stat, label } = config;

  const statModifier =
    getStatModifier(stat) + getProficiencyBonus(skills[type], profBonus);
  const labelStatModifier = addNumberSign(statModifier);

  return (
    <div key={type}>
      <u
        className={styles['label']}
        onClick={() =>
          onRoll([getRollableDice(DICE.d20), statModifier], {
            label: `${label}(${STATS_CONFIGS[stat].shortLabel})`,
            labelSuffix: `(${labelStatModifier})`,
          })
        }>
        {label} ({STATS_CONFIGS[stat].shortLabel})
      </u>
      <ProficiencyButton
        config={skills[type]}
        onToggle={() => onToggleSkillProficiency(type)}
      />
      <span>: {labelStatModifier}</span>
    </div>
  );
};
