import { STATS_CONFIGS } from 'constants/stats';
import { addNumberSign } from './stringUtils';
import { entries, isNil, noop, set, update } from 'lodash';
import { IGNORE_PATH, RaceConfigsCreateConfig } from 'constants/raceTypes';
import { parseCreateConfig } from './commonCharacterCreatorUtils';

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

  base.forEach((c) => parseCreateConfig(c, base, result, RACE_PATH_HANDLER));

  if (selectedSubRace && subRace?.[selectedSubRace]) {
    subRace[selectedSubRace].forEach((c) =>
      parseCreateConfig(c, subRace[selectedSubRace], result, RACE_PATH_HANDLER),
    );
  } else if (subRaceOptions?.length) {
    console.log('Missing subclass', createConfig);
  }
  // console.log(result);

  return result;
};
