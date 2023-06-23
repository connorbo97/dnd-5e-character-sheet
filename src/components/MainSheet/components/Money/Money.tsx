import styles from './money.module.scss';
import { MONEY_CONFIGS } from 'constants/money';
import { useMoney } from 'providers/CharacterSheetProvider/useMoney';

export const Money = () => {
  const { money, onChangeMoneyByType } = useMoney();

  return (
    <div className={styles['container']}>
      <h3>Money</h3>
      <div className={styles['content']}>
        {Object.entries(MONEY_CONFIGS).map(([moneyType, { shortLabel }]) => (
          <div key={moneyType} className={styles['money-container']}>
            <span className={styles['label']}>{shortLabel}</span>
            <span></span>
            <input
              className={styles['input']}
              type="number"
              min={0}
              max={9999999}
              value={money[moneyType] || 0}
              onChange={(e) => onChangeMoneyByType(moneyType, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
