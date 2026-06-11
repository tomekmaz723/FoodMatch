import Button from '../components/Button/Button';
import NavBar from '../components/NavBar/NavBar';
import styles from './NoMatchPage.module.css';

/* ═══════════════════════════════════
   Inline SVG icons
   ═══════════════════════════════════ */

const BackArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/** Broken location pin — represents "no match" */
const BrokenPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <path d="M9.5 7.5L14.5 12.5" />
    <path d="M14.5 7.5L9.5 12.5" />
  </svg>
);

const TrendUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const StarFill = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

/* ── Static data ── */

const initials = [
  { id: 'JD', cls: 'initJD' },
  { id: 'AM', cls: 'initAM' },
  { id: 'SK', cls: 'initSK' },
];

/**
 * NoMatchPage — shown when there is no unanimous match.
 * Displays the group's top-voted restaurant as a fallback.
 */
function NoMatchPage() {
  return (
    <main className={styles.page}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <button className={styles.backBtn} aria-label="Go back">
          <BackArrow />
        </button>
        <h1 className={styles.headerTitle}>Room PIN: 8821</h1>
        <span className={styles.headerRight} aria-hidden="true">
          <PeopleIcon />
        </span>
      </header>

      <div className={styles.body}>
        {/* ── Sad icon ── */}
        <div className={styles.sadIconArea}>
          <div className={styles.sadCircle} aria-hidden="true">
            <BrokenPinIcon />
          </div>
        </div>

        {/* ── Text ── */}
        <div className={styles.textBlock}>
          <h2 className={styles.noMatchTitle}>No Perfect Match</h2>
          <p className={styles.noMatchSubtext}>But here&apos;s the group favorite!</p>
        </div>

        {/* ── Favorite card ── */}
        <article className={styles.favCard}>
          <span className={styles.agreementBadge}>
            <TrendUpIcon />
            80% Agreement
          </span>

          <div className={styles.favImageWrap}>
            <img
              className={styles.favImage}
              src="/restaurant_pizza.png"
              alt="Pizza Palace"
            />
            <div className={styles.favImageOverlay} aria-hidden="true" />

            <div className={styles.favImageInfo}>
              <div className={styles.favMeta}>
                <StarFill />
                <span>4.5 Stars</span>
                <span>·</span>
                <span>$$</span>
              </div>
              <h3 className={styles.favName}>Pizza Palace</h3>
            </div>
          </div>

          <div className={styles.favBottom}>
            <div className={styles.initialsRow}>
              {initials.map((init) => (
                <span key={init.id} className={`${styles.initialCircle} ${styles[init.cls]}`}>
                  {init.id}
                </span>
              ))}
              <span className={styles.plusBadge}>+2</span>
            </div>
            <span className={styles.topChoice}>Top Choice</span>
          </div>
        </article>

        {/* ── Actions ── */}
        <div className={styles.actions}>
          <Button variant="filled" icon={<CheckIcon />}>
            Choose this anyway
          </Button>
          <Button variant="outlined" icon={<RefreshIcon />}>
            Start New Round
          </Button>
        </div>
      </div>

      {/* ── Bottom navigation (Profile active) ── */}
      <NavBar activeTab="profile" />
    </main>
  );
}

export default NoMatchPage;
