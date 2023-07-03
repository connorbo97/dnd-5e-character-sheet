import {
  CharacterClassForm,
  CharacterCreatorForm,
} from 'constants/characterCreator';
import { calcFinalRace } from './raceCreatorUtils';
import { get, identity, stubTrue } from 'lodash';
import { BACKGROUND_SKILL_CONFIG } from 'constants/backgrounds';
import {
  mergeStatBlocks,
  parseCreateConfigs,
} from './commonCharacterCreatorUtils';

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

export const calcCharacterSheet = (form: CharacterCreatorForm) => {
  const { race, stats, bio, background, class: rawClass } = form;
  const finalRace = calcFinalRace(
    get(race, 'config', { base: [] }),
    race.value,
    race.subRace,
  );
  const finalBackground = calcFinalBackground(background);
  const finalClass = calcFinalClass(rawClass);

  const result = {
    stats: mergeStatBlocks(stats, finalRace?.stats || {}),
    race: {
      value: race.value,
      subRace: race.subRace,
    },
    bio,
    background: finalBackground,
    class: finalClass,
  };
  console.log(result);

  return result;
};
