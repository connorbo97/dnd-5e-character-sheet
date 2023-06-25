import {
  useCharacterCreator,
  useCharacterCreatorPath,
} from 'providers/CharacterCreatorProvider';
import { useSelector } from 'react-redux';

export const useFormName = () => {
  const [name, setName, updateName] = useCharacterCreatorPath('name');

  return {
    name,
    setName,
    updateName,
  };
};
export const useFullForm = () => {
  const { selectors } = useCharacterCreator();
  const state = useSelector(selectors.state);

  return {
    form: state,
  };
};
