import React from 'react';
import styles from './mainSheet.module.scss';
import { Stats } from './components/Stats/Stats';
import { Skills } from './components/Skills/Skills';
import { Tools } from './components/Tools/Tools';
import { OtherProficiencies } from './components/OtherProficiencies/OtherProficiencies';
import { Money } from './components/Money/Money';
import { DeathSaves } from './components/DeathSaves/DeathSaves';
import { HitDice } from './components/HitDice/HitDice';
import { Initiative } from './components/Initiative/Initiative';
import { HitPoints } from './components/HitPoints/HitPoints';
import { Metadata } from './components/Metadata/Metadata';
import { Attacks } from './components/Attacks/Attacks';

export const MainSheet = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['grid']}>
        <Stats />
        <Skills />
        <Tools />
        <OtherProficiencies />
        <Money />
        <DeathSaves />
        <HitDice />
        <Initiative />
        <HitPoints />
        <Metadata />
        <Attacks />
      </div>
    </div>
  );
};
