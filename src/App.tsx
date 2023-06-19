import React, { useEffect } from 'react';
import styles from './App.module.scss';
import { Header } from './components/Header';
import { Content } from 'components/Content';
import { DEFAULT_DICE_OPTIONS } from 'constants/diceBox';
import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { DICE } from 'constants/dice';
import { STATS } from 'constants/stats';
import { useDiceRoller } from 'providers/DiceRollerProvider';

function App() {
  const { rollableConfig } = useCharacterSheet();
  const { onRoll } = useDiceRoller();

  useEffect(() => {
    import('@3d-dice/dice-box')
      .then((DiceBox) => {
        let diceBoxOptions;
        try {
          diceBoxOptions = JSON.parse(
            localStorage.getItem('diceBoxOptions') || '{}',
          );
        } catch (err) {
          console.log(err);
        }

        if (document.getElementById('dice-canvas')) {
          return;
        }
        //@ts-ignore
        const diceBox = new DiceBox.default('#dice-box', {
          ...DEFAULT_DICE_OPTIONS,
          ...diceBoxOptions,
        });
        window.diceBoxContainer = document.getElementById('dice-box');
        diceBox
          .init()
          .then(() => {
            window.diceBox = diceBox;
          })
          .catch((err) => {
            console.error(err);
          });
        // ...
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className={styles['app']}>
      <div id="dice-box">
        <div id="dice-box-result"></div>
        <div id="dice-box-instructions">Click anywhere to dismiss</div>
      </div>
      <Header />
      <button
        onClick={() =>
          onRoll(
            [[3, DICE.d20], 1, STATS.STR, [6, DICE.d4]],
            rollableConfig,
          ).then((res) => console.log(res))
        }>
        Test
      </button>
      <Content />
    </div>
  );
}

export default App;
