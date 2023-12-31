import { useCharacterCreatorPath } from 'providers/CharacterCreatorProvider';
import styles from './equipmentCreator.module.scss';
import {
  CHARACTER_CREATOR_PAGES,
  CHARACTER_CREATOR_PATHS,
} from 'constants/characterCreator';
import { CLASS_CONFIGS } from 'constants/classConfigs';
import { CreateSection } from '../common/CreateSection';
import { TextLink } from 'common/components/TextLink/TextLink';

type Props = any;
export const EquipmentCreator = (props: Props) => {
  const [selectedClass] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['class.value'],
  );
  const [config, , updateConfig] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['equipment.config'],
  );

  const classConfig = CLASS_CONFIGS?.[selectedClass];

  return (
    <div className={styles['container']}>
      <h1>Equipment</h1>
      <div className={styles['content']}>
        {!classConfig && (
          <div>
            <p>Please select a class to determine your starting equipment</p>
            <TextLink to={`../${CHARACTER_CREATOR_PAGES.CLASS}`}>
              Go to class page
            </TextLink>
          </div>
        )}
        {classConfig && (
          <>
            <h3>Equipment from Class ({classConfig.label})</h3>
            {config && (
              <CreateSection
                config={config}
                onUpdate={updateConfig}
                shouldDisableBorder={(i) => i !== 0}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
