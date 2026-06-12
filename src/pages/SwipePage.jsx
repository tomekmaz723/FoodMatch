import { useLocation, useNavigate } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard/RestaurantCard';
import NavBar from '../components/NavBar/NavBar';
import ScreenHeader, { PeopleIcon } from '../components/ScreenHeader/ScreenHeader';
import MobileLayout from '../layouts/MobileLayout';
import styles from './SwipePage.module.css';

/* ═══════════════════════════════════
   Inline SVG icons
   ═══════════════════════════════════ */

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.3l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

/* ── Static data ── */

const miniAvatars = [
  '/avatar_host.png',
  '/avatar_sarah.png',
  '/avatar_mike.png',
];

const FALLBACK_PIN = '8821';

/**
 * SwipePage — the main swiping experience.
 * Shows one restaurant card at a time with reject / super-like / like actions.
 */
function SwipePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const roomPin = location.state?.roomPin || FALLBACK_PIN;
  const routeState = { roomPin };

  return (
    <MobileLayout>
      <div className={styles.page}>
      {/* ── Header ── */}
      <ScreenHeader title={`Room PIN: ${roomPin}`} backButton rightIcon={<PeopleIcon />} />

      {/* ── Sub-header: mini avatars + swiping text ── */}
      <div className={styles.subheader}>
        <div className={styles.miniAvatars}>
          {miniAvatars.map((src, i) => (
            <img key={i} className={styles.miniAvatar} src={src} alt="" />
          ))}
        </div>
        <span className={styles.swipingText}>3 friends swiping</span>
      </div>

      <div className={styles.body}>
        {/* ── Restaurant card ── */}
        <RestaurantCard
          image="/restaurant_burger.png"
          name="The Burger Joint"
          rating={4.8}
          price="$$"
          distance="0.8 km"
          tags={['Burgers', 'American', 'Craft Beer']}
        />

        {/* ── Action buttons ── */}
        <div className={styles.actions}>
          <button className={`${styles.actionBtn} ${styles.reject}`} aria-label="Reject" onClick={() => navigate('/nomatch', { state: routeState })}>
            <XIcon />
          </button>
          <button className={`${styles.actionBtn} ${styles.superLike}`} aria-label="Super like" onClick={() => navigate('/result', { state: routeState })}>
            <StarIcon />
          </button>
          <button className={`${styles.actionBtn} ${styles.like}`} aria-label="Like" onClick={() => navigate('/result', { state: routeState })}>
            <HeartIcon />
          </button>
        </div>
      </div>

      {/* ── Bottom navigation ── */}
      </div>
      <NavBar />
    </MobileLayout>
  );
}

export default SwipePage;
