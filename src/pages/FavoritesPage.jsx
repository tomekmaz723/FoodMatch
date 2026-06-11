import NavBar from '../components/NavBar/NavBar';
import styles from './FavoritesPage.module.css';

const ForkKnifeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 2v9a3 3 0 0 1-2 2v9H7v-9a3 3 0 0 1-2-2V2h1.5v7a1.5 1.5 0 0 0 3 0V2H11zM19 2h-1v10.5A2.5 2.5 0 0 1 15.5 15H15v7h-2v-7h-.5A2.5 2.5 0 0 1 10 12.5V2h1.5v10.5a1 1 0 0 0 1 1h.5v-10h1.5v10h.5a1 1 0 0 0 1-1V2H19z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const HeartFilledIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const favorites = [
  {
    id: 1,
    name: "Luigi's Pizzeria",
    rating: "4.9",
    price: "$$",
    sub: "Best Truffle Pizza in NYC",
    image: "/restaurant_pizza.png",
  },
  {
    id: 2,
    name: "Sakura Zen",
    rating: "4.7",
    price: "$$$",
    sub: "Authentic Omakase experience",
    image: "/restaurant_sushi.png",
  },
  {
    id: 3,
    name: "The Burger Box",
    rating: "4.5",
    price: "$$",
    sub: "Classic comfort in every bite",
    image: "/restaurant_burger.png",
  },
  {
    id: 4,
    name: "El Camino Tacos",
    rating: "4.8",
    price: "$",
    sub: "Late night cravings sorted",
    image: "/restaurant_tacos.png",
  },
];

function FavoritesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logoWrap}>
          <ForkKnifeIcon />
          <span>FoodMatch</span>
        </div>
        <img className={styles.userAvatar} src="/avatar_alex.png" alt="Profile" />
      </header>

      <div className={styles.body}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Your Favorites</h1>
          <p className={styles.subtitle}>The best flavors you&apos;ve discovered.</p>
        </div>

        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}><SearchIcon /></span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search your favorites..."
          />
        </div>

        <div className={styles.filters}>
          <button className={`${styles.filterChip} ${styles.active}`}>All</button>
          <button className={styles.filterChip}>Italian</button>
          <button className={styles.filterChip}>Sushi</button>
          <button className={styles.filterChip}>Burger</button>
        </div>

        <div className={styles.cardsList}>
          {favorites.map((fav) => (
            <article key={fav.id} className={styles.favCard}>
              <img className={styles.cardImage} src={fav.image} alt={fav.name} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{fav.name}</h3>
                <div className={styles.cardMeta}>
                  <StarIcon className={styles.starIcon} />
                  <span>{fav.rating}</span>
                  <span>·</span>
                  <span>{fav.price}</span>
                </div>
                <p className={styles.cardSub}>{fav.sub}</p>
              </div>
              <button className={styles.heartBtn} aria-label="Remove from favorites">
                <HeartFilledIcon />
              </button>
            </article>
          ))}
        </div>
      </div>

      <NavBar activeTab="profile" />
    </main>
  );
}

export default FavoritesPage;
