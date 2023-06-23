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
import { useAdvantageToggle } from './CharacterSheetProvider/useAdvantageToggle';
import { ADVANTAGE_TOGGLE } from 'constants/advantageToggle';

type ChatContextValue = {
  chats: Array<ChatEntry>;
  setChats: Function;
};

const mapDiceBoxResultToChatEntryResult = (d) =>
  d
    ? {
        result: d.value,
        resultArray: d.resultArray,
        detailedResult: d.resultText,
      }
    : d;

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
  const { advantageToggle } = useAdvantageToggle();

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
    async (
      roll: Rollable | string,
      chatConfig: ChatEntryInputs,
      options: { [s: string]: any } = {},
    ) => {
      const {
        isAdvantage: optionsAdvantage,
        isDisadvantage: optionsDisadvantage,
        ...rollOptions
      } = options;
      const type = chatConfig.type;
      let firstRoll;
      let secondRoll;

      let isAdvantage;
      let isDisadvantage;

      // if the type is advantage/disadvantage compatible, calc advantage or disadvantage
      if (!type || type === ChatType.ATTACK || type === ChatType.BASIC) {
        isAdvantage =
          optionsAdvantage || advantageToggle === ADVANTAGE_TOGGLE.ADVANTAGE;
        isDisadvantage =
          optionsDisadvantage ||
          advantageToggle === ADVANTAGE_TOGGLE.DISADVANTAGE;
        if (isAdvantage && isDisadvantage) {
          isAdvantage = false;
          isDisadvantage = false;
        }
      }

      try {
        const { isCrit } = chatConfig;
        if (Array.isArray(roll)) {
          const doRoll = () =>
            rollVisualDice(roll, rollableConfig, {
              ...rollOptions,
              shouldDoubleDice: isCrit,
            });
          firstRoll = await doRoll();

          if (isAdvantage || isDisadvantage) {
            secondRoll = await doRoll();
          }
        } else {
          firstRoll = { value: roll, resultArray: [roll], resultText: roll };
        }

        const newChatEntry: ChatEntry = {
          playerName: name,
          type: ChatType.BASIC,
          ...mapDiceBoxResultToChatEntryResult(firstRoll),
          secondRoll: mapDiceBoxResultToChatEntryResult(secondRoll),
          isAdvantage,
          isDisadvantage,
          ...chatConfig,
        };

        appendChat(newChatEntry);

        return {
          ...firstRoll,
          secondRoll,
          isAdvantage,
          isDisadvantage,
        };
      } catch (err: any) {
        console.error(err);

        return null;
      }
    },
    [advantageToggle, appendChat, name, rollableConfig],
  );

  return {
    chats,
    setChats,

    onRoll,
    appendChat,
  };
};
