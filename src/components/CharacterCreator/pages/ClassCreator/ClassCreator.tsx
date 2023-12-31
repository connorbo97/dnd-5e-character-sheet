import { Dropdown } from 'common/components/Dropdown/Dropdown';
import styles from './classCreator.module.scss';
import { CLASS_CONFIGS, CLASS_OPTIONS } from 'constants/classConfigs';
import { useCharacterCreatorPath } from 'providers/CharacterCreatorProvider';
import { CHARACTER_CREATOR_PATHS } from 'constants/characterCreator';
import { CreateSection } from '../common/CreateSection';
import { RequiredIcon } from 'common/components/RequiredIcon/RequiredIcon';
import { useLayoutEffect, useRef } from 'react';

type Props = any;
export const ClassCreator = (props: Props) => {
  const [curClass, setCurClass] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['class.value'],
  );
  const prevClassRef = useRef(curClass);
  // const [staticConfig, setStatic] = useCharacterCreatorPath(
  //   CHARACTER_CREATOR_PATHS['class.static'],
  // );
  const [config, setConfig, updateConfig] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['class.config'],
  );
  const classConfig = CLASS_CONFIGS[curClass];
  const [, setEquipmentConfig] = useCharacterCreatorPath(
    CHARACTER_CREATOR_PATHS['equipment.config'],
  );

  // update the equipment config whenever you change the class
  useLayoutEffect(() => {
    if (
      prevClassRef.current !== curClass &&
      curClass &&
      CLASS_CONFIGS[curClass]?.equipment
    ) {
      setEquipmentConfig(CLASS_CONFIGS[curClass]?.equipment);
    }
    prevClassRef.current = curClass;
  }, [curClass, setEquipmentConfig]);

  const onChangeClass = (e) => {
    setCurClass(e.target.value);
    setConfig(CLASS_CONFIGS[e.target.value]?.levelOneConfig);
  };

  return (
    <div className={styles['container']}>
      <h1>
        Class <RequiredIcon />
      </h1>
      <div className={styles['class-dropdown']}>
        <Dropdown
          allowEmpty
          options={CLASS_OPTIONS}
          value={curClass}
          onChange={onChangeClass}
          placeholder="Choose"
        />
      </div>
      {curClass && (
        <h1 className={styles['class-header']}>
          {classConfig?.label || curClass}
        </h1>
      )}
      {config && (
        <CreateSection
          config={config}
          onUpdate={updateConfig}
          formPath={CHARACTER_CREATOR_PATHS['class']}
        />
      )}
    </div>
  );
};
// const staticArmorProficiencies = staticConfig?.proficiencies?.armor;
// const staticWeaponProficiencies = staticConfig?.proficiencies?.weapon;
// const staticSavingThrowProficiencies =
//   staticConfig?.proficiencies?.savingThrow;
// const staticFeatures = staticConfig?.features;
/* {staticConfig && (
        <div className={styles['static']}>
          {(staticArmorProficiencies ||
            staticWeaponProficiencies ||
            staticSavingThrowProficiencies) && <h3>Proficiencies</h3>}
          {staticArmorProficiencies && (
            <span>
              <b>Armor: </b>
              {values(staticArmorProficiencies)
                .map((v) => v.label)
                .join(', ')}
            </span>
          )}
          {staticWeaponProficiencies && (
            <span>
              <b>Weapon: </b>
              {values(staticWeaponProficiencies)
                .map((v) => v.label)
                .join(', ')}
            </span>
          )}
          {staticSavingThrowProficiencies && (
            <span>
              <b>Saving Throws: </b>
              {keys(staticSavingThrowProficiencies)
                .map((s) => STATS_CONFIGS[s].label)
                .join(', ')}
            </span>
          )}
          {staticFeatures && (
            <CreateSection config={staticFeatures} onUpdate={noop} />
          )}
        </div>
      )} */
