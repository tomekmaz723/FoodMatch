import styles from './RestaurantCard.module.css';

/**
 * Swipeable restaurant card with image, name, and metadata.
 *
 * @param {string}   image      – food photo URL
 * @param {string}   name       – restaurant name
 * @param {number}   rating     – star rating (e.g. 4.8)
 * @param {string}   price      – price level (e.g. "$$")
 * @param {string}   distance   – distance string (e.g. "0.8 km")
 * @param {string[]} tags       – cuisine / feature tags
 */
function RestaurantCard({ image, name, rating, price, distance, tags = [] }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={image} alt={name} />
        <div className={styles.imageOverlay} aria-hidden="true" />

        <div className={styles.info}>
          <h2 className={styles.name}>{name}</h2>

          <div className={styles.meta}>
            <span className={styles.rating}>
              <svg className={styles.ratingStar} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {rating}
            </span>
            <span className={styles.price}>{price}</span>
            <span className={styles.distance}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              {distance}
            </span>
          </div>

          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default RestaurantCard;
