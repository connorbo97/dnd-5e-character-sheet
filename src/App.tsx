import { useEffect } from 'react';
import styles from './App.module.scss';
import { Header } from './components/Header';
import { Content } from 'components/Content';
import { loadDiceBox } from 'utils/diceBoxPackageUtils';

function App() {
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
      <Content />
    </div>
  );
}

export default App;
