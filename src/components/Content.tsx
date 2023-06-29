import { PAGES, PAGE_CONFIGS, PageConfig } from 'constants/pages';
import { Route, Routes } from 'react-router-dom';
import styles from './content.module.scss';
import { MainSheet } from './MainSheet/MainSheet';
import { CharacterCreator } from './CharacterCreator/CharacterCreator';

const getPathFromConfig = (config: PageConfig) =>
  `${config.route}${config.hasSubRoutes ? '/*' : ''}`;
export const Content = () => {
  return (
    <div className={styles['container']}>
      <Routes>
        <Route
          path={getPathFromConfig(PAGE_CONFIGS[PAGES.CHARACTER_CREATOR])}
          element={<CharacterCreator />}
        />
        <Route
          path={getPathFromConfig(PAGE_CONFIGS[PAGES.BAR])}
          element={<div>Bar</div>}
        />
        <Route path="*" element={<MainSheet />} />
      </Routes>
    </div>
  );
};
