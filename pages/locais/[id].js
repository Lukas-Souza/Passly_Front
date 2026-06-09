import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { mockLocais, mockVisitantes, mockAvaliacoes, mockArtefatos } from '../../services/mockData';
import Avatar from '../../components/Avatar';
import { RatingStars, Loader } from '../../components/Avatar';
import styles from '../../styles/LocalDetalhe.module.css';

export default function LocalDetalhe() {
  const router = useRouter();
  const { id } = router.query;

  const { data: local, isLoading } = useQuery({
    queryKey: ['local', id],
    queryFn: async () => {
      try { return await locaisService.detalhe(id); }
      catch { return mockLocais.find(l => l.id === Number(id)) || mockLocais[0]; }
    },
    enabled: !!id,
  });

  if (isLoading || !local) return <Loader text="Carregando local..." />;

  return (
    <div>
      <div className={styles.breadcrumb}>
        <Link href="/locais" className={styles.breadLink}>← Todos os locais</Link>
      </div>

      {/* Hero */}
      <div className={styles.hero}>
        <img src={local.imagem} alt={local.nome} className={styles.heroImg} />
        <div className={styles.heroOverlay}>
          <span className={styles.heroBadge}>{local.categoria}</span>
          <h1 className={styles.heroTitle}>{local.nome}</h1>
          <p className={styles.heroLoc}>📍 {local.cidade}, {local.estado}</p>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.main}>
          {/* Info card */}
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>Sobre este local</h2>
            <p className={styles.descricao}>{local.descricao}</p>
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Avaliação média</span>
                <div className={styles.metaVal}>
                  <RatingStars value={local.notaMedia} size={18} />
                  <strong>{local.notaMedia}</strong>
                </div>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Visitantes</span>
                <strong className={styles.metaValStr}>👥 {local.totalVisitantes.toLocaleString()}</strong>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Categoria</span>
                <strong className={styles.metaValStr}>{local.categoria}</strong>
              </div>
            </div>
          </div>

          {/* Avaliações */}
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>Avaliações</h2>
            <div className={styles.reviewList}>
              {mockAvaliacoes.map(a => (
                <div key={a.id} className={styles.reviewItem}>
                  <Avatar name={a.usuario} size={40} />
                  <div className={styles.reviewContent}>
                    <div className={styles.reviewHeader}>
                      <span className={styles.reviewUser}>{a.usuario}</span>
                      <RatingStars value={a.nota} size={13} />
                      <span className={styles.reviewDate}>{new Date(a.data).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <p className={styles.reviewText}>{a.comentario}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Artefatos */}
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>🎁 Artefatos</h2>
            <p className={styles.sectionSub}>Lembranças digitais deixadas pelos visitantes</p>
            <div className={styles.artefatoList}>
              {mockArtefatos.map(a => (
                <div key={a.id} className={styles.artefatoItem}>
                  <Avatar name={a.usuario} size={36} />
                  <div className={styles.artefatoContent}>
                    <div className={styles.artefatoUser}>{a.usuario}</div>
                    <p className={styles.artefatoMsg}>{a.mensagem}</p>
                    <span className={styles.artefatoDate}>{new Date(a.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className={styles.aside}>
          {/* Visitantes recentes */}
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Visitantes recentes</h3>
            <div className={styles.visitanteList}>
              {mockVisitantes.map(v => (
                <div key={v.id} className={styles.visitanteItem}>
                  <Avatar name={v.name} size={36} />
                  <div>
                    <div className={styles.visitanteNome}>{v.name}</div>
                    <div className={styles.visitanteData}>
                      {new Date(v.dataVisita).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Check-in CTA */}
          <div className={styles.checkinCard}>
            <span className={styles.checkinIcon}>✅</span>
            <h3 className={styles.checkinTitle}>Você visitou este local?</h3>
            <p className={styles.checkinDesc}>Registre seu check-in com o código exclusivo do local.</p>
            <Link href="/checkin" className={styles.checkinBtn}>
              Fazer Check-in
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
