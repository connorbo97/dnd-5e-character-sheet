import React from 'react';
import styles from './header.module.scss';
import { PAGES, PAGE_CONFIGS, PAGE_CONFIGS_ENTRIES } from '../constants/pages';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useFullSheet } from 'providers/CharacterSheetProvider/useFullSheet';

export const Header = () => {
  const { name, onChangeName } = useFullSheet();
  const navigate = useNavigate();

  return (
    <div className={styles['container']}>
      <div className={styles['main']}>
        <Routes>
          <Route
            path={PAGE_CONFIGS[PAGES.FOO].route}
            element={<div>this is the foo page</div>}
          />
          <Route
            path="*"
            element={
              <input
                className={styles['name']}
                value={name}
                onChange={(e) => onChangeName(e.target.value)}
              />
            }
          />
        </Routes>
      </div>

      <div className={styles['buttons']}>
        {PAGE_CONFIGS_ENTRIES.map(([page, { label, route }]) => (
          <button key={page} onClick={() => navigate(route)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
