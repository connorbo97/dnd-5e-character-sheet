import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import styles from './money.module.scss';
import { MONEY_CONFIGS } from 'constants/money';

export const Money = () => {
  const { money } = useCharacterSheet();
  return (
    <div className={styles['container']}>
      <h3>Money</h3>
      <div className={styles['content']}>
        {Object.entries(MONEY_CONFIGS).map(([moneyType, { shortLabel }]) => (
          <div key={moneyType} className={styles['money-container']}>
            <u>{shortLabel}</u>
            <span>{money[moneyType] || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
