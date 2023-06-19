import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CharacterSheetProvider } from 'providers/CharacterSheetProvider';

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
  <CharacterSheetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CharacterSheetProvider>,
);
