import { useCharacterCreatorPath } from 'providers/CharacterCreatorProvider';
import styles from './backgroundCreator.module.scss';
import { CHARACTER_CREATOR_PATHS } from 'constants/characterCreator';
import { CreateSection } from '../common/CreateSection';

type Props = any;
export const BackgroundCreator = (props: Props) => {
  const [name, setName] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['background.name'],
  );
  const [config, , updateConfig] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['background.config'],
  );
  const [summary, setSummary] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['background.summary'],
  );
  const [specialFeatureLabel, setSpecialFeatureLabel] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['background.specialFeature.label'],
  );
  const [specialFeatureDescription, setSpecialFeatureDescription] =
    useCharacterCreatorPath(
      CHARACTER_CREATOR_PATHS['background.specialFeature.description'],
    );

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
      <CreateSection config={config} onUpdate={updateConfig} />
      <div className={styles['special-feature']}>
        <h3>Special Feature (Optional)</h3>
        <div className={styles['summary']}>
          {
            "As your character has lived their life, they have become better than the average person at at least one task or skill. This feature encompasses that ability.\n\nTalk with the DM and find a fitting once-per-day or basic feature that exemplifies your character's experiences.\n\nFor example:"
          }
          <ul>
            <li>
              <b>Former Fame (Retired):</b>You have attracted admiration due to
              your career as a performer, athlete, or adventurer. When visiting
              any region you were most popular, there is a 50 percent chance you
              can find someone there who admires you and is willing to provide
              information and temporary shelter.
            </li>
            <li>
              <b>Hoarder (Wanderer):</b>You have a seemingly endless pile of
              garbage in your pack. Within reason, you can pull any amount of
              rubbish or garbage from your pack (stones, twigs, etc.).
            </li>
            <li>
              <b>Performative Combatant (Gladiator):</b>You are most comfortable
              while in combat. Once per long rest, you can roll a
              Intimidation(Charisma) or Performance(Charisma) with advantage
              while in combat.
            </li>
            <li>
              <b>Puppy Dog Eyes (Beggar):</b>You excel at receiving empathy from
              others. Once per long rest, you may gain advantage on a Persuasion
              check made when bargaining or begging.
            </li>
            <li>
              <b>Steel Nerves (Soldier):</b>You are battle-hardened. Once per
              long rest, you may gain advantage on a Saving Throw against being
              Frightened or Feared while in combat.
            </li>
            <li>
              <b>Sticky Fingers (Criminal):</b>You have a knack for the art of
              theft. Once per long rest, you may gain advantage on a Dexterity
              check that involves burglary (pick-pocketing, sneaking through a
              window, etc.)
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
    </div>
  );
};
