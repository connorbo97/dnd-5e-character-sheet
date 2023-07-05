import { RequiredIcon } from 'common/components/RequiredIcon/RequiredIcon';
import styles from './reviewCreator.module.scss';
import { useSubmitSheet } from 'components/CharacterCreator/hooks/useSubmitSheet';
import {
  CHARACTER_CREATOR_PAGES,
  CHARACTER_CREATOR_PAGES_LIST,
  CHARACTER_CREATOR_PAGE_CONFIGS,
  NON_REQUIRED_PAGES,
} from 'constants/characterCreator';

const ValidationPageList = [
  CHARACTER_CREATOR_PAGES.REVIEW,
  ...CHARACTER_CREATOR_PAGES_LIST.filter(
    (p: any) =>
      !NON_REQUIRED_PAGES.has(p) && p !== CHARACTER_CREATOR_PAGES.REVIEW,
  ),
];
type Props = any;
export const ReviewCreator = (props: Props) => {
  const {
    hasErrorValidations,
    hasWarningValidations,
    onSubmitSheet,
    warningValidationsBySection,
    errorValidationsBySection,
    validationsBySection,
  } = useSubmitSheet();

  return (
    <div className={styles['container']}>
      <h1>Review</h1>
      <div className={styles['content']}>
        {!hasErrorValidations && (
          <div className={styles['submit']}>
            <h2>Ready to Submit!</h2>
            <button onClick={onSubmitSheet}>Create Character</button>
          </div>
        )}
        {(hasErrorValidations || hasWarningValidations) && (
          <div className={styles['validations']}>
            <h2>Missing/Misconfigured Fields</h2>
            {ValidationPageList.filter(
              (p: any) => validationsBySection[p]?.length > 0,
            ).map((p) => (
              <div key={p} className={styles['validation']}>
                <h3>
                  {CHARACTER_CREATOR_PAGE_CONFIGS[p].validationLabel ||
                    CHARACTER_CREATOR_PAGE_CONFIGS[p].label ||
                    p}
                </h3>
                {errorValidationsBySection[p]?.length > 0 && (
                  <ul>
                    {errorValidationsBySection[p].map((v, i) => (
                      <li key={i}>
                        {v.text} <RequiredIcon />
                      </li>
                    ))}
                  </ul>
                )}
                {warningValidationsBySection[p]?.length > 0 && (
                  <ul>
                    {warningValidationsBySection[p].map((v, i) => (
                      <li key={i}>(Optional): {v.text}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
