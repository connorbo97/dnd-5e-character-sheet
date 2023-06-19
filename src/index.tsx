import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CharacterSheetProvider } from 'providers/CharacterSheetProvider';
import { ChatProvider } from 'providers/ChatProvider';

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
    <ChatProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChatProvider>
  </CharacterSheetProvider>,
);
