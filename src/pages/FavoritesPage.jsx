import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import ScreenHeader from '../components/ScreenHeader/ScreenHeader';
import { useUserData } from '../context/UserDataContext';
import MobileLayout from '../layouts/MobileLayout';
import styles from './FavoritesPage.module.css';

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

const HeartOutlineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.3l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

const filters = ['All', 'Italian', 'Sushi', 'Burger', 'Mexican'];

function FavoritesPage() {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const favorites = userData?.favorites || [];

  const visibleFavorites = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return favorites.filter((fav) => {
      const matchesFilter = activeFilter === 'All' || fav.cuisine === activeFilter;
      const matchesSearch =
        !query ||
        fav.name.toLowerCase().includes(query) ||
        fav.sub.toLowerCase().includes(query) ||
        fav.cuisine.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const openRestaurant = (restaurant) => {
    navigate('/restaurant', { state: { restaurant } });
  };

  return (
    <MobileLayout>
      <div className={styles.page}>
        <ScreenHeader title="Favorites" variant="compact" />
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
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>

          <div className={styles.filters}>
            {filters.map((filter) => (
              <button
                key={filter}
                className={`${styles.filterChip} ${activeFilter === filter ? styles.active : ''}`}
                type="button"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className={styles.cardsList}>
            {visibleFavorites.length === 0 && (
              <p className={styles.emptyText}>No favorites saved yet.</p>
            )}

            {visibleFavorites.map((fav) => (
              <article
                key={fav.id}
                className={styles.favCard}
                role="button"
                tabIndex={0}
                onClick={() => openRestaurant(fav)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openRestaurant(fav);
                  }
                }}
              >
                <img className={styles.cardImage} src={fav.image} alt={fav.name} />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{fav.name}</h3>
                  <div className={styles.cardMeta}>
                    <StarIcon />
                    <span>{fav.rating}</span>
                    <span className={styles.metaDot}>-</span>
                    <span>{fav.price}</span>
                  </div>
                  <p className={styles.cardSub}>{fav.sub}</p>
                </div>
                <button
                  className={styles.heartBtn}
                  type="button"
                  aria-label="Remove from favorites"
                  onClick={(event) => event.stopPropagation()}
                >
                  <HeartOutlineIcon />
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>

      <NavBar activeTab="favorites" />
    </MobileLayout>
  );
}

export default FavoritesPage;
