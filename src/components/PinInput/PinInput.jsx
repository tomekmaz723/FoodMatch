import { useRef } from 'react';
import styles from './PinInput.module.css';

/**
 * 4-digit PIN input rendered as individual boxes.
 */
function PinInput({ label = 'Room PIN', value = ['', '', '', ''], onChange }) {
  const inputRefs = useRef([]);

  const updateDigit = (index, digit) => {
    const nextValue = [...value];
    nextValue[index] = digit;
    onChange?.(nextValue);
  };

  const handleChange = (index, event) => {
    const digit = event.target.value.replace(/\D/g, '').slice(-1);

    updateDigit(index, digit);

    if (digit && index < value.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <fieldset className={styles.wrapper}>
      <legend className={styles.label}>{label}</legend>

      <div className={styles.boxes}>
        {value.map((digit, i) => (
          <input
            key={i}
            ref={(element) => {
              inputRefs.current[i] = element;
            }}
            className={styles.box}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            placeholder="-"
            value={digit}
            onChange={(event) => handleChange(i, event)}
            onKeyDown={(event) => handleKeyDown(i, event)}
            aria-label={`PIN digit ${i + 1}`}
          />
        ))}
      </div>
    </fieldset>
  );
}

export default PinInput;
