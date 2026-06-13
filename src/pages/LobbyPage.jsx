import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar/Avatar';
import Chip from '../components/Chip/Chip';
import Button from '../components/Button/Button';
import NavBar from '../components/NavBar/NavBar';
import ScreenHeader from '../components/ScreenHeader/ScreenHeader';
import StatCard from '../components/StatCard/StatCard';
import { useAuth } from '../context/AuthContext';
import { useUserData } from '../context/UserDataContext';
import MobileLayout from '../layouts/MobileLayout';
import WaitingRoomPage from './WaitingRoomPage';
import styles from './LobbyPage.module.css';

/* ── Inline SVG icons ── */

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ForkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 2v7c0 1.1.9 2 2 2h2v11h2V11h2c1.1 0 2-.9 2-2V2H3zm4 6H5V4h2v4zm2 0V4h2v4h-2z" />
    <path d="M18 2v4.28C16.84 6.63 16 7.73 16 9v2c0 1.1.9 2 2 2h1v9h2V2h-3z" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ── Static data visible on screen ── */

const friends = [
  { name: 'You (Host)', src: '/avatar_host.png', isHost: true },
  { name: 'Sarah', src: '/avatar_sarah.png', isHost: false },
  { name: 'Mike', src: '/avatar_mike.png', isHost: false },
];

const preferenceGroups = {
  price: ['$', '$$', '$$$'],
  cuisine: ['Italian', 'Burgers', 'Sushi', 'Mexican'],
  dietary: ['Vegetarian', 'Vegan', 'Gluten-free', 'Halal'],
};

const generateRoomPin = () =>
  Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');

/**
 * LobbyPage — the room lobby where the host sets preferences
 * and waits for participants before starting.
 */
