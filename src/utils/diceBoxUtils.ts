import { DICE } from 'constants/dice';
import { addNumberSign } from './stringUtils';
import { ROLL_AUDIOS } from 'constants/diceBox';

export const getDiceFaces = (d: DICE) => parseInt(d.split('d')[1]);
const getDiceBoxResult = () => document.getElementById('dice-box-result');

const pauseAndResetAllRollAudios = () => {
  ROLL_AUDIOS.forEach((a) => {
    a.pause();
    a.currentTime = 0;
  });
};

export const rollVisualDice = (
  dice: any = [DICE.d20],
  options: {
    disableRollOnCancel?: any;
    modifier?: Array<any>;
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

    // const sanitizedDice = sanitizeDice

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
        // const resultArray = dice.map((die: any) => rollCalc([die]));
        // const finalCalc = [...resultArray, ...(options?.modifier || [])];
        // const finalCalcResult = rollCalc([
        //   ...resultArray,
        //   ...(options?.modifier || []),
        // ]);

        finalResolve({
          // value: finalCalcResult,
          // resultText: getDefaultLabel(finalCalc, finalCalcResult, {
          //   hideResult: true,
          // }),
          // resultArray,
          value: 1,
          resultText: getDefaultLabel([1], '1', {
            hideResult: true,
          }),
          resultArray: ['1'],
        });
      }
    };

    const getDefaultLabel = (
      finalCalc,
      finalCalcResult,
      { hideResult = false } = {},
    ) => {
      let defaultFront;

      defaultFront = finalCalc.reduce((acc, cur, i) => {
        const prefix = i === 0 ? '' : ' ';
        const val = i === 0 ? cur : addNumberSign(cur, ' ');
        // if (sanitizedDice[i] !== dice[i]) {
        // 	return acc + prefix + `${val} (${dice[i]})`;
        // 	// return acc + prefix + `${val} (Ceil(${originalResult} / 2))`;
        // } else {
        // 	return acc + prefix + val;
        // }
        return acc + prefix + `${val}${i >= dice.length ? '' : `(${dice[i]})`}`;
      }, '');

      if (hideResult) {
        return defaultFront;
      }

      return `${defaultFront} = ${finalCalcResult}`;
    };

    pauseAndResetAllRollAudios();
    const setToRoll = [0, 1, 2, 3];
    dice.forEach(() => {
      if (!setToRoll.length) {
        return;
      }
      const random = Math.floor(Math.random() * setToRoll.length);
      const [indexToPlay] = setToRoll.splice(random, 1);

      ROLL_AUDIOS[indexToPlay].play();
    });

    window.diceBox.roll(dice).then((res: any) => {
      rollHasFinished = true;

      if (!waitFlag) {
        return;
      }

      let hasUnrealDice = false;

      const originalResult = res.map(({ value }: { value: any }) => value);
      const dieResult = res.map(({ value }: { value: any }, index: number) => {
        return value;
      });

      const finalCalc = [...dieResult, ...(options.modifier || [])];
      const finalCalcResult = 'test';

      const resultBox = getDiceBoxResult();
      if (resultBox && !options.disableResultBox) {
        resultBox.style.opacity = '1';
        resultBox.innerHTML = options?.customResultBoxLabel
          ? options?.customResultBoxLabel(finalCalc, finalCalcResult, {
              sanitizedDice: dice,
            })
          : getDefaultLabel(finalCalc, finalCalcResult);
      }

      const returnValue = {
        resultArray: finalCalc,
        resultText: getDefaultLabel(finalCalc, finalCalcResult, {
          hideResult: true,
        }),
        value: finalCalcResult,
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
