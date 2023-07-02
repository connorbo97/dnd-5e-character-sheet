import { CharacterCreatorForm } from 'constants/characterCreator';
import { calcFinalRace, mergeStatBlocks } from './raceCreatorUtils';
import { get, identity, stubTrue } from 'lodash';
import { BACKGROUND_SKILL_CONFIG } from 'constants/backgrounds';
import { InventoryItem } from 'constants/inventory';
import { parseCreateConfigs } from './commonCharacterCreatorUtils';

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
    equipment: [
      {
        label: equipmentVal,
        source: 'Background',
        total: 1,
        weight: 1,
      } as InventoryItem,
    ],
    skills: (skillsConfig?.getFinalValue || identity)(skillsVal),
    summary,
    test: result,
  };
};

export const calcCharacterSheet = (form: CharacterCreatorForm) => {
  const { race, stats, bio, background } = form;
  const finalRace = calcFinalRace(
    get(race, 'config', { base: [] }),
    race.value,
    race.subRace,
  );
  const finalBackground = calcFinalBackground(background);

  const result = {
    stats: mergeStatBlocks(stats, finalRace?.stats || {}),
    race: {
      value: race.value,
      subRace: race.subRace,
    },
    bio,
    background: finalBackground,
  };
  console.log(result);

  return result;
};
