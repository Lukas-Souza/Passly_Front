import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import useAuthStore from '../store/authStore';
import { checkinService } from '../services/checkinService';
import { mockPassaporte, mockStats } from '../services/mockData';
import { RatingStars, EmptyState, Loader } from '../components/Avatar';
import styles from '../styles/Passaporte.module.css';

export default function Passaporte() {
  const { user } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ['passaporte', user?.id],
    queryFn: async () => {
      try {
        if (user?.id) {
          return await checkinService.meuPassaporte(user.id);
        }
        return { visitas: mockPassaporte, total: mockPassaporte.length, progresso: 45 };
      } catch {
        return { visitas: mockPassaporte, total: mockPassaporte.length, progresso: 45 };
      }
    },
    enabled: !!user?.id,
  });

  const visitas = data?.visitas || mockPassaporte;
  const total = data?.total || visitas.length;
  const progresso = data?.progresso || mockStats.progressoPassaporte;

  if (isLoading) return <Loader text="Carregando passaporte..." />;

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.passportCover}>
          <span className={styles.coverIcon}>📖</span>
          <div>
            <h1 className={styles.title}>Meu Passaporte</h1>
            <p className={styles.sub}>Sua coleção pessoal de experiências</p>
          </div>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.headerStat}>
            <strong>{total}</strong>
            <span>visitas</span>
          </div>
          <div className={styles.headerStat}>
            <strong>{progresso}%</strong>
            <span>completo</span>
          </div>
        </div>
      </div>


      {visitas.length === 0 ? (
        <EmptyState
          icon="✈️"
          title="Seu passaporte está vazio"
          description="Visite pontos turísticos e faça check-in para registrar suas aventuras."
          action={<Link href="/checkin" className={styles.ctaBtn}>Fazer meu primeiro check-in</Link>}
        />
      ) : (
        <div className={styles.grid}>
          {visitas.map((v) => (
            <div key={v.id} className={styles.card}>
              <div className={styles.cardImg}>
                <img src={v.imagem} alt={v.local} />
                <div className={styles.stamp}>✅</div>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardNome}>{v.local}</h3>
                <p className={styles.cardCidade}>📍 {v.cidade}</p>
                <div className={styles.cardMeta}>
                  <RatingStars value={v.nota} size={13} />
                  <span className={styles.cardData}>
                    {new Date(v.dataVisita).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
