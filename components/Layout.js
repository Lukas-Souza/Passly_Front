import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import useAuthStore from '../store/authStore';

const publicRoutes = ['/login', '/signup', '/'];

export default function Layout({ children }) {
  const router = useRouter();
  const { user, token, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  const isPublic = publicRoutes.includes(router.pathname);

  if (isPublic) return <>{children}</>;

  return (
    <div className="page-layout">
      <div className="page-content" style={{ paddingTop: 64 }}>
        <Navbar />
        <main className="page-main">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
