import { PAGES, PAGE_CONFIGS } from 'constants/pages';
import { mapValues, values } from 'lodash';
import { useCharacterCreatorSheet } from 'providers/CharacterCreatorProvider';
import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterCreatorValidationType } from 'utils/characterCreator/ccParserUtils';

export const useSubmitSheet = () => {
  const navigate = useNavigate();
  const { setSheet } = useCharacterSheet();
  const { sheet, validationsBySection } = useCharacterCreatorSheet();
  const {
    errorValidationsBySection,
    warningValidationsBySection,
    hasErrorValidations,
    hasWarningValidations,
  } = useMemo(() => {
    const errorValidationsBySection = mapValues(validationsBySection, (v) =>
      v.filter((v) => v.type === CharacterCreatorValidationType.REQUIRED),
    );
    const warningValidationsBySection = mapValues(validationsBySection, (v) =>
      v.filter((v) => v.type === CharacterCreatorValidationType.WARNING),
    );
    const hasErrorValidations =
      values(errorValidationsBySection).flat().length > 0;
    const hasWarningValidations =
      values(warningValidationsBySection).flat().length > 0;

    return {
      errorValidationsBySection,
      warningValidationsBySection,
      hasErrorValidations,
      hasWarningValidations,
    };
  }, [validationsBySection]);

  const onSubmitSheet = useCallback(() => {
    setSheet(sheet);
    navigate(`/${PAGE_CONFIGS[PAGES.HOME].route}`);
  }, [navigate, setSheet, sheet]);

  return {
    sheet,
    validationsBySection,
    errorValidationsBySection,
    warningValidationsBySection,
    hasErrorValidations,
    hasWarningValidations,
    onSubmitSheet,
  };
};
