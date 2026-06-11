import styles from './Avatar.module.css';

/**
 * Circular user avatar with a name label underneath.
 *
 * @param {string}  src       – image URL
 * @param {string}  name      – display name
 * @param {boolean} isHost    – adds amber ring when true
 * @param {boolean} checked   – shows a small amber checkmark badge
 * @param {boolean} highlight – renders name in amber
 */
function Avatar({ src, name, isHost = false, checked = false, highlight = false }) {
  const ringClass = [styles.ring, isHost && styles.host]
    .filter(Boolean)
    .join(' ');

  const nameClass = [styles.name, highlight && styles.nameHighlight]
    .filter(Boolean)
    .join(' ');

  return (
    <figure className={styles.wrapper}>
      <div className={ringClass}>
        <img className={styles.image} src={src} alt={name} />
        {checked && (
          <span className={styles.checkBadge} aria-label="Ready">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
      </div>
      <figcaption className={nameClass}>{name}</figcaption>
    </figure>
  );
}

export default Avatar;
