import { findIndex, get, values } from 'lodash';
import styles from './characterCreator.module.scss';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import classnames from 'classnames/bind';
import { STATS_CONFIGS, STATS_LIST } from 'constants/stats';
import { RequiredIcon } from 'common/components/RequiredIcon/RequiredIcon';
import { CharacterCreatorPages } from './CharacterCreatorPages';
import { useLayoutEffect, useRef, useState } from 'react';
import { Tooltip } from 'react-mint';
import {
  CHARACTER_CREATOR_PAGES,
  CHARACTER_CREATOR_PAGES_LIST,
  CHARACTER_CREATOR_PAGE_CONFIGS,
  NON_REQUIRED_PAGES,
} from 'constants/characterCreator';
import { useSubmitSheet } from './hooks/useSubmitSheet';

const classNameBuilder = classnames.bind(styles);

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

  const {
    sheet,
    onSubmitSheet,
    validationsBySection,
    errorValidationsBySection,
    warningValidationsBySection,
    hasErrorValidations,
  } = useSubmitSheet();

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
            {CHARACTER_CREATOR_PAGE_CONFIGS[p].label}
            {visitedPagesSet.has(p) && !NON_REQUIRED_PAGES.has(p) && (
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
          <button disabled={hasErrorValidations} onClick={onSubmitSheet}>
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
