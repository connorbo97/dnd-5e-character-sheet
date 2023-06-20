import { useFullSheet } from 'providers/CharacterSheetProvider/useFullSheet';
import { STATS } from 'constants/stats';
import styles from './initiative.module.scss';
import { RollableText } from 'common/components/RollableText/RollableText';
import { D20_DICE } from 'utils/rollableUtils';
import { addNumberSign, wrapInParens } from 'utils/stringUtils';

export const Initiative = () => {
  const { customBonuses, getStatModifier } = useFullSheet();
  const { initiative: initiativeBonus = [] } = customBonuses;

  const dexBonus = getStatModifier(STATS.DEX);

  const totalBonus = initiativeBonus.reduce((sum, { value }) => {
    return sum + value;
  }, 0);

  const total = dexBonus + totalBonus;
  return (
    <div className={styles['container']}>
      <RollableText
        value={<h5>Initiative:</h5>}
        roll={[D20_DICE, total]}
        chatConfig={{
          label: 'Initiative',
          labelSuffix: wrapInParens(addNumberSign(total)),
        }}
      />
      {total}
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
