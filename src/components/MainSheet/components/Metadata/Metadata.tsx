import { useFullSheet } from 'providers/CharacterSheetProvider/useFullSheet';
import styles from './metadata.module.scss';
import { entries, identity } from 'lodash';
import { CLASS_CONFIGS } from 'constants/classConfigs';
import { Tag } from 'common/components/Tag/Tag';
import { RACE_CONFIGS } from 'constants/race';
import { BooleanButton } from 'common/components/ProficiencyButton/BooleanButton';
import { AdvantageToggle } from '../AdvantageToggle/AdvantageToggle';
import { WhisperToggle } from '../WhisperToggle/WhisperToggle';

export const Metadata = () => {
  const {
    levels,
    race,
    alignment,
    profBonus,
    inspiration,
    onToggleInspiration,
    background,
  } = useFullSheet();
  const raceLabel = RACE_CONFIGS[race.value]?.label;

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
        value={background?.label || background?.value || 'None'}
      />
      <Tag
        label={'Inspiration'}
        value={
          <BooleanButton
            value={inspiration}
            onToggle={() => onToggleInspiration()}
          />
        }
      />
      <AdvantageToggle />
      <WhisperToggle />
    </div>
  );
};
