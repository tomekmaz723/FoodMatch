import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './NavBar.module.css';

/* ── Tab icon SVGs ── */

const JoinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </svg>
);

const CreateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
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

const publicTabs = [
  { id: 'new-room',  label: 'New Room',  path: '/lobby',     icon: <CreateIcon /> },
  { id: 'join-room', label: 'Join Room', path: '/join',      icon: <JoinIcon /> },
  { id: 'profile',   label: 'Profile',   path: '/auth/login', icon: <ProfileIcon /> },
];

const privateTabs = [
  { id: 'new-room',  label: 'New Room',  path: '/lobby',     icon: <CreateIcon /> },
  { id: 'join-room', label: 'Join Room', path: '/join',      icon: <JoinIcon /> },
  { id: 'history',   label: 'History',   path: '/history',   icon: <HistoryIcon /> },
  { id: 'favorites', label: 'Favorites', path: '/favorites', icon: <FavoritesIcon /> },
  { id: 'profile',   label: 'Profile',   path: '/profile',   icon: <ProfileIcon /> },
];

/**
 * Bottom navigation bar with 5 tabs.
 *
 * @param {string} activeTab – currently active tab id
 */
function NavBar({ activeTab = '' }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const tabs = currentUser ? privateTabs : publicTabs;

  return (
    <nav className={`${styles.nav} ${!currentUser ? styles.publicNav : ''}`} aria-label="Main navigation">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const tabClass = [styles.tab, isActive && styles.active]
          .filter(Boolean)
          .join(' ');

        return (
          <button 
            key={tab.id} 
            className={tabClass} 
            aria-current={isActive ? 'page' : undefined}
            onClick={() => navigate(tab.path)}
          >
            <span className={styles.iconWrap}>{tab.icon}</span>
            <span className={styles.label}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default NavBar;
