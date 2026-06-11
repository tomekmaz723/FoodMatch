import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import NavBar from '../components/NavBar/NavBar';
import styles from './RestaurantDetailPage.module.css';

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

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const MoneyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 2v8h16V8H4zm6 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm-4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm14 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
  </svg>
);

const MapArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

const HeartOutlineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.3l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const CheckSmall = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
  </svg>
);

/**
 * RestaurantDetailPage — Detailed view of a restaurant.
 */
function RestaurantDetailPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* ── Header (Overlaid) ── */}
      <header className={styles.header}>
        <button className={styles.backBtn} aria-label="Go back" onClick={() => navigate(-1)}>
          <BackArrow />
        </button>
        <h1 className={styles.headerTitle}>Room PIN: 8821</h1>
        <span className={styles.headerRight} aria-hidden="true">
          <PeopleIcon />
        </span>
      </header>

      {/* ── Hero Image & Badges ── */}
      <section className={styles.heroSection}>
        <img className={styles.heroImage} src="/restaurant_pasta.png" alt="Italiano Verace" />
        <div className={styles.heroOverlay} aria-hidden="true" />
        
        <div className={styles.heroBadges}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}><StarIcon /></span>
            <div className={styles.ratingText}>
              <span>4.8</span>
              <span className={styles.ratingSub}>(1.2k+)</span>
            </div>
          </div>
          
          <div className={`${styles.badge} ${styles.singleLineBadge}`}>
            <span className={styles.badgeIcon}><MoneyIcon /></span>
            <span>$$$</span>
          </div>

          <div className={styles.badge}>
            <span className={styles.badgeIcon}><MapArrowIcon /></span>
            <div className={styles.ratingText}>
              <span>1.2</span>
              <span className={styles.ratingSub}>km</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content Body ── */}
      <div className={styles.body}>
        {/* Title */}
        <div className={styles.titleRow}>
          <h2 className={styles.title}>Italiano Verace</h2>
          <button className={styles.heartBtn} aria-label="Favorite">
            <HeartOutlineIcon />
          </button>
        </div>

        {/* Description */}
        <p className={styles.description}>
          Experience the soul of Naples in every bite. Our master chefs craft
          authentic wood-fired pizzas using century-old sourdough techniques
          and the finest imported San Marzano tomatoes. From our hand-rolled
          pasta to our legendary tiramisu, every dish is a love letter to
          Italian tradition.
        </p>

        {/* Tags */}
        <div className={styles.tags}>
          <span className={styles.tag}>Pizza</span>
          <span className={styles.tag}>Pasta</span>
          <span className={styles.tag}>Fine Dining</span>
          <span className={styles.tag}>Italian</span>
        </div>

        {/* Opening Hours Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <ClockIcon />
            <span>Opening Hours</span>
          </div>
          <div className={styles.hoursList}>
            <div className={`${styles.hoursRow} ${styles.strong}`}>
              <span>Mon - Thu</span>
              <span>11:00 - 22:00</span>
            </div>
            <div className={styles.hoursRow}>
              <span>Fri - Sat</span>
              <span>11:00 - 00:00</span>
            </div>
            <div className={styles.hoursRow}>
              <span>Sunday</span>
              <span>12:00 - 21:00</span>
            </div>
          </div>
        </div>

        {/* Services Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <TruckIcon />
            <span>Services</span>
          </div>
          <div className={styles.servicesList}>
            <div className={styles.serviceRow}>
              <div className={styles.checkWrap}><CheckSmall /></div>
              <span>Delivery (20-35 mins)</span>
            </div>
            <div className={styles.serviceRow}>
              <div className={styles.checkWrap}><CheckSmall /></div>
              <span>Curbside Pickup</span>
            </div>
          </div>
        </div>

        {/* Map Card */}
        <div className={styles.mapCard}>
          <img className={styles.mapImage} src="/map_placeholder.png" alt="Map" />
          <div className={styles.mapOverlay}>
            <div className={styles.mapPin}>
              <MapPinIcon />
            </div>
          </div>
          <span className={styles.mapAddress}>123 Via del Corso, Rome</span>
        </div>
      </div>

      {/* ── Sticky Bottom Bar ── */}
      <div className={styles.bottomBar}>
        <button className={styles.orderBtn}>
          <ShoppingBagIcon />
          Order Now
        </button>
        <button className={styles.calendarBtn} aria-label="Book a table">
          <CalendarIcon />
        </button>
      </div>
    </main>
  );
}

export default RestaurantDetailPage;
