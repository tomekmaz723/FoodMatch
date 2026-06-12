import { useNavigate } from 'react-router-dom';
import AppLogo from '../components/AppLogo/AppLogo';
import Button from '../components/Button/Button';
import { useAuth } from '../context/AuthContext';
import MobileLayout from '../layouts/MobileLayout';
import styles from './LoginPage.module.css';

const heroImg = '/hero_food.png';

/* ── Inline SVG icons for the two buttons ── */

/** Person-plus icon (Join a Room) */
const JoinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </svg>
);

/** Circle-plus icon (Create a Room) */
const CreateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

/**
 * LoginPage — the landing/welcome screen of FoodMatch.
 *
 * Layout (top → bottom):
 *  1. Hero food photo with gradient fade
 *  2. App logo + tagline
 *  3. Primary & secondary action buttons
 *  4. Footer auth links
 */
function LoginPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <MobileLayout>
      <div className={styles.page}>
        {/* ── Hero image ── */}
        <section className={styles.hero} aria-label="Food table photo">
          <img
            className={styles.heroImage}
            src={heroImg}
            alt="Overhead view of a communal dining table filled with dishes"
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
        </section>

        {/* ── Content ── */}
        <section className={styles.content}>
          <AppLogo />

          <div className={styles.actions}>
            <Button variant="filled" icon={<JoinIcon />} onClick={() => navigate('/join')}>
              Join a Room
            </Button>
            <Button variant="outlined" icon={<CreateIcon />} onClick={() => navigate('/lobby')}>
              Create a Room
            </Button>
          </div>

          {!currentUser && (
          <footer className={styles.footer}>
            <p className={styles.footerText}>
              Already a member?{' '}
              <span className={styles.footerLink} onClick={() => navigate('/auth/login')} style={{cursor: 'pointer'}}>
                Log In
              </span>
            </p>
            <span className={styles.signUpLink} onClick={() => navigate('/auth/signup')} style={{cursor: 'pointer'}}>
              New here? Sign up →
            </span>
          </footer>
          )}
        </section>
      </div>
    </MobileLayout>
  );
}

export default LoginPage;
