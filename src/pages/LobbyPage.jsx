import Avatar from '../components/Avatar/Avatar';
import Chip from '../components/Chip/Chip';
import StatCard from '../components/StatCard/StatCard';
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

/* ── Static data visible on screen ── */

const friends = [
  { name: 'You (Host)', src: '/avatar_host.png', isHost: true },
  { name: 'Sarah', src: '/avatar_sarah.png', isHost: false },
  { name: 'Mike', src: '/avatar_mike.png', isHost: false },
];

/**
 * LobbyPage — the room lobby where the host sets preferences
 * and waits for participants before starting.
 */
function LobbyPage() {
  return (
    <main className={styles.page}>
      {/* ── Banner ── */}
      <header className={styles.banner}>
        <span className={styles.bannerLabel}>Lobby Active</span>
        <h1 className={styles.bannerTitle}>Gathering the squad</h1>
      </header>

      {/* ── Friends in Room ── */}
      <section className={styles.friendsSection} aria-label="Friends in room">
        <div className={styles.friendsHeader}>
          <h2 className={styles.friendsTitle}>Friends in Room</h2>
          <span className={styles.onlineBadge}>3 Online</span>
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
            <Chip label="$" selected />
            <Chip label="$$" />
            <Chip label="$$$" />
          </div>
        </div>

        {/* Cuisine Preference */}
        <div className={styles.prefGroup}>
          <span className={styles.prefLabel}>Cuisine Preference</span>
          <div className={styles.chipRow}>
            <Chip label="Italian" selected />
            <Chip label="Burgers" />
            <Chip label="Sushi" />
            <Chip label="Mexican" />
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className={styles.prefGroup}>
          <span className={styles.prefLabel}>Dietary Preferences</span>
          <div className={styles.chipRow}>
            <Chip label="Vegetarian" />
            <Chip label="Vegan" selected />
            <Chip label="Gluten-free" />
            <Chip label="Halal" />
          </div>
        </div>

        {/* Saved prefs checkbox */}
        <label className={styles.checkboxRow}>
          <input type="checkbox" className={styles.checkbox} />
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
          value="5mi"
          accent="cyan"
          icon={<PinIcon />}
        />
      </div>
    </main>
  );
}

export default LobbyPage;
