import { CharacterCreatorForm } from 'constants/characterCreator';
import { calcFinalRace, mergeStatBlocks } from './raceCreatorUtils';
import { get } from 'lodash';

export const calcCharacterSheet = (form: CharacterCreatorForm) => {
  const { race, stats } = form;
  const finalRace = calcFinalRace(
    get(race, 'config', { base: [] }),
    race.value,
    race.subRace,
  );

  const result = {
    stats: mergeStatBlocks(stats, finalRace?.stats || {}),
    race: {
      value: race.value,
      subRace: race.subRace,
    },
  };
  console.log(result);

  return result;
};
