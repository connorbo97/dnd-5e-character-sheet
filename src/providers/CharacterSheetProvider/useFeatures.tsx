import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { iSet } from 'utils/lodashUtils';

export const useFeatures = () => {
  const { sheet, setSheet } = useCharacterSheet();
  const { features } = sheet;

  const onChangeFeaturePropertyByIndex = (index, property, value) => {
    setSheet((prevSheet) =>
      iSet(prevSheet, `features.${index}.${property}`, value),
    );
  };
  const onChangeFeatureLabelByIndex = (index, value) => {
    onChangeFeaturePropertyByIndex(index, 'label', value);
  };
  const onChangeFeatureSourceByIndex = (index, value) => {
    onChangeFeaturePropertyByIndex(index, 'source', value);
  };
  const onChangeFeatureSourceLabelByIndex = (index, value) => {
    onChangeFeaturePropertyByIndex(index, 'sourceLabel', value);
  };
  const onChangeFeatureDescriptionByIndex = (index, value) => {
    onChangeFeaturePropertyByIndex(index, 'label', value);
  };

  return {
    features,
    onChangeFeatureDescriptionByIndex,
    onChangeFeatureLabelByIndex,
    onChangeFeatureSourceByIndex,
    onChangeFeatureSourceLabelByIndex,
  };
};
