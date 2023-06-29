import { useCharacterCreatorPath } from 'providers/CharacterCreatorProvider';
import { ChoiceRaceSection } from '../RaceCreator/ChoiceRaceSection';
import styles from './backgroundCreator.module.scss';
import { getChoiceSkillProficiencies } from 'constants/race/commonRace';
import { SKILL_OPTIONS } from 'constants/skills';
import { CHARACTER_CREATOR_PATHS } from 'constants/characterCreator';

type Props = any;
export const BackgroundCreator = (props: Props) => {
  const [background, , updateBackground] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['background'],
  );
  console.log(background);
  return (
    <div className={styles['container']}>
      <h1>Background</h1>
      <ChoiceRaceSection
        onUpdate={updateBackground}
        {...getChoiceSkillProficiencies(SKILL_OPTIONS, 2)}
        updatePath={'skills'}
      />
    </div>
  );
};
