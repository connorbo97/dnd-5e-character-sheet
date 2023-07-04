import { useCharacterCreatorPath } from 'providers/CharacterCreatorProvider';
import styles from './bioCreator.module.scss';
import { CHARACTER_CREATOR_PATHS } from 'constants/characterCreator';
import { Tag } from 'common/components/Tag/Tag';
import { useMemo } from 'react';
import { Dropdown } from 'common/components/Dropdown/Dropdown';
import { ALIGNMENT_OPTIONS } from 'constants/alignments';
import { RequiredIcon } from 'common/components/RequiredIcon/RequiredIcon';

type Props = any;

const BioFieldInput = ({
  path,
  label,
  isTextarea = false,
  required = false,
  ...rest
}) => {
  const [value = '', setValue] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS[path],
  );

  const Component = useMemo(
    () =>
      isTextarea
        ? (props) => <textarea {...props} />
        : (props) => <input {...props} />,
    [isTextarea],
  );
  return (
    <Tag
      label={
        <>
          {label} {required && <RequiredIcon />}
        </>
      }
      valueClassName={styles['input']}
      value={
        <>
          <br />
          <Component
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...rest}
          />
        </>
      }
    />
  );
};
export const BioCreator = (props: Props) => {
  const [alignment, setAlignment] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['bio.alignment'],
  );

  return (
    <div className={styles['container']}>
      <h1>Bio</h1>
      <div className={styles['content']}>
        <div className={styles['side']}>
          <BioFieldInput
            label="Name"
            path={'bio.name'}
            placeholder="Your Name"
            required
          />
          <Tag
            label={'Alignment'}
            valueClassName={styles['input']}
            value={
              <>
                <br />
                <Dropdown
                  value={alignment}
                  options={ALIGNMENT_OPTIONS}
                  onChange={(e) => setAlignment(e.target.value)}
                  placeholder={'Choose'}
                />
              </>
            }
          />
          <BioFieldInput label="Age" path={'bio.age'} placeholder="20" />
          <BioFieldInput
            label="Height"
            path={'bio.height'}
            placeholder={`5'9"`}
          />
          <BioFieldInput
            label="Weight"
            path={'bio.weight'}
            placeholder={`160`}
          />
          <BioFieldInput label="Eyes" path={'bio.eyes'} placeholder={`brown`} />
          <BioFieldInput label="Hair" path={'bio.hair'} placeholder={`brown`} />
          <BioFieldInput label="Skin" path={'bio.skin'} placeholder={`tan`} />
        </div>
        <div className={styles['side']}>
          <BioFieldInput
            label="Personality Traits"
            path={'bio.personality'}
            isTextarea
            rows={4}
            placeholder={`Ways someone might describe your character when talking about you (Recommended: 3+)\n\nEx: Adventurous, Curious, Loud`}
          />
          <BioFieldInput
            label="Ideals"
            path={'bio.ideals'}
            isTextarea
            rows={4}
            placeholder={`Things your character believes in or is inspired to instill in themselves and others. (Recommended: 1-3)\n\nEx: Faith, Change, Pride`}
          />
          <BioFieldInput
            label="Bonds"
            path={'bio.bonds'}
            isTextarea
            rows={4}
            placeholder={
              'Something that drives your character forward. (Recommended: 1-2)\n\nEx: I strive to become the most accomplished adventurer of all time'
            }
          />
          <BioFieldInput
            label="Flaws"
            path={'bio.flaws'}
            isTextarea
            rows={6}
            placeholder={
              'Things that hold back your character. (Recommended: 1 major and 1+ minor)\n\nEx:\nMajor: I have a fear of heights.\nMinor: Reading is not my strongest skill, and I snore like a Giant.'
            }
          />
        </div>
      </div>
    </div>
  );
};
