import { RequiredIcon } from 'common/components/RequiredIcon/RequiredIcon';
import styles from './reviewCreator.module.scss';
import { useSubmitSheet } from 'components/CharacterCreator/hooks/useSubmitSheet';
import {
  CHARACTER_CREATOR_PAGES_LIST,
  CHARACTER_CREATOR_PAGE_CONFIGS,
  NON_REQUIRED_PAGES,
} from 'constants/characterCreator';

type Props = any;
export const ReviewCreator = (props: Props) => {
  const {
    hasErrorValidations,
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
            <div>Ready To Submit!</div>
            <button onClick={onSubmitSheet}>Create Character</button>
          </div>
        )}
        {hasErrorValidations && (
          <div className={styles['validations']}>
            <h2>Please check the following sections</h2>
            {CHARACTER_CREATOR_PAGES_LIST.filter(
              (p) =>
                !NON_REQUIRED_PAGES.has(p) &&
                validationsBySection[p]?.length > 0,
            ).map((p) => (
              <div key={p} className={styles['validation']}>
                <h3>
                  {CHARACTER_CREATOR_PAGE_CONFIGS[p].label}
                  {(warningValidationsBySection[p]?.length || 0) === 0 &&
                    errorValidationsBySection[p]?.length > 0 && (
                      <RequiredIcon />
                    )}
                </h3>
                {warningValidationsBySection[p]?.length > 0 &&
                  errorValidationsBySection[p]?.length > 0 && (
                    <h5>
                      Required <RequiredIcon />
                    </h5>
                  )}
                {errorValidationsBySection[p]?.length > 0 && (
                  <ul>
                    {errorValidationsBySection[p].map((v) => (
                      <li>{v.text}</li>
                    ))}
                  </ul>
                )}
                {warningValidationsBySection[p]?.length > 0 && (
                  <h5>Optional</h5>
                )}
                {warningValidationsBySection[p]?.length > 0 && (
                  <ul>
                    {warningValidationsBySection[p].map((v) => (
                      <li>{v.text}</li>
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
