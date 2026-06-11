import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import styles from './ProfilePage.module.css';

/* Icons */
const ForkKnifeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 2v9a3 3 0 0 1-2 2v9H7v-9a3 3 0 0 1-2-2V2h1.5v7a1.5 1.5 0 0 0 3 0V2H11zM19 2h-1v10.5A2.5 2.5 0 0 1 15.5 15H15v7h-2v-7h-.5A2.5 2.5 0 0 1 10 12.5V2h1.5v10.5a1 1 0 0 0 1 1h.5v-10h1.5v10h.5a1 1 0 0 0 1-1V2H19z" />
  </svg>
);

const PencilIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CrossedForkKnife = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="21" x2="21" y2="3" />
    <path d="M3 3l6 6" />
    <path d="M21 21l-6-6" />
    <path d="M10.5 7.5L7.5 10.5M16.5 13.5l-3 3" />
  </svg>
);

const UserSettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path d="M19.4 6.6l1.2-1.2" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
    <path d="M16 4a9 9 0 0 0-11.5 2M4 9v-5h5" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

function ProfilePage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <img className={styles.heroBg} src="/hero_food_table.png" alt="" />
        <div className={styles.heroOverlay} />

        <header className={styles.header}>
          <div className={styles.logoWrap}>
            <ForkKnifeIcon />
            <span>FoodMatch</span>
          </div>
          <img className={styles.smallAvatar} src="/avatar_alex.png" alt="Profile" />
        </header>

        <div className={styles.profileInfo}>
          <div className={styles.avatarWrap}>
            <img className={styles.mainAvatar} src="/avatar_alex.png" alt="Alex Johnson" />
            <button className={styles.editBtn} aria-label="Edit Profile">
              <PencilIcon />
            </button>
          </div>
          <h1 className={styles.name}>Alex Johnson</h1>
          <p className={styles.username}>@alex_j_eats</p>
        </div>
      </section>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statNum}>24</span>
          <span className={styles.statLabel}>Rooms Hosted</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>142</span>
          <span className={styles.statLabel}>Total Matches</span>
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Preferences</h2>

        <div className={styles.menuCard}>
          <button className={styles.menuItem}>
            <span className={styles.menuIcon}><CrossedForkKnife /></span>
            <span className={styles.menuText}>Dietary Defaults</span>
            <span className={styles.menuChevron}><ChevronRight /></span>
          </button>
          <div className={styles.dietaryContent}>
            <span className={`${styles.dietTag} ${styles.active}`}>Vegan</span>
            <span className={styles.dietTag}>Gluten-Free</span>
            <span className={styles.dietTag}>Spicy</span>
            <button className={`${styles.dietTag} ${styles.add}`}>+ Add Tag</button>
          </div>
        </div>

        <div className={styles.menuCard}>
          <button className={styles.menuItem}>
            <span className={styles.menuIcon}><UserSettingsIcon /></span>
            <span className={styles.menuText}>Account Settings</span>
            <span className={styles.menuChevron}><ChevronRight /></span>
          </button>
          <button className={styles.menuItem}>
            <span className={styles.menuIcon}><BellIcon /></span>
            <span className={styles.menuText}>Notification Preferences</span>
            <span className={styles.menuChevron}><ChevronRight /></span>
          </button>
          <button className={styles.menuItem}>
            <span className={styles.menuIcon}><HistoryIcon /></span>
            <span className={styles.menuText}>Dining History</span>
            <span className={styles.menuChevron}><ChevronRight /></span>
          </button>
        </div>

        <button className={styles.logoutBtn} onClick={() => navigate('/')}>
          <LogoutIcon />
          Log Out
        </button>
      </div>

      <NavBar activeTab="profile" />
    </main>
  );
}

export default ProfilePage;
