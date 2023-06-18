import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import styles from './metadata.module.scss';
import { entries } from 'lodash';
import { CLASS_CONFIGS } from 'constants/classes';
import { Tag } from 'common/components/Tag/Tag';
import { RACE_CONFIGS } from 'constants/race';

export const Metadata = () => {
  const { levels, race, alignment, profBonus } = useCharacterSheet();

  return (
    <div className={styles['container']}>
      <h3>Metadata</h3>
      <Tag
        label="Level"
        value={
          <span>
            {entries(levels)
              .sort((a, b) => (a[1].isMain ? -1 : b[1].isMain ? 1 : 0))
              .map(
                ([classType, { total }]) =>
                  `${total} (${CLASS_CONFIGS[classType].label})`,
              )
              .join(', ')}
          </span>
        }
      />
      <Tag label={'PB'} value={profBonus} />
      <Tag label={'Race'} value={RACE_CONFIGS[race].label} />
      <Tag label={'Alignment'} value={alignment} />
    </div>
  );
};
