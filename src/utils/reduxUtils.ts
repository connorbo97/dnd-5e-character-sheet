import { createSlice } from '@reduxjs/toolkit';
import { iSet, iUpdate } from './lodashUtils';
import { createSelector } from '@reduxjs/toolkit';
import { get, keyBy, mapValues } from 'lodash';
import { useMemo } from 'react';

//@ts-ignore
export const createReduxSelector = (base, selector, ...args: any) =>
  createSelector(base, selector, ...args);

// (state) =>
// args.reduce((acc, a) => a(acc), state);

export const createReduxSlice = (initialState, name) =>
  createSlice({
    name,
    initialState: {
      value: initialState,
    },
    reducers: {
      setState: (state, action) => {
        state.value = action.payload;
      },
      set: (state, action: any) => {
        state.value = iSet(
          state.value,
          action.payload.path,
          action.payload.value,
        );
      },
      update: (state, action: any) => {
        state.value = iUpdate(
          state,
          `value.${action.payload.path}`,
          action.payload.value,
        );
      },
    },
  });

const DEFAULT_EXTRAS_SELECTORS = [(s) => s];
export const useMemoizedSelector = (
  reducerName,
  selectors = DEFAULT_EXTRAS_SELECTORS,
) =>
  useMemo(() => {
    const [firstSelector, ...rest] = selectors;
    return createReduxSelector(
      (state) => state[reducerName].value,
      firstSelector,
      ...rest,
    );
  }, [reducerName, selectors]);

const createHelperObject = (paths) => keyBy(paths, (p: string) => p);
const createSelectors = (stateSelector, paths) => {
  const result = mapValues(createHelperObject(paths), (p) =>
    createReduxSelector(stateSelector, (state) => get(state, p)),
  );

  return {
    ...result,
    name: createReduxSelector(stateSelector, (state) => state.name),
    state: stateSelector,
  };
};
const createSetters = (dispatch, paths, { set, setState }) => {
  const result = mapValues(
    createHelperObject(paths),
    (p) => (value) => dispatch(set({ value, path: p })),
  );

  return {
    ...result,
    state: (val) => setState(val),
  };
};
const createUpdaters = (dispatch, paths, { update }) => {
  return mapValues(
    createHelperObject(paths),
    (p) => (value) => dispatch(update({ value, path: p })),
  );
};
export const createReduxSliceHelpers = ({
  stateSelector,
  dispatch,
  actions,
  paths,
}) => {
  return {
    selectors: createSelectors(stateSelector, paths),
    setters: createSetters(dispatch, paths, actions),
    updaters: createUpdaters(dispatch, paths, actions),
  };
};
