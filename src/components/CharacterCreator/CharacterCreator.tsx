import { findIndex, get, values } from 'lodash';
import styles from './characterCreator.module.scss';
import { RaceCreator } from './pages/RaceCreator';
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import classnames from 'classnames/bind';

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
  const curPage = get(match, 'params.page', CHARACTER_CREATOR_PAGES.START);
  const curPageIndex = findIndex(
    CHARACTER_CREATOR_PAGES_LIST,
    (p) => p === curPage,
  );
  console.log(curPage, curPageIndex);

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        {CHARACTER_CREATOR_PAGES_LIST.map((p) => (
          <Link to={p}>
            <div
              className={classNameBuilder('link', { selected: curPage === p })}>
              {p}
            </div>
          </Link>
        ))}
      </div>
      <div className={styles['content']}>
        <Routes>
          <Route
            path={CHARACTER_CREATOR_PAGES.RACE}
            element={<RaceCreator />}
          />
          <Route
            path={CHARACTER_CREATOR_PAGES.CLASS}
            element={<div>class</div>}
          />
          <Route
            path={'*'}
            element={
              <div>
                <h1>Welcome to the Character Creator</h1>
                <p>
                  Use the tabs above or the buttons below to navigate the pages.
                </p>
              </div>
            }
          />
        </Routes>
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
