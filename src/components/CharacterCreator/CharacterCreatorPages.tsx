import { Route, Routes } from 'react-router-dom';
import { BioCreator } from './pages/BioCreator/BioCreator';
import { EquipmentCreator } from './pages/EquipmentCreator/EquipmentCreator';
import { BackgroundCreator } from './pages/BackgroundCreator/BackgroundCreator';
import { StatsCreator } from './pages/StatsCreator/StatsCreator';
import { ClassCreator } from './pages/ClassCreator/ClassCreator';
import { RaceCreator } from './pages/RaceCreator/RaceCreator';
import React from 'react';
import { CHARACTER_CREATOR_PAGES } from 'constants/characterCreator';
import { ReviewCreator } from './pages/ReviewCreator/ReviewCreator';

type Props = any;
export const CharacterCreatorPages = React.memo((props: Props) => {
  return (
    <Routes>
      <Route path={CHARACTER_CREATOR_PAGES.RACE} element={<RaceCreator />} />
      <Route path={CHARACTER_CREATOR_PAGES.CLASS} element={<ClassCreator />} />
      <Route path={CHARACTER_CREATOR_PAGES.STATS} element={<StatsCreator />} />
      <Route
        path={CHARACTER_CREATOR_PAGES.BACKGROUND}
        element={<BackgroundCreator />}
      />
      <Route
        path={CHARACTER_CREATOR_PAGES.EQUIPMENT}
        element={<EquipmentCreator />}
      />
      <Route path={CHARACTER_CREATOR_PAGES.FEATS} element={<div>FEATS</div>} />
      <Route path={CHARACTER_CREATOR_PAGES.BIO} element={<BioCreator />} />
      <Route
        path={CHARACTER_CREATOR_PAGES.REVIEW}
        element={<ReviewCreator />}
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
  );
});
