import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import styles from './metadata.module.scss';
import { entries } from 'lodash';

export const Metadata = () => {
  const { levels, profBonus } = useCharacterSheet();

  return (
    <div className={styles['container']}>
      <h3>Metadata</h3>
      <div>
        <span>Level: </span>
        <span>
          {entries(levels)
            .sort((a, b) => (a[1].isMain ? -1 : b[1].isMain ? 1 : 0))
            .map(([classType, { total }]) => `${total} (${classType})`)
            .join(', ')}
        </span>
      </div>
      <div>
        <span>PB: </span>
        <span>{profBonus}</span>
      </div>
    </div>
  );
};
