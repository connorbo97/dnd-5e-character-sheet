import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import styles from './deathSaves.module.scss';
import { ProficiencyButton } from 'common/components/ProficiencyButton/ProficiencyButton';
import colors from 'styles/colors.module.scss';
import { RollableText } from 'common/components/RollableText/RollableText';
import { D20_DICE } from 'utils/rollableUtils';

export const DeathSaves = () => {
  const {
    deathSaves,
    onToggleDeathSaveByIndex,
    onDeathSaveSuccess,
    onDeathSaveFailure,
  } = useCharacterSheet();
  const { successes, failures } = deathSaves;

  return (
    <div className={styles['container']}>
      <RollableText
        value={<h3>Death Saves</h3>}
        roll={[D20_DICE]}
        chatConfig={{
          label: 'Death Save',
        }}
        onRollEnd={({ value }) => {
          if (value === 1) {
            onDeathSaveFailure(2);
          } else if (value < 10) {
            onDeathSaveFailure();
          } else if (value < 20) {
            onDeathSaveSuccess();
          } else {
            onDeathSaveSuccess(2);
          }
        }}
      />
      <div>
        <div>Successes</div>
        <div className={styles['buttons']}>
          <ProficiencyButton
            config={{ proficient: successes[0] }}
            onToggle={() => onToggleDeathSaveByIndex(0, true)}
            color={colors.green}
          />
          <ProficiencyButton
            config={{ proficient: successes[1] }}
            onToggle={() => onToggleDeathSaveByIndex(1, true)}
            color={colors.green}
          />
          <ProficiencyButton
            config={{ proficient: successes[2] }}
            onToggle={() => onToggleDeathSaveByIndex(2, true)}
            color={colors.green}
          />
        </div>
      </div>
      <div>
        <div>Failures</div>
        <div className={styles['buttons']}>
          <ProficiencyButton
            config={{ proficient: failures[0] }}
            onToggle={() => onToggleDeathSaveByIndex(0)}
            color={colors.red}
          />
          <ProficiencyButton
            config={{ proficient: failures[1] }}
            onToggle={() => onToggleDeathSaveByIndex(1)}
            color={colors.red}
          />
          <ProficiencyButton
            config={{ proficient: failures[2] }}
            onToggle={() => onToggleDeathSaveByIndex(2)}
            color={colors.red}
          />
        </div>
      </div>
    </div>
  );
};
