import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { noop } from 'lodash';
import { rollVisualDice } from 'utils/diceBoxUtils';
import { ChatEntry, ChatType } from 'constants/chat';
import { useCharacterSheet } from './CharacterSheetProvider';

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
  const { name } = useCharacterSheet();
  const { rolls, setRolls } = useContext(DiceRollerContext);

  const onRoll = useCallback(
    async (roll, config, chatConfig, rollOptions = {}) => {
      let res;
      try {
        res = await rollVisualDice(roll, config, rollOptions);

        setRolls((prevRolls) => {
          let newRolls = [...prevRolls];

          if (prevRolls.length > 199) {
            newRolls = prevRolls.splice(0, 1);
          }

          const newChatEntry: ChatEntry = {
            playerName: name,
            type: ChatType.BASIC,
            result: res.value,
            ...chatConfig,
          };
          newRolls.push(newChatEntry);

          return newRolls;
        });

        return res;
      } catch (err: any) {
        console.error(err);

        return null;
      }
    },
    [name, setRolls],
  );

  return {
    rolls,
    setRolls,

    onRoll,
  };
};
