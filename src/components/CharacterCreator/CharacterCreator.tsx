import { findIndex, get, values } from 'lodash';
import styles from './characterCreator.module.scss';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import classnames from 'classnames/bind';
import { useCharacterCreatorSheet } from 'providers/CharacterCreatorProvider';
import { STATS_CONFIGS, STATS_LIST } from 'constants/stats';
import { RequiredIcon } from 'common/components/RequiredIcon/RequiredIcon';
import { CharacterCreatorPages } from './CharacterCreatorPages';

const classNameBuilder = classnames.bind(styles);

export enum CHARACTER_CREATOR_PAGES {
  START = 'start',
  RACE = 'race',
  CLASS = 'class',
  STATS = 'stats',
  BACKGROUND = 'background',
  EQUIPMENT = 'equipment',
  FEATS = 'feats',
  BIO = 'bio',
  REVIEW = 'review',
}
const CHARACTER_CREATOR_PAGES_LIST = values(CHARACTER_CREATOR_PAGES);

export const CharacterCreator = () => {
  const match = useMatch('/character-creator/:page');
  const navigate = useNavigate();
  const rawPage = get(match, 'params.page', CHARACTER_CREATOR_PAGES.START);
  const curPage = CHARACTER_CREATOR_PAGES_LIST.includes(rawPage)
    ? rawPage
    : CHARACTER_CREATOR_PAGES.START;
  const curPageIndex = findIndex(
    CHARACTER_CREATOR_PAGES_LIST,
    (p) => p === curPage,
  );

  const { sheet } = useCharacterCreatorSheet();

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        {CHARACTER_CREATOR_PAGES_LIST.map((p) => (
          <Link to={p} key={p}>
            <div
              className={classNameBuilder('link', { selected: curPage === p })}>
              {p}
            </div>
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
        <button
          disabled={curPageIndex >= CHARACTER_CREATOR_PAGES_LIST.length - 1}
          onClick={() => {
            navigate(CHARACTER_CREATOR_PAGES_LIST[curPageIndex + 1]);
          }}>
          Next
        </button>
      </div>
    </div>
  );
};
