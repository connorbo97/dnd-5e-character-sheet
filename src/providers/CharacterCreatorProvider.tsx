import { createReduxStateContext } from 'utils/reduxUtils';
import {
  CHARACTER_CREATOR_PATHS,
  CHARACTER_CREATOR_PATHS_LIST,
  CHARACTER_CREATOR_REDUCER_NAME,
  EMPTY_FORM,
} from 'constants/characterCreator';
import { mapValues } from 'lodash';

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
// export const CharacterCreatorPathHooks = mapValues(
//   CHARACTER_CREATOR_PATHS,
//   (p) => () => useCharacterCreatorPath(p),
// );
