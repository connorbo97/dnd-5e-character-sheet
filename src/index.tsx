import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CharacterSheetProvider } from 'providers/CharacterSheetProvider';
import { DiceRollerProvider } from 'providers/DiceRollerProvider';

declare global {
  interface Window {
    diceBox: any;
    diceBoxContainer: any;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <DiceRollerProvider>
    <CharacterSheetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CharacterSheetProvider>
  </DiceRollerProvider>,
);
