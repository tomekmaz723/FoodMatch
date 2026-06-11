import styles from './StatCard.module.css';

/**
 * Compact stat card with a label, large value, and floating icon.
 *
 * @param {string}         label      – e.g. "Potential Matches"
 * @param {string}         value      – e.g. "24+"
 * @param {'amber'|'cyan'} accent     – value color
 * @param {React.ReactNode} icon      – decorative SVG icon
 */
function StatCard({ label, value, accent = 'amber', icon }) {
  return (
    <article className={styles.card}>
      <span className={styles.label}>{label}</span>
      <span className={`${styles.value} ${styles[accent]}`}>{value}</span>
      {icon && <span className={styles.iconFloat} aria-hidden="true">{icon}</span>}
    </article>
  );
}

export default StatCard;
