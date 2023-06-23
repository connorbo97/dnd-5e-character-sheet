import { Toggle } from 'common/components/Toggle/Toggle';
import styles from './whisperToggle.module.scss';
import { WHISPER_TOGGLE_OPTIONS } from 'constants/whisperToggle';
import { useWhisperToggle } from 'providers/CharacterSheetProvider/useWhisperToggle';

export const WhisperToggle = () => {
  const { whisperToggle, onChangeWhisperToggle } = useWhisperToggle();
  return (
    <div className={styles['container']}>
      <h5>Whisper Toggle</h5>
      <Toggle
        options={WHISPER_TOGGLE_OPTIONS}
        selected={whisperToggle}
        onChange={(val) => onChangeWhisperToggle(val)}
        optionClassName={styles['option']}
      />
    </div>
  );
};
