import React, { useEffect } from 'react';
import styles from './App.module.scss';
import { Header } from './components/Header';
import { Content } from 'components/Content';
import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { DICE } from 'constants/dice';
import { STATS } from 'constants/stats';
import { useDiceRoller } from 'providers/DiceRollerProvider';
import { loadDiceBox } from 'utils/diceBoxPackageUtils';

function App() {
  const { rollableConfig } = useCharacterSheet();
  const { onRoll } = useDiceRoller();

  useEffect(() => {
    let diceBoxOptions;
    try {
      diceBoxOptions = JSON.parse(
        localStorage.getItem('diceBoxOptions') || '{}',
      );
    } catch (err) {
      console.log(err);
    }

    loadDiceBox(diceBoxOptions);
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
          onRoll([[3, DICE.d20], 1, STATS.STR, [6, DICE.d4]], rollableConfig, {
            description: 'test',
          }).then((res) => console.log(res))
        }>
        Test
      </button>
      <Content />
    </div>
  );
}

export default App;
