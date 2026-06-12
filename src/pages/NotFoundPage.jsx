import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import MobileLayout from '../layouts/MobileLayout';
import styles from './NotFoundPage.module.css';

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className={styles.container}>
        <div className={styles.errorIcon}>
          <WarningIcon />
        </div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.subtitle}>
          The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track!
        </p>
        <div className={styles.actions}>
          <Button variant="filled" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
