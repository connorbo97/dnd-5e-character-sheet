import { createContext, useCallback, useContext, useMemo } from 'react';
import {
  createReduxSelector,
  createReduxSlice,
  createReduxSliceHelpers,
  useMemoizedSelector,
} from 'utils/reduxUtils';
import { useStore } from 'react-redux';
import { noop } from 'lodash';
import { useDispatch } from 'react-redux';
import { CHARACTER_CREATOR_REDUCER_NAME } from 'constants/characterCreator';
import { useSelector } from 'react-redux';

const characterCreatorSlice = createReduxSlice(
  {},
  CHARACTER_CREATOR_REDUCER_NAME,
);
export const characterCreatorReducer = characterCreatorSlice.reducer;
export const characterCreatorActions = characterCreatorSlice.actions;

type CharacterCreatorContextState = {
  getState: Function;
  stateSelector: Function;
  createSelector: Function;
  selectors: { [s: string]: (state: any) => any };
  setters: { [s: string]: Function };
  updaters: { [s: string]: Function };
};
const initialContextState: CharacterCreatorContextState = {
  getState: noop,
  stateSelector: noop,
  createSelector: noop,
  selectors: {},
  setters: {},
  updaters: {},
};
const CharacterCreatorContext = createContext(initialContextState);

export const CharacterCreatorProvider = ({ ...rest }) => {
  const { getState } = useStore();
  const dispatch = useDispatch();
  const stateSelector = useMemoizedSelector(CHARACTER_CREATOR_REDUCER_NAME);
  const createSelector = useCallback(
    (selector, ...args) =>
      createReduxSelector(stateSelector, selector, ...args),
    [stateSelector],
  );

  const helpers = useMemo(
    () =>
      createReduxSliceHelpers({
        stateSelector,
        dispatch,
        actions: characterCreatorActions,
        paths: ['name', 'test', 'mod.source'],
      }),
    [dispatch, stateSelector],
  );
  console.log(helpers);

  const value = useMemo(
    () => ({
      getState,
      stateSelector,
      createSelector,
      ...helpers,
    }),
    [createSelector, getState, stateSelector, helpers],
  );

  return <CharacterCreatorContext.Provider value={value} {...rest} />;
};

export const useCharacterCreator = () => useContext(CharacterCreatorContext);
export const useCharacterCreatorPath = (path) => {
  const { selectors, setters, updaters } = useCharacterCreator();
  const value = useSelector(selectors[path]);
  const set = setters[path];
  const update = updaters[path];

  return [value, set, update];
};
