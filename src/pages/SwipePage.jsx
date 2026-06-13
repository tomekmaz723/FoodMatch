import { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard/RestaurantCard';
import NavBar from '../components/NavBar/NavBar';
import ScreenHeader, { PeopleIcon } from '../components/ScreenHeader/ScreenHeader';
import { useUserData } from '../context/UserDataContext';
import { restaurants } from '../data/restaurants';
import MobileLayout from '../layouts/MobileLayout';
import styles from './SwipePage.module.css';

/* ═══════════════════════════════════
   Inline SVG icons
   ═══════════════════════════════════ */

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.3l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

/* ── Static data ── */

const miniAvatars = [
  '/avatar_host.png',
  '/avatar_sarah.png',
  '/avatar_mike.png',
];

const FALLBACK_PIN = '8821';
const shuffleRestaurants = () =>
  Object.values(restaurants)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

/**
 * SwipePage — the main swiping experience.
 * Shows one restaurant card at a time with reject / super-like / like actions.
 */
function SwipePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { recordDecision } = useUserData();
  const roomPin = location.state?.roomPin || FALLBACK_PIN;
  const routeState = { roomPin };
  const swipeRestaurants = useMemo(shuffleRestaurants, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [acceptedRestaurants, setAcceptedRestaurants] = useState([]);
  const [isExiting, setIsExiting] = useState(false);
  const currentRestaurant = swipeRestaurants[currentIndex];
  const dragStartX = useRef(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const swipeProgress = Math.min(Math.abs(dragX) / 120, 1);
  const decision = dragX > 28 ? 'like' : dragX < -28 ? 'reject' : '';

  const finishSwipe = (direction) => {
    if (isExiting) return;

    setIsDragging(false);
    setIsExiting(true);
    setDragX(direction === 'like' ? 420 : -420);
    const isLiked = direction === 'like';
    const nextAccepted = isLiked
      ? [...acceptedRestaurants, currentRestaurant]
      : acceptedRestaurants;

    if (isLiked) {
      setAcceptedRestaurants(nextAccepted);
    }

    recordDecision(currentRestaurant, isLiked);

    window.setTimeout(() => {
      const isLastCard = currentIndex >= swipeRestaurants.length - 1;

      if (isLastCard) {
        if (nextAccepted.length === 0) {
          navigate('/nomatch', { state: routeState });
          return;
        }

        const shownRestaurant = nextAccepted[Math.floor(Math.random() * nextAccepted.length)];
        const resultPath = Math.random() > 0.5 ? '/result' : '/nomatch';
        navigate(resultPath, { state: { ...routeState, restaurant: shownRestaurant } });
        return;
      }

      setCurrentIndex((index) => index + 1);
      setDragX(0);
      setIsExiting(false);
    }, 180);
  };

  const resetCard = () => {
    setIsDragging(false);
    setIsExiting(false);
    setDragX(0);
  };

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragStartX.current = event.clientX - dragX;
    setIsDragging(true);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;
    setDragX(event.clientX - dragStartX.current);
  };

  const handlePointerUp = (event) => {
    event.currentTarget.releasePointerCapture?.(event.pointerId);

    if (dragX > 120) {
      finishSwipe('like');
      return;
    }

    if (dragX < -120) {
      finishSwipe('reject');
      return;
    }

    resetCard();
  };

  const cardStyle = {
    transform: `translateX(${dragX}px) rotate(${dragX / 18}deg)`,
    transition: isDragging ? 'none' : 'transform 0.2s ease',
  };

  const rejectStyle = {
    '--swipe-scale': decision === 'reject' ? 1 + swipeProgress * 0.22 : 1,
  };

  const likeStyle = {
    '--swipe-scale': decision === 'like' ? 1 + swipeProgress * 0.22 : 1,
  };

  return (
    <MobileLayout>
      <div className={styles.page}>
      {/* ── Header ── */}
      <ScreenHeader title={`Room PIN: ${roomPin}`} backButton rightIcon={<PeopleIcon />} />

      {/* ── Sub-header: mini avatars + swiping text ── */}
      <div className={styles.subheader}>
        <div className={styles.miniAvatars}>
          {miniAvatars.map((src, i) => (
            <img key={i} className={styles.miniAvatar} src={src} alt="" />
          ))}
        </div>
        <span className={styles.swipingText}>3 friends swiping</span>
      </div>

      <div className={styles.body}>
        {/* ── Restaurant card ── */}
        <div
          className={styles.swipeCardWrap}
          style={cardStyle}
          data-decision={decision}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={resetCard}
        >
          <RestaurantCard
            image={currentRestaurant.image}
            name={currentRestaurant.name}
            rating={currentRestaurant.rating}
            price={currentRestaurant.price}
            distance="0.8 km"
            tags={currentRestaurant.tags}
          />
        </div>

        {/* ── Action buttons ── */}
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${styles.reject} ${decision === 'reject' ? styles.activeReject : ''}`}
            style={rejectStyle}
            aria-label="Reject"
            onClick={() => finishSwipe('reject')}
          >
            <XIcon />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.like} ${decision === 'like' ? styles.activeLike : ''}`}
            style={likeStyle}
            aria-label="Like"
            onClick={() => finishSwipe('like')}
          >
            <HeartIcon />
          </button>
        </div>
      </div>

      {/* ── Bottom navigation ── */}
      </div>
      <NavBar />
    </MobileLayout>
  );
}

export default SwipePage;
