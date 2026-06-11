import Avatar from '../components/Avatar/Avatar';
import NavBar from '../components/NavBar/NavBar';
import styles from './WaitingRoomPage.module.css';

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

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const PersonPlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </svg>
);

const CrossedUtensils = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.12 9.87L20.48 3.51a.75.75 0 1 1 1.06 1.06l-6.36 6.36 1.06 1.06 6.36-6.36a.75.75 0 1 1 1.06 1.06l-6.36 6.36-2.12-2.12z" opacity="0" />
    <path d="M3 2v7c0 1.1.9 2 2 2h2v11h2V11h2c1.1 0 2-.9 2-2V2H3zm4 6H5V4h2v4zm2 0V4h2v4H9z" />
    <path d="M18 2v4.28C16.84 6.63 16 7.73 16 9v2c0 1.1.9 2 2 2h1v9h2V2h-3z" />
  </svg>
);

/* ── Static data ── */
const PIN_DIGITS = ['8', '8', '2', '1'];

const friends = [
  { name: 'You', src: '/avatar_host.png', isHost: true, checked: true, highlight: true },
  { name: 'Sarah', src: '/avatar_sarah.png' },
  { name: 'Mike', src: '/avatar_mike.png' },
];

/**
 * WaitingRoomPage — displays after room is created.
 * Shows room PIN, joined participants, and a waiting-for-host status.
 */
function WaitingRoomPage() {
  return (
    <main className={styles.page}>
      {/* ── Top header ── */}
      <header className={styles.header}>
        <button className={styles.backBtn} aria-label="Go back">
          <BackArrow />
        </button>
        <h1 className={styles.headerTitle}>Room PIN: 8821</h1>
        <span className={styles.headerRight} aria-hidden="true">
          <PeopleIcon />
        </span>
      </header>

      <div className={styles.body}>
        {/* ── Subtitle ── */}
        <div className={styles.subtitleGroup}>
          <p className={styles.subtitleLine}>Your room is ready!</p>
          <p className={styles.subtitleLine}>Share this PIN with your group</p>
        </div>

        {/* ── PIN display card ── */}
        <div className={styles.pinCard}>
          <div className={styles.pinDigits}>
            {PIN_DIGITS.map((d, i) => (
              <span key={i} className={styles.digit}>{d}</span>
            ))}
          </div>
          <button className={styles.copyBtn} aria-label="Copy PIN">
            <CopyIcon />
          </button>
        </div>

        {/* ── Squad section ── */}
        <section className={styles.squadSection} aria-label="Participants">
          <div className={styles.squadHeader}>
            <span className={styles.squadTitle}>Gathering the squad</span>
            <span className={styles.joinedBadge}>3 Joined</span>
          </div>

          <div className={styles.avatarsRow}>
            {friends.map((f) => (
              <Avatar
                key={f.name}
                src={f.src}
                name={f.name}
                isHost={f.isHost}
                checked={f.checked}
                highlight={f.highlight}
              />
            ))}

            <div className={styles.inviteWrapper}>
              <button className={styles.inviteCircle} aria-label="Invite friend">
                <PersonPlusIcon />
              </button>
              <span className={styles.inviteLabel}>Invite</span>
            </div>
          </div>
        </section>

        {/* ── Status card ── */}
        <section className={styles.statusCard} aria-label="Session status">
          {/* Arc ring + icon */}
          <div className={styles.statusIconWrap}>
            <svg className={styles.statusRingSvg} viewBox="0 0 120 120">
              {/* Background ring */}
              <circle cx="60" cy="60" r="52" fill="none" stroke="#2e2922" strokeWidth="3" />
              {/* Amber arc (top ~180°) */}
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke="#F5A623"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="163 327"
                strokeDashoffset="-245"
              />
            </svg>
            <div className={styles.statusIconInner}>
              <CrossedUtensils />
            </div>
          </div>

          <p className={styles.statusTitle}>You&apos;re all set!</p>
          <p className={styles.statusSubtitle}>
            Waiting for the host to start the swiping session...
          </p>

          {/* READY TO DECIDE badge */}
          <div className={styles.readyBadge}>
            <span className={styles.readyDot} />
            <span className={styles.readyText}>Ready to Decide</span>
          </div>
        </section>
      </div>

      {/* ── Bottom navigation ── */}
      <NavBar activeTab="home" />
    </main>
  );
}

export default WaitingRoomPage;
