import {
  CharacterClassForm,
  CharacterCreatorForm,
  CharacterEquipmentForm,
} from 'constants/characterCreator';
import { calcFinalRace } from './raceCreatorUtils';
import { get, identity, stubTrue } from 'lodash';
import memoizeOne from 'memoize-one';
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
const calcFinalEquipment = (equipment: CharacterEquipmentForm) => {
  const { config = [] } = equipment;

  if (!config) {
    console.log('missing equipment', config);
  }

  const result = parseCreateConfigs(config);

  return result;
};

export const calcCharacterSheet = memoizeOne((form: CharacterCreatorForm) => {
  const { race, stats, bio, background, class: rawClass, equipment } = form;
  const finalRace = calcFinalRace(
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
  console.log(result);

  return result;
});
