import styles from './InputField.module.css';

/**
 * Text input with a label and optional trailing icon.
 *
 * @param {string}         label       – field label
 * @param {string}         placeholder – input placeholder
 * @param {React.ReactNode} icon       – optional trailing icon
 */
function InputField({ label, placeholder, icon, ...rest }) {
  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}

      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          {...rest}
        />
        {icon && <span className={styles.trailingIcon} aria-hidden="true">{icon}</span>}
      </div>
    </div>
  );
}

export default InputField;
