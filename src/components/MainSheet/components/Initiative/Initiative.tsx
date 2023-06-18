import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { addNumberSign, conditionalJoinStrings } from 'utils/stringUtils';
import { STATS } from 'constants/stats';
import styles from './initiative.module.scss';

export const Initiative = () => {
  const { customBonuses, getStatModifier } = useCharacterSheet();
  const { initiative: initiativeBonus = [] } = customBonuses;

  const dexBonus = getStatModifier(STATS.DEX);

  const totalBonus = initiativeBonus.reduce((sum, { value }) => {
    return sum + value;
  }, 0);

  const total = dexBonus + totalBonus;
  return (
    <div className={styles['container']}>
      <h5>Initiative: {total}</h5>
      {/* <div>
        {conditionalJoinStrings([
          dexBonus,
          '(DEX)',
          initiativeBonus
            .map(
              ({ value, source }) => `${addNumberSign(value, ' ')} (${source})`,
            )
            .join(' '),
        ])}
      </div> */}
    </div>
  );
};