function LobbyPage({ isHost = false, isParticipant = false }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { userData, recordHostedRoom } = useUserData();
  const roomPin = useMemo(generateRoomPin, []);
  const pinDigits = roomPin.split('');
  const [selectedPreferences, setSelectedPreferences] = useState({
    price: ['$'],
    cuisine: ['Italian'],
    dietary: ['Vegan'],
  });
  const [radius, setRadius] = useState(2);
  const [useSavedPreferences, setUseSavedPreferences] = useState(false);
  const shouldShowParticipantLobby = isParticipant && !isHost;
  const canUseSavedPreferences = Boolean(currentUser && userData?.preferencesSaved);
  const savedPreferencesChecked = canUseSavedPreferences && useSavedPreferences;

  if (shouldShowParticipantLobby) {
    return <WaitingRoomPage />;
  }

  const togglePreference = (group, option) => {
    setSelectedPreferences((current) => {
      const selectedOptions = current[group];
      const isSelected = selectedOptions.includes(option);

      return {
        ...current,
        [group]: isSelected
          ? selectedOptions.filter((item) => item !== option)
          : [...selectedOptions, option],
      };
    });
  };

  const handleCopyPin = async () => {
    await navigator.clipboard?.writeText(roomPin);
  };

  const handleStartRoom = () => {
    recordHostedRoom();
    navigate('/swipe', { state: { roomPin } });
  };

  const handleSavedPreferencesChange = (event) => {
    const checked = event.target.checked;
    setUseSavedPreferences(checked);

    if (checked && userData?.preferences) {
      setSelectedPreferences({
        price: userData.preferences.price || [],
        cuisine: userData.preferences.cuisine || [],
        dietary: userData.preferences.dietary || [],
      });
      setRadius(userData.preferences.radius || 2);
    }
  };

  const increaseRadius = () => {
    setRadius((currentRadius) => currentRadius + 1);
  };

  const decreaseRadius = () => {
    setRadius((currentRadius) => Math.max(1, currentRadius - 1));
  };

  return (
    <MobileLayout>
      <div className={styles.page}>
      <ScreenHeader title="Create Room" backButton variant="inside" />
      {/* ── Banner ── */}
      <header className={styles.banner}>
        <span className={styles.bannerLabel}>Lobby Active</span>
        <h1 className={styles.bannerTitle}>Gathering the squad</h1>

        <div className={styles.readyGroup}>
          <p className={styles.readyTitle}>Your room is ready!</p>
          <p className={styles.readySubtitle}>Share this PIN with your group</p>
        </div>

        <div className={styles.pinCard}>
          <div className={styles.pinDigits}>
            {pinDigits.map((digit, index) => (
              <span key={`${digit}-${index}`} className={styles.pinDigit}>{digit}</span>
            ))}
          </div>
          <button className={styles.copyBtn} type="button" aria-label="Copy PIN" onClick={handleCopyPin}>
            <CopyIcon />
          </button>
        </div>
      </header>

      {/* ── Friends in Room ── */}
      <section className={styles.friendsSection} aria-label="Friends in room">
        <div className={styles.friendsHeader}>
          <h2 className={styles.friendsTitle}>Friends in Room</h2>
          <span className={styles.onlineBadge}>
            <span className={styles.onlineDot} />
            3 Joined
          </span>
        </div>

        <div className={styles.avatarsRow}>
          {friends.map((friend) => (
            <Avatar
              key={friend.name}
              src={friend.src}
              name={friend.name}
              isHost={friend.isHost}
            />
          ))}

          {/* Invite button */}
          <div className={styles.inviteWrapper}>
            <button className={styles.inviteCircle} aria-label="Invite friend">
              <PlusIcon />
            </button>
            <span className={styles.inviteLabel}>Invite</span>
          </div>
        </div>
      </section>

      {/* ── Room Preferences ── */}
      <section className={styles.preferencesCard} aria-label="Room preferences">
        <h2 className={styles.preferencesTitle}>Room Preferences</h2>

        {/* Price Range */}
        <div className={styles.prefGroup}>
          <span className={styles.prefLabel}>Price Range</span>
          <div className={styles.chipRow}>
            {preferenceGroups.price.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={selectedPreferences.price.includes(option)}
                onClick={() => togglePreference('price', option)}
              />
            ))}
          </div>
        </div>

        {/* Cuisine Preference */}
        <div className={styles.prefGroup}>
          <span className={styles.prefLabel}>Cuisine Preference</span>
          <div className={styles.chipRow}>
            {preferenceGroups.cuisine.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={selectedPreferences.cuisine.includes(option)}
                onClick={() => togglePreference('cuisine', option)}
              />
            ))}
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className={styles.prefGroup}>
          <span className={styles.prefLabel}>Dietary Preferences</span>
          <div className={styles.chipRow}>
            {preferenceGroups.dietary.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={selectedPreferences.dietary.includes(option)}
                onClick={() => togglePreference('dietary', option)}
              />
            ))}
          </div>
        </div>

        {/* Saved prefs checkbox */}
        <label className={`${styles.checkboxRow} ${!canUseSavedPreferences ? styles.disabledOption : ''}`}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={savedPreferencesChecked}
            disabled={!canUseSavedPreferences}
            title={!canUseSavedPreferences ? 'Save preferences in your profile first' : undefined}
            onChange={handleSavedPreferencesChange}
          />
          <span className={styles.checkboxText}>Use my saved preferences</span>
        </label>
      </section>

      {/* ── Stats Row ── */}
      <div className={styles.statsRow}>
        <StatCard
          label="Potential Matches"
          value="24+"
          accent="amber"
          icon={<ForkIcon />}
        />
        <StatCard
          label="Radius"
          value={
            <span className={styles.radiusControl}>
              <span className={styles.radiusValue}>{radius}</span>
              <span className={styles.radiusUnit}>km</span>
              <span className={styles.radiusStepper}>
                <button
                  className={styles.radiusButton}
                  type="button"
                  aria-label="Increase radius"
                  onClick={increaseRadius}
                >
                  <ChevronUpIcon />
                </button>
                <button
                  className={styles.radiusButton}
                  type="button"
                  aria-label="Decrease radius"
                  onClick={decreaseRadius}
                  disabled={radius === 1}
                >
                  <ChevronDownIcon />
                </button>
              </span>
            </span>
          }
          accent="cyan"
          icon={<PinIcon />}
        />
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        <Button variant="filled" onClick={handleStartRoom}>
          Start Room
        </Button>
      </div>
      </div>
      <NavBar activeTab="new-room" />
    </MobileLayout>
  );
}

export default LobbyPage;
