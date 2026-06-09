import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuthStore from '../store/authStore';
import Avatar from './Avatar';
import styles from '../styles/Sidebar.module.css';


export default function Sidebar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <></>
  );
}
