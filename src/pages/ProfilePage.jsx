import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo/BrandLogo';
import Chip from '../components/Chip/Chip';
import NavBar from '../components/NavBar/NavBar';
import { useAuth } from '../context/AuthContext';
import { useUserData } from '../context/UserDataContext';
import MobileLayout from '../layouts/MobileLayout';
import styles from './ProfilePage.module.css';

/* Icons */
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
  const { currentUser, logout } = useAuth();
  const { userData, savePreferences, updateUserData } = useUserData();
  const displayName = userData?.displayName || currentUser?.displayName || 'FoodMatch User';
  const username = currentUser?.email ? `@${currentUser.email.split('@')[0]}` : '@foodmatch_user';
  const [openPanel, setOpenPanel] = useState('');
  const [settingsDraft, setSettingsDraft] = useState({
    displayName,
    email: userData?.email || currentUser?.email || '',
    password: '',
  });
  const [preferencesDraft, setPreferencesDraft] = useState(userData?.preferences || {
    price: [],
    cuisine: [],
    dietary: [],
    radius: 2,
  });

  const preferenceGroups = {
    price: ['$', '$$', '$$$'],
    cuisine: ['Italian', 'Burgers', 'Sushi', 'Mexican'],
    dietary: ['Vegetarian', 'Vegan', 'Gluten-free', 'Halal'],
  };

  useEffect(() => {
    setSettingsDraft({
      displayName,
      email: userData?.email || currentUser?.email || '',
      password: '',
    });
    setPreferencesDraft(userData?.preferences || {
      price: [],
      cuisine: [],
      dietary: [],
      radius: 2,
    });
  }, [currentUser?.email, displayName, userData]);

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  const togglePanel = (panel) => {
    setOpenPanel((current) => (current === panel ? '' : panel));
  };

  const togglePreference = (group, option) => {
    setPreferencesDraft((current) => {
      const selectedOptions = current[group] || [];
      const isSelected = selectedOptions.includes(option);

      return {
        ...current,
        [group]: isSelected
          ? selectedOptions.filter((item) => item !== option)
          : [...selectedOptions, option],
      };
    });
  };

  const saveAccountSettings = () => {
    updateUserData({
      displayName: settingsDraft.displayName.trim() || displayName,
      email: settingsDraft.email.trim() || currentUser?.email || '',
    });
  };

  return (
    <MobileLayout>
      <div className={styles.page}>
        <section className={styles.heroSection}>
        <img className={styles.heroBg} src="/hero_food.png" alt="" />
        <div className={styles.heroOverlay} />

        <header className={styles.header}>
          <div className={styles.logoWrap}>
            <BrandLogo variant="compact" />
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
          <h1 className={styles.name}>{displayName}</h1>
          <p className={styles.username}>{username}</p>
        </div>
      </section>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{userData?.roomsHosted ?? 0}</span>
          <span className={styles.statLabel}>Rooms Hosted</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{userData?.totalMatches ?? 0}</span>
          <span className={styles.statLabel}>Total Matches</span>
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Preferences</h2>

        <div className={styles.preferencesCard}>
          {Object.entries(preferenceGroups).map(([group, options]) => (
            <div className={styles.prefGroup} key={group}>
              <span className={styles.prefLabel}>
                {group === 'price' ? 'Price Range' : group === 'cuisine' ? 'Cuisine Preference' : 'Dietary Preferences'}
              </span>
              <div className={styles.chipRow}>
                {options.map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    selected={(preferencesDraft[group] || []).includes(option)}
                    onClick={() => togglePreference(group, option)}
                  />
                ))}
              </div>
            </div>
          ))}

          <button className={styles.savePrefsBtn} type="button" onClick={() => savePreferences(preferencesDraft)}>
            Save Preferences
          </button>
        </div>

        <div className={styles.menuCard}>
          <button className={styles.menuItem} onClick={() => togglePanel('account')}>
            <span className={styles.menuIcon}><UserSettingsIcon /></span>
            <span className={styles.menuText}>Account Settings</span>
            <span className={`${styles.menuChevron} ${openPanel === 'account' ? styles.open : ''}`}><ChevronRight /></span>
          </button>
          {openPanel === 'account' && (
            <div className={styles.panelContent}>
              <label className={styles.panelLabel}>
                Display name
                <input
                  className={styles.panelInput}
                  value={settingsDraft.displayName}
                  onChange={(event) => setSettingsDraft((current) => ({ ...current, displayName: event.target.value }))}
                />
              </label>
              <label className={styles.panelLabel}>
                Email
                <input
                  className={styles.panelInput}
                  type="email"
                  value={settingsDraft.email}
                  onChange={(event) => setSettingsDraft((current) => ({ ...current, email: event.target.value }))}
                />
              </label>
              <label className={styles.panelLabel}>
                Password
                <input
                  className={styles.panelInput}
                  type="password"
                  placeholder="New password"
                  value={settingsDraft.password}
                  onChange={(event) => setSettingsDraft((current) => ({ ...current, password: event.target.value }))}
                />
              </label>
              <button className={styles.panelSaveBtn} type="button" onClick={saveAccountSettings}>
                Save Account
              </button>
            </div>
          )}

          <button className={styles.menuItem} onClick={() => togglePanel('notifications')}>
            <span className={styles.menuIcon}><BellIcon /></span>
            <span className={styles.menuText}>Notification Preferences</span>
            <span className={`${styles.menuChevron} ${openPanel === 'notifications' ? styles.open : ''}`}><ChevronRight /></span>
          </button>
          {openPanel === 'notifications' && (
            <div className={styles.panelContent}>
              <label className={styles.toggleRow}>
                <span>Enable notifications</span>
                <input
                  type="checkbox"
                  checked={Boolean(userData?.notificationsEnabled)}
                  onChange={(event) => updateUserData({ notificationsEnabled: event.target.checked })}
                />
              </label>
            </div>
          )}

          <button className={styles.menuItem} onClick={() => navigate('/history')}>
            <span className={styles.menuIcon}><HistoryIcon /></span>
            <span className={styles.menuText}>Dining History</span>
            <span className={styles.menuChevron}><ChevronRight /></span>
          </button>
        </div>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogoutIcon />
          Log Out
        </button>
      </div>

      </div>
      <NavBar activeTab="profile" />
    </MobileLayout>
  );
}

export default ProfilePage;
