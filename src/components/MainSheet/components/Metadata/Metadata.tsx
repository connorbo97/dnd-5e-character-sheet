import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import styles from './metadata.module.scss';
import { entries, identity } from 'lodash';
import { CLASS_CONFIGS } from 'constants/classes';
import { Tag } from 'common/components/Tag/Tag';
import { RACE_CONFIGS } from 'constants/race';
import { BACKGROUND_CONFIGS } from 'constants/backgrounds';

export const Metadata = () => {
  const { levels, race, alignment, profBonus, background } =
    useCharacterSheet();
  const raceLabel = RACE_CONFIGS[race.value].label;

  const fullRaceLabel = [race.subRace, raceLabel].filter(identity).join(' ');

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
      <Tag label={'Race'} value={fullRaceLabel} />
      <Tag label={'Alignment'} value={alignment} />
      <Tag
        label={'Background'}
        value={BACKGROUND_CONFIGS[background.value].label}
      />
    </div>
  );
};
