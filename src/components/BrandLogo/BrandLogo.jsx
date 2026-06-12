import styles from './BrandLogo.module.css';

function LogoMark() {
  return (
    <img src="/main_logo.png" alt="" />
  );
}

function Wordmark() {
  return (
    <span className={styles.wordmark}>
      <span className={styles.food}>Food</span>
      <span className={styles.match}>Match</span>
    </span>
  );
}

function BrandLogo({ variant = 'inline', showText = true, className = '' }) {
  const logoClass = [styles.logo, styles[variant], className].filter(Boolean).join(' ');

  return (
    <span className={logoClass}>
      <span className={styles.mark}>
        <LogoMark />
      </span>
      {showText && <Wordmark />}
    </span>
  );
}

export default BrandLogo;
