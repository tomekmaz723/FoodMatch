import BrandLogo from '../BrandLogo/BrandLogo';
import styles from './AppLogo.module.css';

/**
 * App logo block: amber icon badge + "FoodMatch" title + subtitle.
 */
function AppLogo() {
  return (
    <div className={styles.logo}>
      <BrandLogo variant="stacked" />
      <p className={styles.subtitle}>
        Let your group decide
        <br />
        deliciously
      </p>
    </div>
  );
}

export default AppLogo;
