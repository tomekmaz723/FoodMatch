import NavBar from '../components/NavBar/NavBar';
import ScreenHeader, { PeopleIcon } from '../components/ScreenHeader/ScreenHeader';
import MobileLayout from '../layouts/MobileLayout';
import styles from './HistoryPage.module.css';

/* Icons */
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const matches = [
  {
    id: 1,
    name: "The Golden Grill",
    date: "Yesterday, 8:30 PM",
    image: "/restaurant_grill.png",
    avatars: ["/avatar_alex.png", "/avatar_sarah.png"],
    plusCount: 2,
  },
  {
    id: 2,
    name: "Sushi Zen Master",
    date: "Nov 14, 2023",
    image: "/restaurant_sushi.png",
    avatars: ["/avatar_alex.png", "/avatar_mike.png"],
  },
  {
    id: 3,
    name: "Luigi's Neapolitan",
    date: "Nov 12, 2023",
    image: "/restaurant_pizza.png",
    avatars: ["/avatar_host.png", "/avatar_sarah.png", "/avatar_mike.png"],
  },
  {
    id: 4,
    name: "Burger Republic",
    date: "Nov 08, 2023",
    image: "/restaurant_burger.png",
    avatars: ["/avatar_alex.png"],
  },
];

function HistoryPage() {
  return (
    <MobileLayout>
      <div className={styles.page}>
      <ScreenHeader
        title="History"
        backButton
        rightIcon={<PeopleIcon />}
        variant="spacious"
        titleTone="accent"
      />

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Decisions</span>
          <span className={styles.statValue}>42</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Top Cuisine</span>
          <span className={styles.statValue}>Japanese</span>
        </div>
      </div>

      <div className={styles.listContainer}>
        <h2 className={styles.sectionTitle}>Recent Matches</h2>

        {matches.map((match) => (
          <article key={match.id} className={styles.matchCard}>
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
