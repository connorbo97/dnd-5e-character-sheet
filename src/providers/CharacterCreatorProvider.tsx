import { STATE_SELECTOR_PATH, createReduxStateContext } from 'utils/reduxUtils';
import {
  CHARACTER_CREATOR_PATHS_LIST,
  CHARACTER_CREATOR_REDUCER_NAME,
  EMPTY_FORM,
} from 'constants/characterCreator';
import { calcCharacterSheet } from 'utils/characterCreatorUtils';
import { useMemo } from 'react';

const { reducer, actions, provider, useContext, useContextPath } =
  createReduxStateContext(
    CHARACTER_CREATOR_REDUCER_NAME,
    EMPTY_FORM,
    CHARACTER_CREATOR_PATHS_LIST,
  );

export const characterCreatorReducer = reducer;
export const characterCreatorActions = actions;
export const CharacterCreatorProvider = provider;
export const useCharacterCreator = useContext;
export const useCharacterCreatorPath = useContextPath;
export const useCharacterCreatorSheet = () => {
  const [form] = useCharacterCreatorPath(STATE_SELECTOR_PATH);

  return useMemo(() => calcCharacterSheet(form), [form]);
};
// export const CharacterCreatorPathHooks = mapValues(
//   CHARACTER_CREATOR_PATHS,
//   (p) => () => useCharacterCreatorPath(p),
// );
