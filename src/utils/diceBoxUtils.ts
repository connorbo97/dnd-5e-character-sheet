import { DICE } from 'constants/dice';
import { addNumberSign } from './stringUtils';
import { DiceBoxResult, ROLL_AUDIOS } from 'constants/diceBox';
import {
  calculateRollable,
  getRandom,
  isDiceRoll,
  parseRollable,
} from './rollableUtils';
import { Rollable, RollableUtilConfig } from 'constants/rollable';
import { isNumber, partition, sum, values } from 'lodash';

const getDiceBoxResult = () => document.getElementById('dice-box-result');

const convertDiceBoxResultToValues = (
  res: Array<{ value: number; groupId: number }>,
) => {
  const result = res.reduce((acc, { value, groupId }) => {
    if (!acc[groupId]) {
      acc[groupId] = [value];
    } else {
      acc[groupId].push(value);
    }

    return acc;
  }, {});

  return values(result).map((arr: any) => (arr.length === 1 ? arr[0] : arr));
};

const pauseAndResetAllRollAudios = () => {
  ROLL_AUDIOS.forEach((a) => {
    a.pause();
    a.currentTime = 0;
  });
};

const playDiceNoises = (roll: Rollable) => {
  // make a roll noise for each dice in the roll
  roll.forEach((r) => {
    if (!isDiceRoll(r)) {
      return;
    }

    ROLL_AUDIOS[getRandom(values(ROLL_AUDIOS).length)].play();
  });
};

export const rollVisualDice = (
  roll: Rollable = [[1, DICE.d20]],
  rollableConfig?: RollableUtilConfig,
  options: {
    disableRollOnCancel?: any;
    disableResultBox?: boolean;
    onRollResult?: Function;
    clearTimeout?: number;
    customResultBoxLabel?: Function;
    chatEntryOnRes?: any;
    db?: any;
  } = {},
): Promise<DiceBoxResult> => {
  return new Promise((resolve) => {
    let waitFlag = true;
    let clearTimer: any = null;
    let submitReturn: any = null;

    let rollHasFinished = false;

    const [sanitizedRoll, modifiers] = partition(
      parseRollable(roll, rollableConfig),
      (r) => !isNumber(r),
    );

    let finalResolve = resolve;

    if (options?.chatEntryOnRes) {
      finalResolve = async (result: any, ...args) => {
        // const db = options?.db;
        // const roll = result?.value;
        // const rollTooltip = result?.resultText;

        // addEntryToChat(db, {
        // 	...options?.chatEntryOnRes,
        // 	roll,
        // 	rollTooltip,
        // })

        resolve(result, ...args);
      };
    }

    const getBasicLabel = (
      resultArray: Array<number>,
      resultSum: number,
      { hideResult = false } = {},
    ) => {
      const label = resultArray.reduce((acc, cur, i) => {
        const prefixSpace = i === 0 ? '' : ' ';
        let sanitizedValue = cur.toString();

        if (Array.isArray(cur)) {
          sanitizedValue = `(${cur.join(' + ')})`;
        }

        if (i !== 0) {
          sanitizedValue = addNumberSign(sanitizedValue, ' ');
        }

        const suffix = !!sanitizedRoll[i] ? ` (${sanitizedRoll[i]})` : '';

        return `${acc}${prefixSpace}${sanitizedValue}${suffix}`;
      }, '');

      if (hideResult) {
        return label;
      }

      return `${label} = ${resultSum}`;
    };

    const onClearDiceRoll = () => {
      waitFlag = false;
      window.diceBox.clear();
      window.diceBoxContainer.style.pointerEvents = 'none';
      (getDiceBoxResult()?.style || { opacity: 0 }).opacity = 0;

      if (clearTimer) {
        clearTimeout(clearTimer);
      }

      if (submitReturn) {
        submitReturn();
      } else if (!rollHasFinished && !options?.disableRollOnCancel) {
        const diceRolls: Array<any> = roll.filter((r) => isDiceRoll(r));
        const resultArray = [
          ...diceRolls.map((dr) => {
            const [numRolls, dice] = dr;
            let drRes: Array<number> = [];

            for (let i = 0; i < numRolls; i++) {
              drRes.push(calculateRollable([[1, dice]]));
            }

            return drRes;
          }),
          ...modifiers,
        ];
        const resultSum = sum(resultArray.flat());

        finalResolve({
          value: resultSum,
          resultText: getBasicLabel(resultArray, resultSum, {
            hideResult: true,
          }),
          resultArray,
        });
      }
    };

    pauseAndResetAllRollAudios();

    playDiceNoises(roll);

    // roll dice in box
    window.diceBox
      .roll(sanitizedRoll)
      .then((res: Array<{ value: number; groupId: number }>) => {
        rollHasFinished = true;

        if (!waitFlag) {
          return;
        }

        const resultArray = [
          ...convertDiceBoxResultToValues(res),
          ...modifiers,
        ];
        const resultSum = sum(resultArray.flat());

        const resultBox = getDiceBoxResult();
        if (resultBox && !options.disableResultBox) {
          resultBox.style.opacity = '1';
          resultBox.innerHTML = options?.customResultBoxLabel
            ? options?.customResultBoxLabel(resultArray, resultSum, {
                sanitizedDice: roll,
              })
            : getBasicLabel(resultArray, resultSum);
        }

        const returnValue = {
          resultArray,
          resultText: getBasicLabel(resultArray, resultSum, {
            hideResult: true,
          }),
          value: resultSum,
        };

        if (options.clearTimeout) {
          // @ts-ignore
          submitReturn = () => finalResolve(returnValue);
          clearTimer = setTimeout(onClearDiceRoll, options.clearTimeout);
        } else {
          // @ts-ignore
          finalResolve(returnValue);
        }
      });

    window.diceBoxContainer.style.pointerEvents = 'auto';
    window.diceBoxContainer.addEventListener('click', onClearDiceRoll, {
      once: true,
    });
  });
};
