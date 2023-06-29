import { STATS_CONFIGS } from 'constants/stats';
import { addNumberSign } from './stringUtils';
import { entries, get, isNil, noop, set, stubTrue, update } from 'lodash';
import {
  IGNORE_PATH,
  MULTI_PATH,
  RaceConfigsCreateConfig,
} from 'constants/raceTypes';

export const getStatStringFromEntry = ([type, mod]) =>
  `${STATS_CONFIGS[type].label} ${addNumberSign(mod)}`;

export const getStatStringFromBlock = (stats) =>
  entries(stats).map(getStatStringFromEntry).join(', ');

export const convertCustomStatsToStatBlock = (customStats) =>
  customStats
    .filter(({ value }) => value)
    .reduce((acc, { mod, value }) => {
      acc[value] = (acc[value] || 0) + mod;
      return acc;
    }, {});
export const mergeStatBlocks = (blockA, blockB) => {
  if (!blockA) {
    return { ...(blockB || {}) };
  } else if (!blockB) {
    return { ...(blockA || {}) };
  }
  return entries(blockB).reduce(
    (acc, [stat, mod]) => {
      if (!isNil(acc[stat])) {
        acc[stat] += mod;
      } else {
        acc[stat] = mod;
      }

      return acc;
    },
    { ...blockA },
  );
};

export const RACE_PATH_HANDLER = {
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
  [IGNORE_PATH]: noop,
};

const handleConfig = (c, allConfigs, result) => {
  const { value, path, config = {}, choiceCondition = stubTrue } = c;
  const { getFinalValue, isFullValue = (val) => !!val } = config;

  if (!isFullValue(value)) {
    console.log('MISSING', get(config, 'header'), value, c);
    return;
  }

  const addToResult = (p, v) => {
    if (RACE_PATH_HANDLER[p]) {
      RACE_PATH_HANDLER[p](p, v, result);
    } else if (Array.isArray(get(result, p))) {
      update(result, p, (prev) => [...prev, ...v]);
    } else {
      set(result, p, v);
    }
  };

  const finalValue = getFinalValue ? getFinalValue(value) : value;

  if (!choiceCondition(allConfigs)) {
    // skip this config if it does not meet its choice condition
  } else if (path === MULTI_PATH) {
    entries(finalValue).forEach(([entryPath, entryValue]) =>
      addToResult(entryPath, entryValue),
    );
  } else {
    addToResult(path, finalValue);
  }
};

export const calcFinalRace = (
  createConfig: RaceConfigsCreateConfig,
  selectedRace: string = '',
  selectedSubRace: string = '',
) => {
  if (!selectedRace) {
    console.log('Missing race');
  }

  const { base, subRace, subRaceOptions } = createConfig;
  let result: any = {};

  base.forEach((c) => handleConfig(c, base, result));

  if (selectedSubRace && subRace?.[selectedSubRace]) {
    subRace[selectedSubRace].forEach((c) =>
      handleConfig(c, subRace[selectedSubRace], result),
    );
  } else if (subRaceOptions?.length) {
    console.log('Missing subclass', createConfig);
  }
  // console.log(result);

  return result;
};
