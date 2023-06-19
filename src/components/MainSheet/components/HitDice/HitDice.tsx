import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import styles from './hitDice.module.scss';

export const HitDice = () => {
  const { hitDice, onChangeHitDiceTotalByType } = useCharacterSheet();

  return (
    <div className={styles['container']}>
      <h3>Hit Dice</h3>
      <div>
        {Object.entries(hitDice).map(([diceType, { total, max }]) => (
          <div key={diceType}>
            <span
              onClick={() =>
                onChangeHitDiceTotalByType(diceType, Math.max(total - 1, 0))
              }>
              <u>{diceType}:</u>
              <span>
                {total}/{max}
              </span>
            </span>
            <button onClick={() => onChangeHitDiceTotalByType(diceType, max)}>
              Reset
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
