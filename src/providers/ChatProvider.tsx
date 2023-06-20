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
import { Rollable } from 'constants/rollable';
import { useFullSheet } from './CharacterSheetProvider/useFullSheet';

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
  const { name, rollableConfig } = useFullSheet();
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
        const { isCrit } = chatConfig;
        res = await rollVisualDice(roll, rollableConfig, {
          ...rollOptions,
          shouldDoubleDice: isCrit,
        });

        const newChatEntry: ChatEntry = {
          playerName: name,
          type: ChatType.BASIC,
          result: res.value,
          resultArray: res.resultArray,
          detailedResult: res.resultText,
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
