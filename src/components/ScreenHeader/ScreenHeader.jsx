import { useNavigate } from 'react-router-dom';
import BrandLogo from '../BrandLogo/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import styles from './ScreenHeader.module.css';

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
        <BrandLogo variant="compact" />
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
