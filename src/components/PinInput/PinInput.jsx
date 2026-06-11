import styles from './PinInput.module.css';

/**
 * 4-digit PIN input rendered as individual boxes.
 *
 * @param {string} label – section label shown above the boxes
 */
function PinInput({ label = 'Room PIN' }) {
  return (
    <fieldset className={styles.wrapper}>
      <legend className={styles.label}>{label}</legend>

      <div className={styles.boxes}>
        {[0, 1, 2, 3].map((i) => (
          <input
            key={i}
            className={styles.box}
            type="text"
            inputMode="numeric"
            maxLength={1}
            placeholder="–"
            aria-label={`PIN digit ${i + 1}`}
          />
        ))}
      </div>
    </fieldset>
  );
}

export default PinInput;
