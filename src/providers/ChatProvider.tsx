import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { noop } from 'lodash';
import { rollVisualDice } from 'utils/diceBoxUtils';
import { ChatEntry, ChatEntryInputs, ChatType } from 'constants/chat';
import { useCharacterSheet } from './CharacterSheetProvider';
import { Rollable } from 'constants/rollable';

type ChatContextValue = {
  chats: Array<ChatEntry>;
  setChats: Function;
};

const ChatContext = createContext({
  chats: [],
  setChats: noop,
} as ChatContextValue);

export const ChatProvider = ({ ...rest }) => {
  const [chats, setChats] = useState([]);

  const value = useMemo(
    () => ({
      chats,
      setChats,
    }),
    [chats],
  );
  return <ChatContext.Provider value={value} {...rest} />;
};

export const useChat = () => {
  const { name, rollableConfig } = useCharacterSheet();
  const { chats, setChats } = useContext(ChatContext);

  const appendChat = useCallback(
    (entry: ChatEntry) => {
      setChats((prevChats) => {
        let newChats = [...prevChats];

        if (prevChats.length > 199) {
          newChats = prevChats.splice(0, 1);
        }

        newChats.push(entry);

        return newChats;
      });
    },
    [setChats],
  );

  const onRoll = useCallback(
    async (roll: Rollable, chatConfig: ChatEntryInputs, rollOptions = {}) => {
      let res;
      try {
        res = await rollVisualDice(roll, rollableConfig, rollOptions);

        const newChatEntry: ChatEntry = {
          playerName: name,
          type: ChatType.BASIC,
          result: res.value,
          ...chatConfig,
        };

        appendChat(newChatEntry);

        return res;
      } catch (err: any) {
        console.error(err);

        return null;
      }
    },
    [appendChat, name, rollableConfig],
  );

  return {
    chats,
    setChats,

    onRoll,
    appendChat,
  };
};