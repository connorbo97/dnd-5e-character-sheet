import {
  CharacterClassForm,
  CharacterCreatorForm,
  CharacterEquipmentForm,
} from 'constants/characterCreator';
import { concat, get, identity, stubTrue } from 'lodash';
import memoizeOne from 'memoize-one';
import { BACKGROUND_SKILL_CONFIG } from 'constants/backgrounds';
import {
  CharacterCreatorValidation,
  CharacterCreatorValidationType,
  mergeStatBlocks,
  parseCreateConfig,
  parseCreateConfigs,
} from './characterCreator/ccParserUtils';
import { CHARACTER_CREATOR_PAGES } from 'components/CharacterCreator/CharacterCreator';
import { RaceConfigsCreateConfig } from 'constants/raceTypes';
import { RACE_CONFIGS } from 'constants/race';

const calcFinalBackground = (background) => {
  const { skills, summary, equipment, config } = background;
  const equipmentVal = get(equipment, 'value');
  const skillsVal = get(skills, 'value', {});
  const skillsConfig = BACKGROUND_SKILL_CONFIG.config || {};

  if (
    !equipmentVal ||
    !skillsVal ||
    !(skillsConfig?.isFullValue || stubTrue)(skillsVal)
  ) {
    console.log('missing background', equipmentVal, skillsVal);
  }

  const result = parseCreateConfigs(config);

  return {
    skills: (skillsConfig?.getFinalValue || identity)(skillsVal),
    summary,
    ...result,
  };
};

const calcFinalClass = (rawClass: CharacterClassForm) => {
  const { value, static: staticConfigs = [], config = [] } = rawClass;

  if (!value) {
    console.log('missing class', value, rawClass);
  }
  const result = parseCreateConfigs([...staticConfigs, ...config]);

  return {
    class: value,
    ...result,
  };
};
const calcFinalEquipment = (equipment: CharacterEquipmentForm) => {
  const { config = [] } = equipment;

  if (!config) {
    console.log('missing equipment', config);
  }

  const result = parseCreateConfigs(config);

  return result;
};

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

export const calcCharacterSheet = memoizeOne((form: CharacterCreatorForm) => {
  const { race, stats, bio, background, class: rawClass, equipment } = form;
  const [finalRace, raceValidations] = calcFinalRace(
    get(race, 'config', { base: [] }),
    race.value,
    race.subRace,
  );
  const finalBackground = calcFinalBackground(background);
  const finalClass = calcFinalClass(rawClass);
  const finalEquipment = calcFinalEquipment(equipment);

  const result = {
    stats: mergeStatBlocks(stats, finalRace?.stats || {}),
    race: {
      value: race.value,
      subRace: race.subRace,
    },
    bio,
    background: finalBackground,
    class: finalClass,
    equipment: finalEquipment,
  };

  return {
    sheet: result,
    validationsBySection: {
      [CHARACTER_CREATOR_PAGES.RACE]: raceValidations,
    },
  };
});
