import { concat, isObject, keys } from 'lodash';

export const getAllPaths = (obj): Array<string> => {
  if (!isObject(obj)) {
    return [];
  }

  const objKeys = keys(obj);

  let result: Array<string> = objKeys;

  objKeys.forEach((k) => {
    result = concat(
      result,
      getAllPaths(obj[k]).map((subKey) => `${k}.${subKey}`),
    );
  });

  return result;
};
