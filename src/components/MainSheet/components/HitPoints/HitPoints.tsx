import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import styles from './hitPoints.module.scss';
import { entries, findKey, partition } from 'lodash';
import { STATS } from 'constants/stats';
import { getDiceAverage, getDiceMax } from 'utils/diceUtils';
import { conditionalJoinStrings } from 'utils/stringUtils';
import { CLASS_CONFIGS } from 'constants/classes';
import { Tag } from 'common/components/Tag/Tag';

export const HitPoints = () => {
  const {
    customBonuses,
    levels,
    hitDice,
    totalLevels,
    tempHp,
    tempMaxHp,
    curHp,
    getStatModifier,

    onChangeCurHp,
    onChangeTempHp,
    onChangeTempMaxHp,
  } = useCharacterSheet();
  const { hp: customHpBonuses } = customBonuses;

  const mainClass = findKey(levels, { isMain: true }) || '';

  const mainClassHp = getDiceMax(CLASS_CONFIGS[mainClass]?.hitDice);
  const hitDiceHp = entries(hitDice).reduce((acc, [diceType, { max }]) => {
    const diceMax =
      diceType === CLASS_CONFIGS[mainClass]?.hitDice ? max - 1 : max;
    return acc + diceMax * getDiceAverage(diceType);
  }, 0);
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
  const totalHp =
    mainClassHp + hitDiceHp + conHp + staticBonusesHp + stackingBonusesHp;

  return (
    <div className={styles['container']}>
      <h5>Hit Points </h5>
      <Tag
        label="HP"
        value={
          <span>
            <input
              className={styles['cur-hp']}
              type="number"
              min={0}
              max={totalHp + tempMaxHp}
              onChange={(e) => onChangeCurHp(parseInt(e.target.value))}
              value={curHp || 0}
            />
            /{totalHp} (Max HP) +
            <input
              className={styles['cur-hp']}
              type="number"
              min={-200}
              max={200}
              onChange={(e) =>
                onChangeTempMaxHp(parseInt(e.target.value), totalHp)
              }
              value={tempMaxHp}
            />{' '}
            (Temp Max HP)
          </span>
        }
      />
      <Tag
        label="Temp HP"
        value={
          <input
            className={styles['cur-hp']}
            type="number"
            min={0}
            max={100}
            onChange={(e) => onChangeTempHp(parseInt(e.target.value))}
            value={tempHp}
          />
        }
      />
      {/* <div>
        {conditionalJoinStrings(
          [
            `${mainClassHp} (Level 1 Hit Dice)`,
            `${hitDiceHp} (Level 1+ Hit Dice)`,
            `${conHp} (CON * LEVEL)`,
            `${staticBonusesHp} (Static Bonuses)`,
            `${stackingBonusesHp} (Stacking Bonuses * Level)`,
          ],
          ' + ',
        )}
      </div> */}
    </div>
  );
};
