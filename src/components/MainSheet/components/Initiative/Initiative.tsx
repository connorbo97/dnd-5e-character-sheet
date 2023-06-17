import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { conditionalJoinStrings } from 'utils/stringUtils';
import { STATS } from 'constants/stats';
import styles from './initiative.module.scss';

export const Initiative = () => {
  const { customBonuses, getStatModifier } = useCharacterSheet();
  const { initiative } = customBonuses;
  const initiativeBonus = initiative?.value || 0;
  const initiativeSource = initiative?.source;

  const dexBonus = getStatModifier(STATS.DEX);

  const hasBonus = initiativeBonus !== 0;

  const total = dexBonus + initiativeBonus;
  return (
    <div className={styles['container']}>
      <h3>Initiative</h3>
      <h5>{total}</h5>
      <div>
        {conditionalJoinStrings([
          dexBonus,
          '(DEX)',
          hasBonus && `+ ${initiativeBonus} (${initiativeSource})`,
        ])}
      </div>
    </div>
  );
};
