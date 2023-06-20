import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { iUpdate } from 'utils/lodashUtils';

export const useAttacks = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { attacks } = sheet;

  const onToggleIsDisabled = (attackIndex, path) => {
    setSheet((prevSheet) =>
      iUpdate(
        prevSheet,
        ['attacks', attackIndex, path, 'isEnabled'],
        (prev) => !prev,
      ),
    );
  };

  return { attacks, onToggleIsDisabled };
};
