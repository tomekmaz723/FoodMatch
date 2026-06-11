import styles from './AuthLoginPage.module.css';

/* Icons */
const ForkKnifeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 2v9a3 3 0 0 1-2 2v9H7v-9a3 3 0 0 1-2-2V2h1.5v7a1.5 1.5 0 0 0 3 0V2H11zM19 2h-1v10.5A2.5 2.5 0 0 1 15.5 15H15v7h-2v-7h-.5A2.5 2.5 0 0 1 10 12.5V2h1.5v10.5a1 1 0 0 0 1 1h.5v-10h1.5v10h.5a1 1 0 0 0 1-1V2H19z" />
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

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.14-.49-3.21 0-1.04.47-2.04.56-2.95-.36-4.04-4.14-4.83-10.24-1.47-13.06 1.34-1.12 2.84-1.25 3.99-.6 1.07.6 1.7.6 2.81 0 1.25-.68 2.68-.53 3.84.45-2.93 1.74-2.45 5.56.5 6.8-.75 2.45-1.76 4.67-3.41 6.37H17.05v.02zm-2.03-14.7c.36-2.03-1.08-3.9-3.14-4.25-.43 2.05 1.18 3.89 3.14 4.25z" />
  </svg>
);

function AuthLoginPage() {
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

        <div className={styles.heroContent}>
          <div className={styles.bigLogoBox}>
            <ForkKnifeIcon />
          </div>
          <h1 className={styles.title}>FoodMatch</h1>
          <p className={styles.subtitle}>
            Discover your next favorite meal with friends, faster.
          </p>
        </div>
      </section>

      <div className={styles.body}>
        <div className={styles.formCard}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}><MailIcon /></span>
              <input type="email" className={styles.input} placeholder="chef@foodmatch.com" />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.labelRow}>
              <label className={styles.label}>Password</label>
              <span className={styles.forgotLink}>Forgot?</span>
            </div>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}><LockIcon /></span>
              <input type="password" className={styles.input} placeholder="••••••••" />
              <button className={styles.eyeIcon} aria-label="Toggle visibility">
                <EyeIcon />
              </button>
            </div>
          </div>

          <button className={styles.submitBtn}>
            Login <ArrowRight />
          </button>

          <div className={styles.divider}>OR CONTINUE WITH</div>

          <div className={styles.socialBtns}>
            <button className={styles.socialBtn}>
              <span className={styles.socialIcon}><GoogleIcon /></span>
              Google
            </button>
            <button className={styles.socialBtn}>
              <span className={styles.socialIcon}><AppleIcon /></span>
              Apple
            </button>
          </div>
        </div>

        <p className={styles.footerLink}>
          Don&apos;t have an account? <span className={styles.signupText}>Sign up</span>
        </p>

        <div className={styles.bottomImages}>
          <img className={styles.foodThumb} src="/restaurant_burger.png" alt="Burger" />
          <img className={styles.foodThumb} src="/restaurant_pizza.png" alt="Pizza" />
          <img className={styles.foodThumb} src="/restaurant_sushi.png" alt="Sushi" />
        </div>
      </div>
    </main>
  );
}

export default AuthLoginPage;
