import { DICE } from 'constants/dice';
import { addNumberSign } from './stringUtils';
import { ROLL_AUDIOS } from 'constants/diceBox';
import {
  calculateRollable,
  getRandom,
  isDiceRoll,
  parseRollableArray,
} from './rollableUtils';
import { Rollable, RollableUtilConfig } from 'constants/rollable';
import { sum, values } from 'lodash';

export const getDiceFaces = (d: DICE) => parseInt(d.split('d')[1]);
const getDiceBoxResult = () => document.getElementById('dice-box-result');

const convertDiceBoxResultToValues = (res: Array<{ value: number }>) =>
  res.map(({ value }) => value);
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
): Promise<{ value: number; resultArray: Array<any>; resultText: string }> => {
  return new Promise((resolve) => {
    let waitFlag = true;
    let clearTimer: any = null;
    let submitReturn: any = null;

    let rollHasFinished = false;

    const sanitizedRoll = parseRollableArray(roll, rollableConfig);

    let finalResolve = resolve;

    if (options?.chatEntryOnRes) {
      finalResolve = async (result: any, ...args) => {
        const db = options?.db;
        const roll = result?.value;
        const rollTooltip = result?.resultText;
        console.log(db, roll, rollTooltip);

        // addEntryToChat(db, {
        // 	...options?.chatEntryOnRes,
        // 	roll,
        // 	rollTooltip,
        // })

        resolve(result, ...args);
      };
    }

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
        const resultArray = roll.map((r) => calculateRollable([r]));
        const resultSum = sum(resultArray);

        finalResolve({
          value: resultSum,
          resultText: getBasicLabel(resultArray, resultSum, {
            hideResult: true,
          }),
          resultArray,
        });
      }
    };

    const getBasicLabel = (
      resultArray: Array<number>,
      resultSum: number,
      { hideResult = false } = {},
    ) => {
      const label = resultArray.reduce((acc, cur, i) => {
        const prefixSpace = i === 0 ? '' : ' ';
        const val = i === 0 ? cur : addNumberSign(cur, ' ');

        const suffix = isDiceRoll(roll[i]) ? ` (${sanitizedRoll[i]})` : '';

        return `${acc}${prefixSpace}${val}${suffix}`;
      }, '');

      if (hideResult) {
        return label;
      }

      return `${label} = ${resultSum}`;
    };

    pauseAndResetAllRollAudios();

    playDiceNoises(roll);

    // roll dice in box
    window.diceBox.roll(sanitizedRoll).then((res: Array<{ value: number }>) => {
      rollHasFinished = true;

      if (!waitFlag) {
        return;
      }

      const resultArray = convertDiceBoxResultToValues(res);
      const resultSum = sum(resultArray);

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
