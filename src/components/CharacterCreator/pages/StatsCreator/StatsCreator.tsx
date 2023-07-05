import { STATS_CONFIGS, STATS_LIST } from 'constants/stats';
import styles from './statsCreator.module.scss';
import { CHARACTER_CREATOR_PATHS } from 'constants/characterCreator';
import { useCharacterCreatorPath } from 'providers/CharacterCreatorProvider';
import { identity, invert, isNil, values } from 'lodash';
import classnames from 'classnames/bind';
import { useMemo } from 'react';
import { RequiredIcon } from 'common/components/RequiredIcon/RequiredIcon';

const classNameBuilder = classnames.bind(styles);

type Props = any;

const STANDARD_ARRAY = [8, 10, 12, 13, 14, 15];

export const StatsCreator = ({ finalForm }: Props) => {
  const [stats, , updateStats] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['stats'],
  );

  const valToStat = useMemo(() => invert(stats), [stats]);

  const selectedStatsSet = new Set(values(stats).filter(identity));

  return (
    <div className={styles['container']}>
      <h1>Stats</h1>
      <div className={styles['content']}>
        <p>Pick your character stats</p>
        <div className={styles['stats']}>
          {STATS_LIST.map((stat) => (
            <div key={stat} className={styles['stat']}>
              <div>
                <span className={styles['label']}>
                  {STATS_CONFIGS[stat].label}
                </span>
                <RequiredIcon />
              </div>
              <div className={styles['buttons']}>
                {STANDARD_ARRAY.map((val) => (
                  <button
                    key={val}
                    className={classNameBuilder('button', {
                      selected: !isNil(stats[stat]) && val === stats[stat],
                      'other-selected':
                        !isNil(stats[stat]) && val !== stats[stat],
                      used: isNil(stats[stat]) && selectedStatsSet.has(val),
                    })}
                    onClick={() =>
                      updateStats((prev) => {
                        const curStatForVal = valToStat[val];
                        const { [curStatForVal]: remove, ...rest } = prev;

                        return { ...rest, [stat]: val };
                      })
                    }>
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
