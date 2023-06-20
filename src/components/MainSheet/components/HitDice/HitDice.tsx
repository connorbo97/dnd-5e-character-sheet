import { useFullSheet } from 'providers/CharacterSheetProvider/useFullSheet';
import styles from './hitDice.module.scss';
import { RollableText } from 'common/components/RollableText/RollableText';
import { getRollableDice } from 'utils/rollableUtils';
import { DICE } from 'constants/dice';
import { STATS } from 'constants/stats';

export const HitDice = () => {
  const { hitDice, onChangeHitDiceTotalByType } = useFullSheet();

  return (
    <div className={styles['container']}>
      <h3>Hit Dice</h3>
      <div>
        {Object.entries(hitDice).map(([diceType, { total, max }]) => (
          <div key={diceType} className={styles['entry']}>
            <RollableText
              value={`${diceType}:`}
              disabled={total <= 0}
              onRollStart={() =>
                onChangeHitDiceTotalByType(diceType, Math.max(total - 1, 0))
              }
              roll={[getRollableDice(diceType as DICE, 1), STATS.CON]}
              chatConfig={{
                label: `Hit Dice`,
                labelSuffix: `(${diceType})`,
              }}
            />
            <span className={styles['counter']}>
              {total}/{max}
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
