import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo/BrandLogo';
import NavBar from '../components/NavBar/NavBar';
import { useAuth } from '../context/AuthContext';
import MobileLayout from '../layouts/MobileLayout';
import styles from './AuthLoginPage.module.css';

/* Icons */
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

function AuthLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuth();
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectPath = location.state?.from?.pathname || '/profile';
  const isDemoLogin = formValues.email.trim().toLowerCase() === 'test@test.com' && formValues.password === 'test';

  const errors = {
    email: !formValues.email.trim()
      ? 'Email is required.'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)
        ? 'Enter a valid email address.'
        : '',
    password: !formValues.password
      ? 'Password is required.'
      : !isDemoLogin && formValues.password.length < 8
        ? 'Password must be at least 8 characters.'
        : '',
  };
  const isFormValid = !errors.email && !errors.password;

  const updateField = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setAuthError('');
  };

  const markTouched = (field) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const shouldShowError = (field) => (touched[field] || submitted) && errors[field];

  const getAuthErrorMessage = (error) => {
    if (error.code === 'auth/invalid-credential') return 'Email or password is incorrect.';
    if (error.code === 'auth/popup-closed-by-user') return 'Google sign-in was cancelled.';
    if (error.code === 'auth/popup-blocked') return 'Your browser blocked the Google sign-in popup.';
    if (error.code === 'auth/account-exists-with-different-credential') return 'This email uses a different sign-in method.';
    if (error.code === 'auth/user-disabled') return 'This account has been disabled.';
    if (error.code === 'auth/too-many-requests') return 'Too many attempts. Try again later.';
    return error.message || 'Could not sign in. Try again.';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    setAuthError('');

    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      await login(formValues.email.trim(), formValues.password);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setAuthError(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError('');
    setIsSubmitting(true);

    try {
      await loginWithGoogle();
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setAuthError(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MobileLayout>
      <div className={styles.page}>
        <section className={styles.heroSection}>
        <img className={styles.heroBg} src="/hero_food.png" alt="" />
        <div className={styles.heroOverlay} />

        <header className={styles.header}>
          <div className={styles.logoWrap}>
            <BrandLogo variant="compact" />
          </div>
        </header>

        <div className={styles.heroContent}>
          <div className={styles.bigLogoBox}>
            <BrandLogo variant="markOnly" showText={false} />
          </div>
          <h1 className={styles.title}>
            Food<span>Match</span>
          </h1>
          <p className={styles.subtitle}>
            Discover your next favorite meal with friends, faster.
          </p>
        </div>
      </section>

      <div className={styles.body}>
        <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="login-email">Email Address</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}><MailIcon /></span>
              <input
                id="login-email"
                type="email"
                className={`${styles.input} ${shouldShowError('email') ? styles.inputError : ''}`}
                placeholder="chef@foodmatch.com"
                value={formValues.email}
                onChange={(event) => updateField('email', event.target.value)}
                onBlur={() => markTouched('email')}
                aria-invalid={Boolean(shouldShowError('email'))}
                aria-describedby={shouldShowError('email') ? 'login-email-error' : undefined}
                required
              />
            </div>
            {shouldShowError('email') && (
              <span id="login-email-error" className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="login-password">Password</label>
              <span className={styles.forgotLink}>Forgot?</span>
            </div>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}><LockIcon /></span>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className={`${styles.input} ${shouldShowError('password') ? styles.inputError : ''}`}
                placeholder="Min. 8 characters"
                value={formValues.password}
                onChange={(event) => updateField('password', event.target.value)}
                onBlur={() => markTouched('password')}
                aria-invalid={Boolean(shouldShowError('password'))}
                aria-describedby={shouldShowError('password') ? 'login-password-error' : undefined}
                minLength={8}
                required
              />
              <button
                className={styles.eyeIcon}
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((current) => !current)}
              >
                <EyeIcon />
              </button>
            </div>
            {shouldShowError('password') && (
              <span id="login-password-error" className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          <button className={styles.submitBtn} type="submit" disabled={(submitted && !isFormValid) || isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'} <ArrowRight />
          </button>

          {authError && <span className={styles.errorText}>{authError}</span>}

          <div className={styles.divider}>OR CONTINUE WITH</div>

          <div className={styles.socialBtns}>
            <button className={styles.socialBtn} type="button" onClick={handleGoogleLogin} disabled={isSubmitting}>
              <span className={styles.socialIcon}><GoogleIcon /></span>
              Google
            </button>
          </div>
        </form>

        <p className={styles.footerLink}>
          Don&apos;t have an account? <span className={styles.signupText} onClick={() => navigate('/auth/signup')} style={{ cursor: 'pointer' }}>Sign up</span>
        </p>

        <div className={styles.bottomImages}>
          <img className={styles.foodThumb} src="/restaurant_burger.png" alt="Burger" />
          <img className={styles.foodThumb} src="/restaurant_pizza.png" alt="Pizza" />
          <img className={styles.foodThumb} src="/restaurant_sushi.png" alt="Sushi" />
        </div>
      </div>
    </div>
    <NavBar activeTab="profile" />
  </MobileLayout>
  );
}

export default AuthLoginPage;
