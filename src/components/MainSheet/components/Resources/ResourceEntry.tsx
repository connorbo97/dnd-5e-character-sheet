import styles from './resourceEntry.module.scss';
import { Tag } from 'common/components/Tag/Tag';
import { ROLLABLES } from 'constants/rollable';
import { isNil } from 'lodash';
import { useProfBonus } from 'providers/CharacterSheetProvider/useProfBonus';

export const ResourceEntry = ({ onChangeTotal, resource, onChangeMax }) => {
  const { profBonus } = useProfBonus();
  const { label, total, max } = resource;
  return (
    <div className={styles['container']}>
      <Tag
        label={label}
        value={
          <span className={styles['inputs']}>
            <input
              type="number"
              value={total || 0}
              min={0}
              max={max === ROLLABLES.PB ? profBonus : max}
              onChange={(e) => onChangeTotal(parseInt(e.target.value))}
            />
            <span>/</span>
            <input
              type="number"
              value={isNil(max) ? total : max}
              min={0}
              max={99999}
              onChange={(e) => onChangeMax(parseInt(e.target.value))}
            />
          </span>
        }
      />
    </div>
  );
};
