import styles from './AppLogo.module.css';

/**
 * App logo block: amber icon badge + "FoodMatch" title + subtitle.
 */
function AppLogo() {
  return (
    <div className={styles.logo}>
      <div className={styles.iconWrapper} aria-hidden="true">
        {/* Fork & knife icon */}
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 2v7c0 1.1.9 2 2 2h2v11h2V11h2c1.1 0 2-.9 2-2V2H3zm4 6H5V4h2v4zm2 0V4h2v4h-2z" />
          <path d="M18 2v4.28C16.84 6.63 16 7.73 16 9v2c0 1.1.9 2 2 2h1v9h2V2h-3z" />
        </svg>
      </div>

      <h1 className={styles.title}>FoodMatch</h1>
      <p className={styles.subtitle}>
        Let your group decide
        <br />
        deliciously
      </p>
    </div>
  );
}

export default AppLogo;
