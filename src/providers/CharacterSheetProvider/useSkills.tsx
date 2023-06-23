import { SKILL_CONFIGS, SKILL_SORT } from 'constants/skills';
import { STATS_LIST } from 'constants/stats';
import { entries, findIndex } from 'lodash';
import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback, useMemo } from 'react';
import { iSet, iUpdate } from 'utils/lodashUtils';
import { useStats } from './useStats';
import { getProficiencyBonus } from 'constants/proficiencyUtils';
import { useProfBonus } from './useProfBonus';

export const useSkills = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { getStatModifier } = useStats();
  const { profBonus } = useProfBonus();
  const { skills, skillSort } = sheet;

  const calculateSkillModifier = useCallback(
    (skillType) => {
      return (
        getStatModifier(SKILL_CONFIGS[skillType].stat) +
        getProficiencyBonus(skills[skillType], profBonus)
      );
    },
    [getStatModifier, profBonus, skills],
  );

  const orderedSkillEntries = useMemo(() => {
    let sortFunc;

    if (skillSort === SKILL_SORT.ABILITY) {
      sortFunc = ([aType, aConfig], [bType, bConfig]) => {
        const aConfigStatI = findIndex(STATS_LIST, (s) => s === aConfig.stat);
        const bConfigStatI = findIndex(STATS_LIST, (s) => s === bConfig.stat);

        if (aConfigStatI < bConfigStatI) {
          return -1;
        } else if (aConfigStatI > bConfigStatI) {
          return 1;
        }

        if (aConfig.label < bConfig.label) {
          return -1;
        } else if (aConfig.label > bConfig.label) {
          return 1;
        }

        return 0;
      };
    } else if (skillSort === SKILL_SORT.SCORE) {
      sortFunc = ([aType, aConfig], [bType, bConfig]) => {
        const aMod = calculateSkillModifier(aType);
        const bMod = calculateSkillModifier(bType);

        if (aMod === bMod) {
          return 0;
        }

        return aMod > bMod ? -1 : 1;
      };
    }

    return !sortFunc
      ? entries(SKILL_CONFIGS)
      : entries(SKILL_CONFIGS).sort(sortFunc);
  }, [calculateSkillModifier, skillSort]);

  const onChangeSkill = useCallback(
    (newVal, skill) => {
      setSheet(iSet(sheet, `skills.${skill}`, newVal));
    },
    [setSheet, sheet],
  );
  const onChangeSkillSort = useCallback(
    (newVal) => {
      setSheet(iSet(sheet, `skillSort`, newVal));
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

  return {
    skills,
    onChangeSkill,

    skillSort,
    orderedSkillEntries,
    onChangeSkillSort,

    onToggleSkillProficiency,

    calculateSkillModifier,
  };
};
