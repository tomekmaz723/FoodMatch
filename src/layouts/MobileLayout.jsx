import styles from './MobileLayout.module.css';

export default function MobileLayout({ children }) {
  return (
    <main className={styles.page}>
      <div className={styles.phone}>
        {children}
      </div>
    </main>
  );
}
