import { CreateConfigEntry } from 'constants/characterCreatorSections';
import { IGNORE_PATH, MULTI_PATH } from 'constants/raceTypes';
import { entries, get, set, stubTrue, update } from 'lodash';

export const parseCreateConfig = (c, allConfigs, result, pathHandlers) => {
  const { value, path, config = {}, choiceCondition = stubTrue } = c;
  const { getFinalValue, isFullValue = (val) => !!val } = config;

  if (!choiceCondition(allConfigs)) {
    return;
  } else if (!isFullValue(value)) {
    console.log('MISSING', get(config, 'header'), value, c);
    return;
  }

  const addToResult = (p, v) => {
    if (p === IGNORE_PATH) {
      return;
    }

    if (pathHandlers[p]) {
      pathHandlers[p](p, v, result);
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
) => {
  const result = {};

  configs.forEach((c) => parseCreateConfig(c, configs, result, pathHandlers));

  return result;
};
