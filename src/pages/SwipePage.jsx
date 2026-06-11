import { useNavigate } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard/RestaurantCard';
import NavBar from '../components/NavBar/NavBar';
import styles from './SwipePage.module.css';

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

/**
 * SwipePage — the main swiping experience.
 * Shows one restaurant card at a time with reject / super-like / like actions.
 */
function SwipePage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <button className={styles.backBtn} aria-label="Go back" onClick={() => navigate(-1)}>
          <BackArrow />
        </button>
        <h1 className={styles.headerTitle}>Room PIN: 8821</h1>
        <span className={styles.headerRight} aria-hidden="true">
          <PeopleIcon />
        </span>
      </header>

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
          <button className={`${styles.actionBtn} ${styles.reject}`} aria-label="Reject" onClick={() => navigate('/nomatch')}>
            <XIcon />
          </button>
          <button className={`${styles.actionBtn} ${styles.superLike}`} aria-label="Super like" onClick={() => navigate('/result')}>
            <StarIcon />
          </button>
          <button className={`${styles.actionBtn} ${styles.like}`} aria-label="Like" onClick={() => navigate('/result')}>
            <HeartIcon />
          </button>
        </div>
      </div>

      {/* ── Bottom navigation ── */}
      <NavBar activeTab="home" />
    </main>
  );
}

export default SwipePage;
