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
const getDiceBoxInstructions = () =>
  document.getElementById('dice-box-instructions');

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

const showDiceBoxInstructions = () => {
  const resultInstructions = getDiceBoxInstructions();
  if (resultInstructions) {
    resultInstructions.style.opacity = '1';
  }
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

const DEFAULT_ROLL_OPTIONS = {
  disableResultBox: false,
  autoDismissTimeout: null,
  customResultBoxLabel: null,
};

export const rollVisualDice = (
  roll: Rollable = [[1, DICE.d20]],
  rollableConfig?: RollableUtilConfig,
  options: {
    disableResultBox?: boolean;
    autoDismissTimeout?: number;
    customResultBoxLabel?: Function;
  } = {},
): Promise<DiceBoxResult> => {
  return new Promise((promiseResolve) => {
    let waitFlag = true;
    let clearTimer: any = null;
    const autoDismissTimeout =
      options.autoDismissTimeout || DEFAULT_ROLL_OPTIONS.autoDismissTimeout;
    const customResultBoxLabel =
      options.customResultBoxLabel || DEFAULT_ROLL_OPTIONS.customResultBoxLabel;

    let rollHasFinished = false;

    const [sanitizedRoll, modifiers] = partition(
      parseRollable(roll, rollableConfig),
      (r) => !isNumber(r),
    );

    const resolve = (...args) => {
      // add here anything that needs to happen prior to resolve
      // @ts-ignore
      promiseResolve(...args);
    };

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

        const suffix = !!sanitizedRoll[i] ? `[${sanitizedRoll[i]}]` : '';

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
      (getDiceBoxInstructions()?.style || { opacity: 0 }).opacity = 0;

      if (clearTimer) {
        clearTimeout(clearTimer);
      }

      // if the roll hasn't finished yet
      if (!rollHasFinished) {
        const diceRolls: Array<any> = roll.filter((r) => isDiceRoll(r));
        const resultArray = [
          ...diceRolls.map((dr) => {
            const [numRolls, dice] = dr;
            let drRes: Array<number> = [];

            for (let i = 0; i < numRolls; i++) {
              drRes.push(
                calculateRollable(
                  [[1, dice]],
                  rollableConfig as RollableUtilConfig,
                ),
              );
            }

            return drRes;
          }),
          ...modifiers,
        ];
        const resultSum = sum(resultArray.flat());

        resolve({
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

    showDiceBoxInstructions();

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

        // render the dice box result
        const resultBox = getDiceBoxResult();
        if (resultBox && !options.disableResultBox) {
          resultBox.style.opacity = '1';
          resultBox.innerHTML = customResultBoxLabel
            ? customResultBoxLabel(resultArray, resultSum, {
                sanitizedRoll,
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

        if (autoDismissTimeout) {
          clearTimer = setTimeout(onClearDiceRoll, autoDismissTimeout);
        }

        resolve(returnValue);
      });

    window.diceBoxContainer.style.pointerEvents = 'auto';
    window.diceBoxContainer.addEventListener('click', onClearDiceRoll, {
      once: true,
    });
  });
};
