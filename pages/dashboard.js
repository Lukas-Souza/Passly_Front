import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useAuthStore from '../store/authStore';
import { checkinService } from '../services/checkinService';
import { mockStats, mockPassaporte, mockRanking } from '../services/mockData';
import { CardEstatistica } from '../components/Avatar';
import Avatar from '../components/Avatar';
import { RatingStars } from '../components/Avatar';
import { Loader } from '../components/Avatar';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const router = useRouter();
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (!token && typeof window !== 'undefined') {
      const t = localStorage.getItem('passport_token');
      if (!t) router.replace('/login');
    }
  }, [token]);

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard', user?.id],
    queryFn: async () => {
      try {
        if (user?.id) {
          return await checkinService.dashboard(user.id);
        }
        return mockStats;
      } catch {
        return mockStats;
      }
    },
    enabled: !!user?.id,
  });

  const s = stats || mockStats;

  if (isLoading) return <Loader text="Carregando dashboard..." />;

  return (
    <div>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.greeting}>Olá, {user?.name?.split(' ')[0] || 'Viajante'} 👋</h1>
          <p className={styles.subGreeting}>Veja como está seu passaporte de viagens</p>
        </div>
        <Link href="/checkin" className={styles.checkinBtn}>
          ✅ Fazer Check-in
        </Link>
      </div>

      {/* Stats grid */}
      <div className={styles.statsGrid}>
        <CardEstatistica icon="🗓️" label="Total de visitas" value={s.totalVisitas} color="blue" trend={8} />
        <CardEstatistica icon="📍" label="Locais visitados" value={s.locaisVisitados} color="green" trend={12} />
        <CardEstatistica icon="⭐" label="Avaliações feitas" value={s.avaliacoes} color="orange" />
      </div>

      <div className={styles.twoCol}>
        {/* Últimas visitas */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Últimas visitas</h2>
            <Link href="/passaporte" className={styles.seeAll}>Ver todas →</Link>
          </div>
          <div className={styles.visitList}>
            {mockPassaporte.map((v) => (
              <div key={v.id} className={styles.visitItem}>
                <div className={styles.visitInfo}>
                  <div className={styles.visitNome}>{v.local}</div>
                  <div className={styles.visitCidade}>📍 {v.cidade}</div>
                  <RatingStars value={v.nota} size={12} />
                </div>
                <div className={styles.visitData}>
                  {new Date(v.dataVisita).toLocaleDateString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
