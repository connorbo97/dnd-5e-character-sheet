import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback } from 'react';
import { iSet, iUpdate } from 'utils/lodashUtils';

export const useSkills = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { skills } = sheet;

  const onChangeSkill = useCallback(
    (newVal, skill) => {
      setSheet(iSet(sheet, `skills.${skill}`, newVal));
    },
    [setSheet, sheet],
  );

  const onToggleSkillProficiency = useCallback(
    (skill) => {
      setSheet(
        iUpdate(sheet, `skills.${skill}`, (prev) => ({
          ...prev,
          proficient: !prev?.proficient,
        })),
      );
    },
    [setSheet, sheet],
  );

  return { skills, onChangeSkill, onToggleSkillProficiency };
};
