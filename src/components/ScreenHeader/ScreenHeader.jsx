import { useNavigate } from 'react-router-dom';
import styles from './ScreenHeader.module.css';

const BackArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
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
  const headerClass = [styles.header, styles[variant]].filter(Boolean).join(' ');
  const titleClass = [styles.title, styles[titleTone]].filter(Boolean).join(' ');
  const rightClass = [styles.right, styles[rightTone]].filter(Boolean).join(' ');

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    navigate(-1);
  };

  return (
    <header className={headerClass}>
      {backButton ? (
        <button className={styles.backBtn} aria-label="Go back" onClick={handleBack}>
          <BackArrow />
        </button>
      ) : (
        <span className={styles.sideSpacer} aria-hidden="true" />
      )}

      <h1 className={titleClass}>{title}</h1>

      {rightIcon ? (
        <span className={rightClass} aria-hidden="true">
          {rightIcon}
        </span>
      ) : (
        <span className={styles.sideSpacer} aria-hidden="true" />
      )}
    </header>
  );
}

export default ScreenHeader;
