// @prefix component
// @description

import { useCharacterCreatorPath } from 'providers/CharacterCreatorProvider';
import styles from './raceCreator.module.scss';
import { CHARACTER_CREATOR_PATHS } from 'constants/characterCreator';
import { Dropdown } from 'common/components/Dropdown/Dropdown';
import { StaticRaceSection } from './RaceCreator/StaticRaceSection';
import { ChoiceRaceSection } from './RaceCreator/ChoiceRaceSection';
import { get, stubTrue } from 'lodash';
import { RACE_CONFIGS, RACE_OPTIONS } from 'constants/race';
import { RACES } from 'constants/raceTypes';
import { calcFinalRace } from 'utils/raceCreatorUtils';

export const RaceCreator = () => {
  const [, setRace] = useCharacterCreatorPath(CHARACTER_CREATOR_PATHS['race']);
  const [value] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['race.value'],
  );
  const [config = { base: [] }, updateRaceConfig] = useCharacterCreatorPath(
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
      <h1>Race</h1>
      <div>
        <button onClick={() => calcFinalRace(config, value, subRace)}>
          CHECK
        </button>
        <Dropdown
          allowEmpty
          options={RACE_OPTIONS}
          value={value}
          onChange={onSelectRace}
        />
      </div>
      <div className={styles['content']}>
        {config?.base.map((curConfig, index) => {
          const shouldRender = get(
            curConfig,
            'choiceCondition',
            stubTrue,
          )(config?.base);

          if (!shouldRender) {
            return null;
          }

          const Component =
            curConfig.type === 'STATIC' ? StaticRaceSection : ChoiceRaceSection;
          return (
            <Component
              key={index}
              {...curConfig}
              updatePath={`base.${index}`}
              onUpdate={updateRaceConfig}
            />
          );
        })}
        {config?.subRaceOptions && (
          <div>
            <h2>Subrace</h2>
            <Dropdown
              allowEmpty
              placeholder="Choose"
              options={config.subRaceOptions}
              value={subRace}
              onChange={(e) => setSubRace(e.target.value)}
            />
          </div>
        )}
        {subRace &&
          config?.subRace[subRace] &&
          config?.subRace[subRace].map((curConfig, index) => {
            const shouldRender = get(
              curConfig,
              'choiceCondition',
              stubTrue,
            )(config?.subRace);

            if (!shouldRender) {
              return null;
            }

            const Component =
              curConfig.type === 'STATIC'
                ? StaticRaceSection
                : ChoiceRaceSection;
            return (
              <Component
                key={index}
                {...curConfig}
                updatePath={`subRace.${subRace}.${index}`}
                isSubRace
              />
            );
          })}
      </div>
    </div>
  );
};
