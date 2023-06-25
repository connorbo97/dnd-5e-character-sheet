// @prefix component
// @description

import { useCharacterCreatorPath } from 'providers/CharacterCreatorProvider';
import styles from './raceCreator.module.scss';
import { CHARACTER_CREATOR_PATHS } from 'constants/characterCreator';
import { Dropdown } from 'common/components/Dropdown/Dropdown';
import { RACES, RACE_CONFIGS, RACE_OPTIONS } from 'constants/race';
import { StaticRaceSection } from './RaceCreator/StaticRaceSection';
import { ChoiceRaceSection } from './RaceCreator/ChoiceRaceSection';

export const RaceCreator = () => {
  const [race, setRace] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['race'],
  );
  console.log(race);
  const [value] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['race.value'],
  );
  const [config = []] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['race.config'],
  );

  const onSelectRace = (e) => {
    const newVal = e.target.value;
    const config = RACE_CONFIGS[newVal as RACES]?.createConfig;

    setRace({
      value: newVal,
      config,
    });
  };

  return (
    <div className={styles['container']}>
      <h1>Race</h1>
      <Dropdown
        allowEmpty
        options={RACE_OPTIONS}
        value={value}
        onChange={onSelectRace}
      />
      <div className={styles['content']}>
        {config.map((curConfig, index) => {
          const Component =
            curConfig.type === 'STATIC' ? StaticRaceSection : ChoiceRaceSection;
          return <Component key={index} {...curConfig} index={index} />;
        })}
      </div>
    </div>
  );
};
