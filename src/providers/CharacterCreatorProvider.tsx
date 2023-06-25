import { createReduxStateContext } from 'utils/reduxUtils';
import { CHARACTER_CREATOR_REDUCER_NAME } from 'constants/characterCreator';

const { reducer, actions, provider, useContext, useContextPath } =
  createReduxStateContext(CHARACTER_CREATOR_REDUCER_NAME, { name: 'test' }, [
    'name',
  ]);

export const characterCreatorReducer = reducer;
export const characterCreatorActions = actions;
export const CharacterCreatorProvider = provider;
export const useCharacterCreator = useContext;
export const useCharacterCreatorPath = useContextPath;
