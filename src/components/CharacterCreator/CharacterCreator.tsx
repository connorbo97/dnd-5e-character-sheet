import styles from './characterCreator.module.scss';
import { useState } from 'react';

export const CharacterCreator = () => {
  const [state, setState] = useState('');

  return (
    <div className={styles['container']}>
      <h5>CharacterCreator</h5>
      <div>
        <input value={state} onChange={(e) => setState(e.target.value)} />
      </div>
    </div>
  );
};
