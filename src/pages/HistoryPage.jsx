import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import ScreenHeader from '../components/ScreenHeader/ScreenHeader';
import { useUserData } from '../context/UserDataContext';
import MobileLayout from '../layouts/MobileLayout';
import styles from './HistoryPage.module.css';

/* Icons */
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function HistoryPage() {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const matches = userData?.history || [];

  const openRestaurant = (restaurant) => {
    navigate('/restaurant', { state: { restaurant } });
  };

  return (
    <MobileLayout>
      <div className={styles.page}>
      <ScreenHeader
        title="History"
        variant="compact"
      />

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Decisions</span>
          <span className={styles.statValue}>{userData?.totalDecisions ?? 0}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Top Cuisine</span>
          <span className={styles.statValue}>{userData?.topCuisine || '-'}</span>
        </div>
      </div>

      <div className={styles.listContainer}>
        <h2 className={styles.sectionTitle}>Recent Matches</h2>

        {matches.length === 0 && (
          <p className={styles.emptyText}>No dining history yet.</p>
        )}

        {matches.map((match) => (
          <article
            key={`${match.id}-${match.date}`}
            className={styles.matchCard}
            role="button"
            tabIndex={0}
            onClick={() => openRestaurant(match)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openRestaurant(match);
              }
            }}
          >
            <img className={styles.cardImage} src={match.image} alt={match.name} />
            
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{match.name}</h3>
              <p className={styles.cardMeta}>{match.date}</p>
              
              <div className={styles.avatarsRow}>
                {match.avatars.map((av, idx) => (
                  <img key={idx} className={styles.tinyAvatar} src={av} alt="" />
                ))}
                {match.plusCount && (
                  <span className={styles.plusBadge}>+{match.plusCount}</span>
                )}
              </div>
            </div>

            <span className={styles.chevronIcon}><ChevronRight /></span>
          </article>
        ))}

        <button className={styles.viewMoreBtn}>
          View More History
        </button>
      </div>

      </div>
      <NavBar activeTab="history" />
    </MobileLayout>
  );
}

export default HistoryPage;
