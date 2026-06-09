import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuthStore from '../store/authStore';
import Avatar from './Avatar';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <span className={styles.logo}>🗺️</span>
        <span className={styles.brandName}>Passaporte</span>
      </div>

      <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span />
        <span />
        <span />
      </button>

      <div className={`${styles.actions} ${menuOpen ? styles.open : ''}`}>
        {user ? (
          <>
            <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
            <Link href="/locais" className={styles.navLink}>Explorar</Link>
            <Link href="/checkin" className={styles.navLink}>Check-in</Link>
            <div className={styles.userMenu}>
              <Avatar name={user.name} size={32} />
              <span className={styles.userName}>{user.name}</span>
              <button className={styles.logoutBtn} onClick={handleLogout}>Sair</button>
            </div>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.navLink}>Entrar</Link>
            <Link href="/signup" className={styles.navLinkPrimary}>Criar Conta</Link>
          </>
        )}
      </div>
    </nav>
  );
}
