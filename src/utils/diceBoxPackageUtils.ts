import { DEFAULT_DICE_OPTIONS } from 'constants/diceBox';

export const loadDiceBox = (diceBoxOptions) =>
  import('@3d-dice/dice-box')
    .then((DiceBox) => {
      // if there's already a canvas, don't load another
      // (THIS IS MAINLY A DEV FIX FOR HOT RELOADING)
      if (document.getElementById('dice-canvas')) {
        return;
      }

      //@ts-ignore
      const diceBox = new DiceBox.default('#dice-box', {
        ...DEFAULT_DICE_OPTIONS,
        ...diceBoxOptions,
      });
      window.diceBoxContainer = document.getElementById('dice-box');
      diceBox
        .init()
        .then(() => {
          window.diceBox = diceBox;
        })
        .catch((err) => {
          console.error(err);
        });
      // ...
    })
    .catch((err) => {
      console.error(err);
      alert(`Failed to load dice box: ${err.toString}`);
    });
