import styles from './Button.module.css';

/**
 * Reusable button with two visual variants.
 *
 * @param {'filled'|'outlined'} variant – visual style
 * @param {React.ReactNode}     icon     – optional leading icon
 * @param {React.ReactNode}     children – button label
 * @param {object}              rest     – forwarded to <button>
 */
function Button({ variant = 'filled', icon, children, ...rest }) {
  const className = `${styles.button} ${styles[variant]}`;

  return (
    <button className={className} type="button" {...rest}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
