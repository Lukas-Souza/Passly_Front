import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.brand}>🗺️ Passaporte Virtual</span>
        <span className={styles.copy}>© {new Date().getFullYear()} — Projeto Acadêmico</span>
      </div>
    </footer>
  );
}
