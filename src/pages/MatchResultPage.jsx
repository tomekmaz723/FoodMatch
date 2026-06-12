import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import ScreenHeader, { PeopleIcon } from '../components/ScreenHeader/ScreenHeader';
import MobileLayout from '../layouts/MobileLayout';
import styles from './MatchResultPage.module.css';

/* ═══════════════════════════════════
   Inline SVG icons
   ═══════════════════════════════════ */

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

const StarOutline = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/* ── Static data ── */

const initials = [
  { id: 'JD', cls: 'initJD' },
  { id: 'AL', cls: 'initAL' },
  { id: 'MK', cls: 'initMK' },
];

const FALLBACK_PIN = '8821';

/**
 * MatchResultPage — shown when all group members agree on a restaurant.
 */
function MatchResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const roomPin = location.state?.roomPin || FALLBACK_PIN;

  return (
    <MobileLayout>
      <div className={styles.page}>
      {/* ── Header ── */}
      <ScreenHeader title={`Room PIN: ${roomPin}`} backButton rightIcon={<PeopleIcon />} />

      <div className={styles.body}>
        {/* ── Announcement ── */}
        <div className={styles.announcement}>
          <h2 className={styles.matchHeading}>It&apos;s a Match!</h2>
          <p className={styles.matchSubtext}>Everyone wants to eat at...</p>
        </div>

        {/* ── Result card ── */}
        <article className={styles.resultCard}>
          <div className={styles.imageWrap}>
            <img
              className={styles.cardImage}
              src="/restaurant_burger.png"
              alt="The Burger Joint"
            />
            <div className={styles.imageOverlay} aria-hidden="true" />

            {/* Badges on image */}
            <div className={styles.imageBadges}>
              <span className={styles.matchBadge}>98% Match</span>
              <div className={styles.initialsGroup}>
                {initials.map((init) => (
                  <span key={init.id} className={`${styles.initialCircle} ${styles[init.cls]}`}>
                    {init.id}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.cardInfo}>
            <h3 className={styles.restaurantName}>The Burger Joint</h3>

            <div className={styles.metaRow}>
              <StarOutline />
              <span>4.8 (2.4k reviews)</span>
              <span className={styles.metaDot}>·</span>
              <span>$$</span>
            </div>

            <div className={styles.tags}>
              <span className={styles.tag}>Gourmet Burgers</span>
              <span className={styles.tag}>Craft Beer</span>
              <span className={styles.tag}>Outdoor Seating</span>
            </div>
          </div>
        </article>

        {/* ── Action buttons ── */}
        <div className={styles.actions}>
          <Button variant="filled" icon={<InfoIcon />} onClick={() => navigate('/restaurant')}>
            View Details
          </Button>
          <Button variant="outlined" icon={<MapIcon />} onClick={() => navigate('/')}>
            Open in Maps
          </Button>
        </div>
      </div>
    </div>
  </MobileLayout>
  );
}

export default MatchResultPage;
