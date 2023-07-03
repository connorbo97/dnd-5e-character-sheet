import { STATS_CONFIGS } from 'constants/stats';
import { addNumberSign } from './stringUtils';
import { entries } from 'lodash';
import { RaceConfigsCreateConfig } from 'constants/raceTypes';
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

  base.forEach((c) => parseCreateConfig(c, base, result));

  if (selectedSubRace && subRace?.[selectedSubRace]) {
    subRace[selectedSubRace].forEach((c) =>
      parseCreateConfig(c, subRace[selectedSubRace], result),
    );
  } else if (subRaceOptions?.length) {
    console.log('Missing subclass', createConfig);
  }
  // console.log(result);

  return result;
};
