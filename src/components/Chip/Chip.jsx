import styles from './Chip.module.css';

/**
 * Selectable pill / tag.
 *
 * @param {string}  label    – visible text
 * @param {boolean} selected – amber‑filled when true
 */
function Chip({ label, selected = false, onClick }) {
  const className = [styles.chip, selected && styles.selected]
    .filter(Boolean)
    .join(' ');

  if (onClick) {
    return (
      <button
        className={className}
        type="button"
        aria-pressed={selected}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }

  return <span className={className}>{label}</span>;
}

export default Chip;
