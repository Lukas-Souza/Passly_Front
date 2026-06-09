import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '../store/authStore';

export default function Home() {
  const router = useRouter();
  const { token, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
    const t = localStorage.getItem('passport_token');
    router.replace(t ? '/dashboard' : '/login');
  }, []);

  return null;
}
