import styles from './Chip.module.css';

/**
 * Selectable pill / tag.
 *
 * @param {string}  label    – visible text
 * @param {boolean} selected – amber‑filled when true
 */
function Chip({ label, selected = false }) {
  const className = [styles.chip, selected && styles.selected]
    .filter(Boolean)
    .join(' ');

  return <span className={className}>{label}</span>;
}

export default Chip;
