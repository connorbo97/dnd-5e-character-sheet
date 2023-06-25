import { CHARACTER_CREATOR_REDUCER_NAME } from 'constants/characterCreator';
import { characterCreatorReducer } from 'providers/CharacterCreatorProvider';

export const reducers = {
  reducer: {
    [CHARACTER_CREATOR_REDUCER_NAME]: characterCreatorReducer,
  },
};
