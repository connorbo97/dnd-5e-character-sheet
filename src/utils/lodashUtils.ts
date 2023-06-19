import { fpSet, fpUpdate } from './fpUtils';

export const iSet = (obj, path, val) => {
  return fpSet(path, val, obj);
};

export const iUpdate = (obj, path, updater) => {
  return fpUpdate(path, updater, obj);
};

export const sleep = async (time) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('done'), time);
  });
};
