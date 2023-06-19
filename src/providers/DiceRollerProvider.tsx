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

type DiceRollerContextValue = {
  rolls: Array<ChatEntry>;
  setRolls: Function;
};

const DiceRollerContext = createContext({
  rolls: [],
  setRolls: noop,
} as DiceRollerContextValue);

export const DiceRollerProvider = ({ ...rest }) => {
  const [rolls, setRolls] = useState([]);

  const value = useMemo(
    () => ({
      rolls,
      setRolls,
    }),
    [rolls],
  );
  return <DiceRollerContext.Provider value={value} {...rest} />;
};

export const useDiceRoller = () => {
  const { name, rollableConfig } = useCharacterSheet();
  const { rolls, setRolls } = useContext(DiceRollerContext);

  const appendRoll = useCallback(
    (entry: ChatEntry) => {
      setRolls((prevRolls) => {
        let newRolls = [...prevRolls];

        if (prevRolls.length > 199) {
          newRolls = prevRolls.splice(0, 1);
        }

        newRolls.push(entry);

        return newRolls;
      });
    },
    [setRolls],
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

        appendRoll(newChatEntry);

        return res;
      } catch (err: any) {
        console.error(err);

        return null;
      }
    },
    [appendRoll, name, rollableConfig],
  );

  return {
    rolls,
    setRolls,

    onRoll,
    appendRoll,
  };
};
