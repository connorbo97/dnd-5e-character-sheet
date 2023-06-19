import React, { useEffect } from 'react';
import styles from './App.module.scss';
import { Header } from './components/Header';
import { Content } from 'components/Content';
import { DEFAULT_DICE_OPTIONS } from 'constants/diceBox';
import { rollVisualDice } from 'utils/diceBoxUtils';

function App() {
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
      <div id="dice-box"></div>
      <div id="dice-box-result"></div>
      <Header />
      <button
        onClick={() =>
          rollVisualDice(['1d20']).then((res) => console.log(res))
        }>
        Test
      </button>
      <Content />
    </div>
  );
}

export default App;
