// @prefix component
// @description

import { useCharacterCreatorPath } from 'providers/CharacterCreatorProvider';
import styles from './raceCreator.module.scss';
import { CHARACTER_CREATOR_PATHS } from 'constants/characterCreator';
import { Dropdown } from 'common/components/Dropdown/Dropdown';
import { RACE_CONFIGS, RACE_OPTIONS } from 'constants/race';
import { RACES } from 'constants/raceTypes';
import { CreateSection } from '../common/CreateSection';
import { RequiredIcon } from 'common/components/RequiredIcon/RequiredIcon';

export const RaceCreator = () => {
  const [, setRace] = useCharacterCreatorPath(CHARACTER_CREATOR_PATHS['race']);
  const [value] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['race.value'],
  );
  const [config = { base: [] }, , updateRaceConfig] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['race.config'],
  );
  const [subRace, setSubRace] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['race.subRace'],
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
      <h1>
        Race <RequiredIcon />
      </h1>
      <div className={styles['race']}>
        <Dropdown
          allowEmpty
          options={RACE_OPTIONS}
          value={value}
          onChange={onSelectRace}
        />
      </div>
      <div className={styles['content']}>
        {config?.base && (
          <CreateSection
            config={config?.base}
            getUpdatePath={(i) => `base.${i}`}
            onUpdate={updateRaceConfig}
          />
        )}
        {config?.subRaceOptions && (
          <div>
            <h2>
              Subrace <RequiredIcon />
            </h2>
            <Dropdown
              allowEmpty
              placeholder="Choose"
              options={config.subRaceOptions}
              value={subRace}
              onChange={(e) => setSubRace(e.target.value)}
            />
          </div>
        )}
        {subRace && config?.subRace[subRace] && (
          <CreateSection
            config={config?.subRace[subRace]}
            getUpdatePath={(i) => `subRace.${subRace}.${i}`}
            onUpdate={updateRaceConfig}
          />
        )}
      </div>
    </div>
  );
};
