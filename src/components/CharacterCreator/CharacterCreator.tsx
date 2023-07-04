import { findIndex, get, mapValues, values } from 'lodash';
import styles from './characterCreator.module.scss';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import classnames from 'classnames/bind';
import { useCharacterCreatorSheet } from 'providers/CharacterCreatorProvider';
import { STATS_CONFIGS, STATS_LIST } from 'constants/stats';
import { RequiredIcon } from 'common/components/RequiredIcon/RequiredIcon';
import { CharacterCreatorPages } from './CharacterCreatorPages';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Tooltip } from 'react-mint';
import { CharacterCreatorValidationType } from 'utils/characterCreator/ccParserUtils';
import { CHARACTER_CREATOR_PAGES } from 'constants/characterCreator';
import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { PAGES, PAGE_CONFIGS } from 'constants/pages';

const classNameBuilder = classnames.bind(styles);

const CHARACTER_CREATOR_PAGES_LIST = values(CHARACTER_CREATOR_PAGES);
const NON_PROGRESS_PAGES = new Set([
  CHARACTER_CREATOR_PAGES.START,
  CHARACTER_CREATOR_PAGES.REVIEW,
]);
export const CharacterCreator = () => {
  const match = useMatch('/character-creator/:page');
  const navigate = useNavigate();
  const rawPage = get(match, 'params.page', CHARACTER_CREATOR_PAGES.START);
  const curPage: string = CHARACTER_CREATOR_PAGES_LIST.includes(rawPage)
    ? rawPage
    : CHARACTER_CREATOR_PAGES.START;
  const curPageIndex = findIndex(
    CHARACTER_CREATOR_PAGES_LIST,
    (p) => p === curPage,
  );

  const prevPage = useRef(curPage);

  const [visitedPagesSet, setVisitedPagesSet] = useState(new Set());

  useLayoutEffect(() => {
    const oldPage = prevPage.current;

    if (oldPage !== curPage) {
      setVisitedPagesSet((prev) => {
        if (prev.has(oldPage)) {
          return prev;
        }

        const newSet = new Set(prev);

        return newSet.add(oldPage);
      });
    }
    prevPage.current = curPage;
  }, [curPage]);

  const { sheet, validationsBySection } = useCharacterCreatorSheet();
  const { setSheet } = useCharacterSheet();
  const {
    errorValidationsBySection,
    warningValidationsBySection,
    hasErrorValidations,
  } = useMemo(() => {
    const errorValidationsBySection = mapValues(validationsBySection, (v) =>
      v.filter((v) => v.type === CharacterCreatorValidationType.REQUIRED),
    );
    const warningValidationsBySection = mapValues(validationsBySection, (v) =>
      v.filter((v) => v.type === CharacterCreatorValidationType.WARNING),
    );
    const hasErrorValidations =
      values(errorValidationsBySection).flat().length > 0;

    return {
      errorValidationsBySection,
      warningValidationsBySection,
      hasErrorValidations,
    };
  }, [validationsBySection]);

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        {CHARACTER_CREATOR_PAGES_LIST.map((p) => (
          <Link
            to={p}
            key={p}
            className={classNameBuilder('link', {
              selected: curPage === p,
            })}>
            {p}
            {visitedPagesSet.has(p) && !NON_PROGRESS_PAGES.has(p) && (
              <div
                className={classNameBuilder('validation', {
                  good: (validationsBySection[p]?.length || 0) === 0,
                  warning:
                    warningValidationsBySection[p]?.length &&
                    errorValidationsBySection[p]?.length === 0,
                })}
              />
            )}
            {visitedPagesSet.has(p) && validationsBySection[p]?.length > 0 && (
              <Tooltip position={'bottom'}>
                {errorValidationsBySection[p]?.length > 0 && 'Required'}
                {errorValidationsBySection[p].map(({ text }, i) => (
                  <div key={i}>- {text}</div>
                ))}
                {warningValidationsBySection[p]?.length > 0 && 'Optional'}
                {warningValidationsBySection[p].map(({ text }, i) => (
                  <div key={i}>- {text}</div>
                ))}
              </Tooltip>
            )}
            {visitedPagesSet.has(p) &&
              validationsBySection[p]?.length === 0 && (
                <div className={classNameBuilder('validation', 'good')}></div>
              )}
          </Link>
        ))}
      </div>
      <div className={styles['stat-display']}>
        {STATS_LIST.map((stat) => (
          <div key={stat} className={styles['stat']}>
            <div className={styles['value']}>
              {sheet?.stats?.[stat] || '-'}{' '}
            </div>
            <div className={styles['label']}>{STATS_CONFIGS[stat].label}</div>
          </div>
        ))}
      </div>
      <div className={styles['help-required-text']}>
        <RequiredIcon /> means Required
      </div>
      <div className={styles['content']}>
        <CharacterCreatorPages />
      </div>
      <div className={styles['footer']}>
        <button
          disabled={curPageIndex <= 0}
          onClick={() => {
            navigate(CHARACTER_CREATOR_PAGES_LIST[curPageIndex - 1]);
          }}>
          Back
        </button>
        {curPage === CHARACTER_CREATOR_PAGES.REVIEW ? (
          <button
            disabled={hasErrorValidations}
            onClick={() => {
              setSheet(sheet);
              navigate(`/${PAGE_CONFIGS[PAGES.HOME].route}`);
            }}>
            Create Character
          </button>
        ) : (
          <button
            disabled={curPageIndex >= CHARACTER_CREATOR_PAGES_LIST.length - 1}
            onClick={() => {
              navigate(CHARACTER_CREATOR_PAGES_LIST[curPageIndex + 1]);
            }}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};
