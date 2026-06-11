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
  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <img className={styles.heroBg} src="/hero_food_table.png" alt="" />
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

      <div className={styles.body}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Username</label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}><UserIcon /></span>
            <input type="text" className={styles.input} placeholder="Your nickname" />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>First Name</label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}><IdCardIcon /></span>
            <input type="text" className={styles.input} placeholder="Your name" />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}><MailIcon /></span>
            <input type="email" className={styles.input} placeholder="email@example.com" />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}><LockIcon /></span>
            <input type="password" className={styles.input} placeholder="Min. 8 characters" />
            <button className={styles.eyeIcon} aria-label="Toggle password visibility">
              <EyeIcon />
            </button>
          </div>
        </div>

        <button className={styles.submitBtn}>
          Sign Up <ArrowRight />
        </button>

        <p className={styles.footerLink}>
          Already have an account? <span className={styles.loginText}>Log in</span>
        </p>
      </div>
    </main>
  );
}

export default SignupPage;
