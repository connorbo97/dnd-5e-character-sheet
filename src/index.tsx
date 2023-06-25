import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CharacterSheetProvider } from 'providers/CharacterSheetProvider';
import { ChatProvider } from 'providers/ChatProvider';
import { TooltipPortal } from 'react-mint';
import { CharacterCreatorProvider } from 'providers/CharacterCreatorProvider';
import { ReduxProvider } from 'providers/ReduxProvider';
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
  <TooltipPortal
    themes={{
      default: {
        style: {
          background: '#3f0071',
          fontSize: '1.5rem',
        },
      },
    }}
    defaultTheme={'default'}>
    <ReduxProvider>
      <CharacterSheetProvider>
        <CharacterCreatorProvider>
          <ChatProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ChatProvider>
        </CharacterCreatorProvider>
      </CharacterSheetProvider>
    </ReduxProvider>
  </TooltipPortal>,
);
