import { filter } from 'lodash';

export const pickOptionsBySet = (options, set) =>
  filter(options, (o) => set.has(o.value));
export const pickOptionsByList = (options, list) =>
  pickOptionsBySet(options, new Set(list));
