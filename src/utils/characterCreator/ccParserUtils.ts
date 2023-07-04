import { CreateConfigEntry } from 'constants/characterCreatorSections';
import { ProficiencyConfig } from 'constants/general';
import { IGNORE_PATH, MULTI_PATH } from 'constants/raceTypes';
import {
  entries,
  get,
  identity,
  isNil,
  mapValues,
  set,
  stubTrue,
  update,
} from 'lodash';

export enum CharacterCreatorValidationType {
  REQUIRED = 'REQUIRED',
  WARNING = 'WARNING',
}
export type CharacterCreatorValidation = {
  type: CharacterCreatorValidationType;
  text: string;
  index?: number;
};
export const mergeStatBlocks = (blockA, blockB) => {
  if (!blockA) {
    return { ...(blockB || {}) };
  } else if (!blockB) {
    return { ...(blockA || {}) };
  }
  return entries(blockB).reduce(
    (acc, [stat, mod]) => {
      const safeMod = mod || 0;
      if (!isNil(acc[stat])) {
        acc[stat] += safeMod;
      } else {
        acc[stat] = safeMod;
      }

      return acc;
    },
    { ...blockA },
  );
};
export const mergeAllStatBlocks = (blocks) =>
  blocks.reduce((acc, b) => {
    return mergeStatBlocks(acc, b);
  }, {});

export const mergeProficiencies = (
  profA: ProficiencyConfig,
  profB: ProficiencyConfig,
) => {
  let result = { ...profA, ...profB };

  if (profA?.proficient || profB.proficient) {
    result.proficient = true;
  }
  if (profA?.expertise || profB.expertise) {
    result.expertise = true;
  }
  if (profA.mod || profB.mod) {
    result.mod = (profA.mod || 0) + (profB.mod || 0);
  }

  if (profA.category || profB.category) {
    result.category = [profA.category, profB.category].join('/');
  }

  if (profA.source || profB.source) {
    console.log(
      'has source',
      [profA.source, profB.source].filter(identity).join('|'),
    );
    result.source = [profA.source, profB.source].filter(identity).join('|');
  }
  console.log(profA, profB, result);

  return result;
};
export const mergeAllSkillProficiencies = (skills) =>
  skills.filter(identity).reduce((acc, s) => {
    return entries(s).reduce((acc, [key, val]) => {
      if (!acc[key]) {
        acc[key] = val;
      } else {
        acc[key] = mergeProficiencies(acc[key], val as ProficiencyConfig);
      }

      return acc;
    }, acc);
  }, {});

export const mergeOtherProficiencies = (
  otherA: { [s: string]: ProficiencyConfig },
  otherB: { [s: string]: ProficiencyConfig },
) => {
  return entries(otherB).reduce((acc, [key, val]) => {
    if (!acc[key]) {
      acc[key] = val;
    } else {
      acc[key] = mergeProficiencies(acc[key], val);
    }

    return acc;
  }, otherA || {});
};

const DEFAULT_CREATE_CONFIG_HANDLERS = {
  stats: (p, v, result) => {
    const mergedStatBlocks = mergeStatBlocks(result[p], v);
    set(result, p, mergedStatBlocks);
  },
  features: (p, v, result) => {
    update(result, p, (features = []) => [
      ...features,
      ...(Array.isArray(v) ? v : [v]),
    ]);
  },
  skills: (p, v, result) => {
    const curSkills = result[p] || {};
    const newSkills = entries(v).reduce((acc, [stat, config]) => {
      if (!isNil(acc[stat])) {
        acc[stat] = { ...acc[stat], ...(config as Object) };
      } else {
        acc[stat] = config;
      }
      return acc;
    }, curSkills);

    set(result, p, newSkills);
  },
  featChoices: (p, v, result) => {
    update(result, p, (prevCount) => (prevCount || 0) + v);
  },
  otherProficiencies: (p, v, result) => {
    update(result, p, (prev) => mergeOtherProficiencies(prev, v));
  },
};
export const parseCreateConfig = (
  c: CreateConfigEntry,
  allConfigs,
  result,
  validations: Array<CharacterCreatorValidation> = [],
  options: { index?: number; pathHandlers?: object } = {},
) => {
  const { index, pathHandlers = {} } = options;
  const { value, path, config = {}, choiceCondition = stubTrue, optional } = c;
  const {
    getFinalValue,
    isFullValue = (val) => !!val,
    header,
    disableValidation,
    allowPartial,
  } = config;

  if (!choiceCondition(allConfigs)) {
    return;
  } else if (!disableValidation && !optional && !isFullValue(value)) {
    validations.push({
      type: CharacterCreatorValidationType.REQUIRED,
      text: `Missing selection for "${header}"`,
      index,
    });
    if (!allowPartial) {
      return;
    }
  }

  const finalPathHandlers = {
    ...DEFAULT_CREATE_CONFIG_HANDLERS,
    ...pathHandlers,
  };

  const addToResult = (p, v) => {
    if (p === IGNORE_PATH) {
      return;
    }

    if (finalPathHandlers[p]) {
      finalPathHandlers[p](p, v, result);
    } else if (Array.isArray(get(result, p))) {
      update(result, p, (prev) => [...prev, ...v]);
    } else {
      set(result, p, v);
    }
  };

  const finalValue = getFinalValue ? getFinalValue(value) : value;

  if (path === MULTI_PATH) {
    entries(finalValue).forEach(([entryPath, entryValue]) =>
      addToResult(entryPath, entryValue),
    );
  } else {
    addToResult(path, finalValue);
  }
};

export const parseCreateConfigs = (
  configs: Array<CreateConfigEntry>,
  pathHandlers = {},
): [any, Array<CharacterCreatorValidation>] => {
  const result = {};
  const validations = [];

  configs.forEach((c, i) =>
    parseCreateConfig(c, configs, result, validations, {
      index: i,
      pathHandlers,
    }),
  );

  return [result, validations];
};

export const appendSourceToMap = (map, source) =>
  mapValues(map, (v) => ({ ...v, source }));
