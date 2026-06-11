import styles from './NavBar.module.css';

/* ── Tab icon SVGs ── */

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const FavoritesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.3l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const tabs = [
  { id: 'home',      label: 'Home',      icon: <HomeIcon /> },
  { id: 'history',   label: 'History',   icon: <HistoryIcon /> },
  { id: 'favorites', label: 'Favorites', icon: <FavoritesIcon /> },
  { id: 'profile',   label: 'Profile',   icon: <ProfileIcon /> },
];

/**
 * Bottom navigation bar with 4 tabs.
 *
 * @param {string} activeTab – currently active tab id
 */
function NavBar({ activeTab = 'home' }) {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const tabClass = [styles.tab, isActive && styles.active]
          .filter(Boolean)
          .join(' ');

        return (
          <button key={tab.id} className={tabClass} aria-current={isActive ? 'page' : undefined}>
            <span className={styles.iconWrap}>{tab.icon}</span>
            <span className={styles.label}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default NavBar;
