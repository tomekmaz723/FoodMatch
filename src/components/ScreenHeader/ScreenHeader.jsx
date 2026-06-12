import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './ScreenHeader.module.css';

const ForkKnifeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 2v9a3 3 0 0 1-2 2v9H7v-9a3 3 0 0 1-2-2V2h1.5v7a1.5 1.5 0 0 0 3 0V2H11zM19 2h-1v10.5A2.5 2.5 0 0 1 15.5 15H15v7h-2v-7h-.5A2.5 2.5 0 0 1 10 12.5V2h1.5v10.5a1 1 0 0 0 1 1h.5v-10h1.5v10h.5a1 1 0 0 0 1-1V2H19z" />
  </svg>
);

export const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

function ScreenHeader({
  title,
  backButton = false,
  onBack,
  rightIcon,
  variant = 'default',
  titleTone = 'default',
  rightTone = 'amber',
}) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const headerClass = [styles.header, styles[variant]].filter(Boolean).join(' ');
  const titleClass = [styles.title, styles[titleTone]].filter(Boolean).join(' ');
  const rightClass = [styles.right, styles[rightTone]].filter(Boolean).join(' ');

  return (
    <header className={headerClass}>
      <button className={styles.brandBtn} type="button" onClick={() => navigate('/')} aria-label="Go to FoodMatch home">
        <span className={styles.logoMark}>
          <ForkKnifeIcon />
        </span>
        <span className={styles.brandName}>FoodMatch</span>
      </button>

      {title ? (
        <span className={titleClass}>{title}</span>
      ) : (
        <span className={styles.sideSpacer} aria-hidden="true" />
      )}

      {rightIcon ? (
        <span className={rightClass} aria-hidden="true">
          {rightIcon}
        </span>
      ) : !currentUser ? (
        <button className={styles.authBtn} type="button" onClick={() => navigate('/auth/login')}>
          Log in
        </button>
      ) : (
        <span className={styles.sideSpacer} aria-hidden="true" />
      )}
    </header>
  );
}

export default ScreenHeader;
