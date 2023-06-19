import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { noop } from 'lodash';
import { rollVisualDice } from 'utils/diceBoxUtils';

const DiceRollerContext = createContext({
  rolls: [],
  setRolls: noop,
});

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
  const { rolls, setRolls } = useContext(DiceRollerContext);

  const onRoll = useCallback(
    async (roll, config, options = {}) => {
      let res;
      try {
        res = await rollVisualDice(roll, config, options);

        setRolls((prevRolls) => {
          let newRolls = [...prevRolls];

          if (prevRolls.length > 199) {
            newRolls = prevRolls.splice(0, 1);
          }

          newRolls.push(res);

          return newRolls;
        });

        return res;
      } catch (err: any) {
        console.log(err.toString());

        return null;
      }
    },
    [setRolls],
  );

  return {
    rolls,
    setRolls,

    onRoll,
  };
};
