import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import { useAuth } from '../context/AuthContext';
import MobileLayout from '../layouts/MobileLayout';
import styles from './SignupPage.module.css';

/* Icons */
const ForkKnifeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 2v9a3 3 0 0 1-2 2v9H7v-9a3 3 0 0 1-2-2V2h1.5v7a1.5 1.5 0 0 0 3 0V2H11zM19 2h-1v10.5A2.5 2.5 0 0 1 15.5 15H15v7h-2v-7h-.5A2.5 2.5 0 0 1 10 12.5V2h1.5v10.5a1 1 0 0 0 1 1h.5v-10h1.5v10h.5a1 1 0 0 0 1-1V2H19z" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IdCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
    <path d="M8 10h.01M16 10h.01M12 14v4M12 14a2 2 0 0 0-2-2h-1M12 14a2 2 0 0 1 2-2h1" />
  </svg>
);

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

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formValues, setFormValues] = useState({
    username: '',
    firstName: '',
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errors = {
    username: !formValues.username.trim()
      ? 'Username is required.'
      : formValues.username.trim().length < 3
        ? 'Username must be at least 3 characters.'
        : /\s/.test(formValues.username)
          ? 'Username cannot contain spaces.'
          : '',
    firstName: !formValues.firstName.trim()
      ? 'First name is required.'
      : !/^[\p{L}'-]{2,}$/u.test(formValues.firstName.trim())
        ? 'Use at least 2 letters.'
        : '',
    email: !formValues.email.trim()
      ? 'Email is required.'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)
        ? 'Enter a valid email address.'
        : '',
    password: !formValues.password
      ? 'Password is required.'
      : formValues.password.length < 8
        ? 'Password must be at least 8 characters.'
        : !/(?=.*[A-Za-z])(?=.*\d)/.test(formValues.password)
          ? 'Password must include a letter and a number.'
          : '',
  };
  const isFormValid = !errors.username && !errors.firstName && !errors.email && !errors.password;

  const updateField = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setAuthError('');
  };

  const markTouched = (field) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const shouldShowError = (field) => (touched[field] || submitted) && errors[field];

  const getAuthErrorMessage = (error) => {
    if (error.code === 'auth/email-already-in-use') return 'This email is already registered.';
    if (error.code === 'auth/weak-password') return 'Password is too weak.';
    return error.message || 'Could not create account. Try again.';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    setAuthError('');

    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      await signup({
        email: formValues.email.trim(),
        password: formValues.password,
        username: formValues.username.trim(),
        firstName: formValues.firstName.trim(),
      });
      navigate('/profile', { replace: true });
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
            <ForkKnifeIcon />
            <span>FoodMatch</span>
          </div>
        </header>

        <div className={styles.titleArea}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>
            Join FoodMatch and start deciding with friends.
          </p>
        </div>
      </section>

      <form className={styles.body} onSubmit={handleSubmit} noValidate>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="signup-username">Username</label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}><UserIcon /></span>
            <input
              id="signup-username"
              type="text"
              className={`${styles.input} ${shouldShowError('username') ? styles.inputError : ''}`}
              placeholder="Your nickname"
              value={formValues.username}
              onChange={(event) => updateField('username', event.target.value)}
              onBlur={() => markTouched('username')}
              aria-invalid={Boolean(shouldShowError('username'))}
              aria-describedby={shouldShowError('username') ? 'signup-username-error' : undefined}
              minLength={3}
              required
            />
          </div>
          {shouldShowError('username') && (
            <span id="signup-username-error" className={styles.errorText}>{errors.username}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="signup-first-name">First Name</label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}><IdCardIcon /></span>
            <input
              id="signup-first-name"
              type="text"
              className={`${styles.input} ${shouldShowError('firstName') ? styles.inputError : ''}`}
              placeholder="Your name"
              value={formValues.firstName}
              onChange={(event) => updateField('firstName', event.target.value)}
              onBlur={() => markTouched('firstName')}
              aria-invalid={Boolean(shouldShowError('firstName'))}
              aria-describedby={shouldShowError('firstName') ? 'signup-first-name-error' : undefined}
              required
            />
          </div>
          {shouldShowError('firstName') && (
            <span id="signup-first-name-error" className={styles.errorText}>{errors.firstName}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="signup-email">Email</label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}><MailIcon /></span>
            <input
              id="signup-email"
              type="email"
              className={`${styles.input} ${shouldShowError('email') ? styles.inputError : ''}`}
              placeholder="email@example.com"
              value={formValues.email}
              onChange={(event) => updateField('email', event.target.value)}
              onBlur={() => markTouched('email')}
              aria-invalid={Boolean(shouldShowError('email'))}
              aria-describedby={shouldShowError('email') ? 'signup-email-error' : undefined}
              required
            />
          </div>
          {shouldShowError('email') && (
            <span id="signup-email-error" className={styles.errorText}>{errors.email}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="signup-password">Password</label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}><LockIcon /></span>
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              className={`${styles.input} ${shouldShowError('password') ? styles.inputError : ''}`}
              placeholder="Min. 8 characters"
              value={formValues.password}
              onChange={(event) => updateField('password', event.target.value)}
              onBlur={() => markTouched('password')}
              aria-invalid={Boolean(shouldShowError('password'))}
              aria-describedby={shouldShowError('password') ? 'signup-password-error' : undefined}
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
            <span id="signup-password-error" className={styles.errorText}>{errors.password}</span>
          )}
        </div>

        <button className={styles.submitBtn} type="submit" disabled={(submitted && !isFormValid) || isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Sign Up'} <ArrowRight />
        </button>

        {authError && <span className={styles.errorText}>{authError}</span>}

        <p className={styles.footerLink}>
          Already have an account? <span className={styles.loginText} onClick={() => navigate('/auth/login')} style={{ cursor: 'pointer' }}>Log in</span>
        </p>
      </form>
    </div>
    <NavBar activeTab="profile" />
  </MobileLayout>
  );
}

export default SignupPage;
