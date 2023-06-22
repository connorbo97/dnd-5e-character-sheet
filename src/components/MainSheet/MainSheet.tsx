import React from 'react';
import styles from './mainSheet.module.scss';
import { Stats } from './components/Stats/Stats';
import { Skills } from './components/Skills/Skills';
import { OtherProficiencies } from './components/OtherProficiencies/OtherProficiencies';
import { Money } from './components/Money/Money';
import { DeathSaves } from './components/DeathSaves/DeathSaves';
import { HitDice } from './components/HitDice/HitDice';
import { Metadata } from './components/Metadata/Metadata';
import { Attacks } from './components/Attacks/Attacks';
import { Inventory } from './components/Inventory/Inventory';
import { CombatStats } from './components/CombatStats/CombatStats';
import { Chat } from 'components/Chat/Chat';
import { CustomChecks } from './components/CustomChecks/CustomChecks';

export const MainSheet = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['grid']}>
        <Stats />
        <Skills />
        <CustomChecks />
        <OtherProficiencies />
        <Money />
        <DeathSaves />
        <HitDice />
        <Inventory />
        <Metadata />
        <Attacks />
        <CombatStats />
        <Chat />
      </div>
    </div>
  );
};
