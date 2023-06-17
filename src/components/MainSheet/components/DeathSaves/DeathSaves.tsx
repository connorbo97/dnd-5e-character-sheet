import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import styles from './deathSaves.module.scss';

export const DeathSaves = () => {
  const { deathSaves, onToggleDeathSaveByIndex } = useCharacterSheet();
  const { successes, failures } = deathSaves;

  return (
    <div className={styles['container']}>
      <h3>Death Saves</h3>
      <div>
        <div>Successes</div>
        <div>
          <button onClick={() => onToggleDeathSaveByIndex(0, true)}>
            {successes[0] ? 'X' : 'O'}
          </button>
          <button onClick={() => onToggleDeathSaveByIndex(1, true)}>
            {successes[1] ? 'X' : 'O'}
          </button>
          <button onClick={() => onToggleDeathSaveByIndex(2, true)}>
            {successes[2] ? 'X' : 'O'}
          </button>
        </div>
      </div>
      <div>
        <div>Failures</div>
        <div>
          <button onClick={() => onToggleDeathSaveByIndex(0)}>
            {failures[0] ? 'X' : 'O'}
          </button>
          <button onClick={() => onToggleDeathSaveByIndex(1)}>
            {failures[1] ? 'X' : 'O'}
          </button>
          <button onClick={() => onToggleDeathSaveByIndex(2)}>
            {failures[2] ? 'X' : 'O'}
          </button>
        </div>
      </div>
    </div>
  );
};
