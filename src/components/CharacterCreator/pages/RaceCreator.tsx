// @prefix component
// @description

import { useCharacterCreatorPath } from 'providers/CharacterCreatorProvider';
import styles from './raceCreator.module.scss';
import { CHARACTER_CREATOR_PATHS } from 'constants/characterCreator';
import { Dropdown } from 'common/components/Dropdown/Dropdown';
import { StaticRaceSection } from './RaceCreator/StaticRaceSection';
import { ChoiceRaceSection } from './RaceCreator/ChoiceRaceSection';
import { entries, get, isNil, set, update } from 'lodash';
import { RACE_CONFIGS, RACE_OPTIONS } from 'constants/race';
import { MULTI_PATH, RACES } from 'constants/raceTypes';
import { mergeStatBlocks } from 'utils/raceCreatorUtils';

const defaultCheckFullValue = (val) => !!val;

const pathHandler = {
  stats: (p, v, result) => {
    const mergedStatBlocks = mergeStatBlocks(result[p], v);
    set(result, p, mergedStatBlocks);
  },
  features: (p, v, result) => {
    update(result, p, (features = []) => [
      ...features,
      ...(Array.isArray(v) ? v : [v]),
    ]);
  },
  skills: (p, v, result) => {
    const curSkills = result[p] || {};
    const newSkills = entries(v).reduce((acc, [stat, config]) => {
      if (!isNil(acc[stat])) {
        acc[stat] = { ...acc[stat], ...(config as Object) };
      } else {
        acc[stat] = config;
      }
      return acc;
    }, curSkills);
    set(result, p, newSkills);
  },
  featChoices: (p, v, result) => {
    update(result, p, (prevCount) => (prevCount || 0) + v);
  },
};

export const RaceCreator = () => {
  const [, setRace] = useCharacterCreatorPath(CHARACTER_CREATOR_PATHS['race']);
  const [value] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['race.value'],
  );
  const [config = { base: [] }] = useCharacterCreatorPath(
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

  const calcFinalRace = () => {
    let result = {};

    const handleConfig = (c) => {
      const { value, path, config = {} } = c;
      const { getFinalValue, isFullValue = defaultCheckFullValue } = config;

      if (!isFullValue(value)) {
        console.log('MISSING', value, c);
        return;
      }

      const addToResult = (p, v) => {
        if (pathHandler[p]) {
          pathHandler[p](p, v, result);
        } else if (Array.isArray(get(result, p))) {
          update(result, p, (prev) => [...prev, ...v]);
        } else {
          set(result, p, v);
        }
      };

      const finalValue = getFinalValue ? getFinalValue(value) : value;

      if (path === MULTI_PATH) {
        entries(finalValue).forEach(([entryPath, entryValue]) =>
          addToResult(entryPath, entryValue),
        );
      } else {
        addToResult(path, finalValue);
      }
    };
    config?.base.forEach(handleConfig);

    if (subRace) {
      config?.subRace[subRace].forEach(handleConfig);
    } else if (config?.subRaceOptions?.length) {
      console.log('Missing subclass', config);
    }
    console.log(result);
  };

  return (
    <div className={styles['container']}>
      <h1>Race</h1>
      <div>
        <button onClick={() => calcFinalRace()}>CHECK</button>
        <Dropdown
          allowEmpty
          options={RACE_OPTIONS}
          value={value}
          onChange={onSelectRace}
        />
      </div>
      <div className={styles['content']}>
        {config?.base.map((curConfig, index) => {
          const Component =
            curConfig.type === 'STATIC' ? StaticRaceSection : ChoiceRaceSection;
          return (
            <Component
              key={index}
              {...curConfig}
              updatePath={`base.${index}`}
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
