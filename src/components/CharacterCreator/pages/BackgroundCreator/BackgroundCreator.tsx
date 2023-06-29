import { useCharacterCreatorPath } from 'providers/CharacterCreatorProvider';
import styles from './backgroundCreator.module.scss';
import {} from 'constants/race/commonCreatorConfigs';
import { CHARACTER_CREATOR_PATHS } from 'constants/characterCreator';
import { ChoiceSection } from '../common/ChoiceSection';
import {
  BACKGROUND_CLOTHES_CONFIG,
  BACKGROUND_SKILL_CONFIG,
  BACKGROUND_TOOL_PROFICIENCY_CONFIG,
} from 'constants/backgrounds';

type Props = any;
export const BackgroundCreator = (props: Props) => {
  const [background, , updateBackground] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['background'],
  );
  const [name, setName] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['background.name'],
  );
  const [summary, setSummary] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['background.summary'],
  );
  const [gold, setGold] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['background.gold'],
  );
  const [specialFeatureLabel, setSpecialFeatureLabel] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['background.specialFeature.label'],
  );
  const [specialFeatureDescription, setSpecialFeatureDescription] =
    useCharacterCreatorPath(
      CHARACTER_CREATOR_PATHS['background.specialFeature.description'],
    );
  // const [skills, , updateSkills] = useCharacterCreatorPath(
  //   CHARACTER_CREATOR_PATHS['background.config'],
  // );
  console.log(background);

  return (
    <div className={styles['container']}>
      <h1>Background</h1>
      <div className={styles['summary']}>
        {
          "Your character's background is largely dependent on the setting and story.\n\nYour character's past experiences can be boiled down into some basic equipment, a special feature, skills, and a couple sentences.\n\nTalk with the DM if you want to start with something that does not show up in this section."
        }
      </div>
      <h3>Summary</h3>
      <input
        className={styles['label']}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Background Name"
      />
      <textarea
        className={styles['summary']}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={4}
        placeholder={
          'Background Description\ne.g, I grew up poor and decided to see what the rest of the world had to offer me.\n\nI grabbed my cloak and my savings and hit the road. I did odd jobs for small villages and lived off the land.'
        }
      />
      <h3>Starting Gold</h3>
      <i>Recommended: 5 - 25. 10 is average (1 GP ~ $20)</i>
      <input
        className={styles['gold']}
        value={gold}
        onChange={(e) => {
          const raw = e.target.value;
          const val = parseInt(raw);
          if (!raw) {
            setGold(0);
          } else if (val && isNaN(val)) {
            e.target.value = gold;
          } else if (val <= 100 && val >= 0) {
            setGold(val);
            e.target.value = val.toString();
          } else {
            e.target.value = gold;
          }
        }}
        type="number"
        min={0}
        max={100}
      />
      <ChoiceSection
        onUpdate={updateBackground}
        {...BACKGROUND_SKILL_CONFIG}
        updatePath={'skills'}
      />
      <ChoiceSection
        onUpdate={updateBackground}
        {...BACKGROUND_CLOTHES_CONFIG}
        updatePath={'clothes'}
      />
      <ChoiceSection
        onUpdate={updateBackground}
        {...BACKGROUND_TOOL_PROFICIENCY_CONFIG}
        updatePath={'tool'}
      />
      <h3>Equipment</h3>
      <div>
        Add any relevant equipment for your background after character creation.
      </div>
      <h3>Special Feature (Optional)</h3>
      <div className={styles['summary']}>
        {
          "As your character has lived their life, they have become better than the average person at at least one task or skill. This feature encompasses that ability.\n\nTalk with the DM and find a fitting once-per-day or basic feature that exemplifies your character's experiences.\n\nFor example:"
        }
        <ul>
          <li>
            <b>Hoarder (Wanderer):</b>You have a seemingly endless pile of
            garbage in your pack. Within reason, you can pull any amount of
            rubbish or garbage from your pack (stones, twigs, etc.).
          </li>
          <li>
            <b>Puppy Dog Eyes (Beggar):</b> Once per long rest, you may gain
            advantage on a Persuasion check made when bargaining or begging.
          </li>
          <li>
            <b>Steel Nerves (Soldier):</b> Once per long rest, you may gain
            advantage on a Saving Throw against being Frightened or Feared while
            in combat.
          </li>
          <li>
            <b>Sticky Fingers:</b> Once per long rest, you may gain advantage on
            a Dexterity check that involves burglary (pick-pocketing, sneaking
            through a window, etc.)
          </li>
          <li>
            <b>Woah there Bessy (Farmer):</b> Once per long rest, you may gain
            advantage on an Animal Handling check made to calm down a farm
            animal.
          </li>
        </ul>
      </div>
      <input
        className={styles['label']}
        value={specialFeatureLabel}
        onChange={(e) => setSpecialFeatureLabel(e.target.value)}
        placeholder="Steel Nerves"
      />
      <textarea
        className={styles['summary']}
        value={specialFeatureDescription}
        onChange={(e) => setSpecialFeatureDescription(e.target.value)}
        rows={4}
        placeholder={
          'Once per long rest, you may gain advantage on a Saving Throw against being Frightened or Feared while in combat.'
        }
      />
    </div>
  );
};
