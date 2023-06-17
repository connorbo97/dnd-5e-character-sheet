import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import styles from './hitPoints.module.scss';
import { entries, partition } from 'lodash';
import { STATS } from 'constants/stats';
import { getDiceAverage } from 'utils/diceUtils';
import { conditionalJoinStrings } from 'utils/stringUtils';

export const HitPoints = () => {
  const { customBonuses, hitDice, totalLevels, getStatModifier } =
    useCharacterSheet();
  const { hp: customHpBonuses } = customBonuses;

  const hitDiceHp = entries(hitDice).reduce(
    (acc, [diceType, { max }]) => acc + max * getDiceAverage(diceType),
    0,
  );
  const conHp = totalLevels * getStatModifier(STATS.CON);
  const [staticBonuses, stackingBonuses] = partition(
    customHpBonuses,
    (bonus) => bonus.isStatic,
  );
  const staticBonusesHp = staticBonuses.reduce(
    (acc, { value }) => acc + value,
    0,
  );
  const stackingBonusesHp = stackingBonuses.reduce(
    (acc, { value }) => acc + value * totalLevels,
    0,
  );
  const totalHp = hitDiceHp + conHp + staticBonusesHp + stackingBonusesHp;
  return (
    <div className={styles['container']}>
      <h3>Hit Points</h3>
      <h5>{totalHp}</h5>
      <div>
        {conditionalJoinStrings(
          [
            `${hitDiceHp} (Hit Dice)`,
            `${conHp} (CON)`,
            `${staticBonusesHp} (Static Bonuses)`,
            `${stackingBonusesHp} (Stacking Bonuses)`,
          ],
          ' + ',
        )}
      </div>
    </div>
  );
};
