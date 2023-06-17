import { addNumberSign } from 'utils/stringUtils';
import styles from './initiative.module.scss';
import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { STATS } from 'constants/stats';

export const Initiative = () => {
  const { getStatModifier } = useCharacterSheet();

  return (
    <div>
      <h3>Initiative</h3>
      <div>{getStatModifier(STATS.DEX)}</div>
    </div>
  );
};
