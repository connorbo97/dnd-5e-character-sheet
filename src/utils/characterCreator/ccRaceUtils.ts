import { concat } from 'lodash';
import { RaceConfigsCreateConfig } from 'constants/raceTypes';
import {
  CharacterCreatorValidation,
  CharacterCreatorValidationType,
  parseCreateConfig,
} from './ccParserUtils';
import { RACE_CONFIGS } from 'constants/race';

export const calcFinalRace = (
  createConfig: RaceConfigsCreateConfig,
  selectedRace: string = '',
  selectedSubRace: string = '',
) => {
  let result: any = {};

  if (!selectedRace || !RACE_CONFIGS[selectedRace]) {
    return [
      result,
      [
        {
          type: CharacterCreatorValidationType.REQUIRED,
          text: 'Missing race selection',
        },
      ],
    ];
  }

  const { base, subRace, subRaceOptions } = createConfig;

  let validations: Array<CharacterCreatorValidation> = [];
  base.forEach((c) => parseCreateConfig(c, base, result, validations));
  validations.map(({ type, text, index }) => ({
    type,
    text: `Missing ${text} for ${RACE_CONFIGS[selectedRace].label}`,
  }));

  // if theres a subrace and it has a config, start parsing it
  if (selectedSubRace && subRace?.[selectedSubRace]) {
    const subraceValidations = [];
    subRace[selectedSubRace].forEach((c, i) =>
      parseCreateConfig(
        c,
        subRace[selectedSubRace],
        result,
        subraceValidations,
        {
          index: i,
        },
      ),
    );

    subraceValidations.map(({ index, text, type }) => ({
      type,
      text: `Missing ${text} in ${subRace}`,
    }));

    validations = concat(validations, subraceValidations);
    // else if there's no valid subrace and config but it has options, mark it as required
  } else if (subRaceOptions?.length) {
    validations.push({
      type: CharacterCreatorValidationType.REQUIRED,
      text: 'Missing subrace selection',
    });
  }

  return [result, validations];
};
