import Link from 'next/link';
import { RatingStars } from './Avatar';
import styles from '../styles/CardTuristico.module.css';

const categoryColors = {
  Natureza: '#10B981',
  Monumento: '#2563EB',
  Histórico: '#F59E0B',
  Cultural: '#8B5CF6',
  Praia: '#06B6D4',
  Gastronomia: '#EC4899',
};

export default function CardTuristico({ local }) {
  const catColor = categoryColors[local.categoria] || '#6B7280';

  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <h3 className={styles.nome}>{local.nome}</h3>
        <p className={styles.cidade}>📍 {local.cidade}, {local.estado}</p>
        <div className={styles.meta}>
          <div className={styles.rating}>
            <RatingStars value={local.notaMedia} size={13} />
            <span className={styles.ratingVal}>{local.notaMedia.toFixed(1)}</span>
          </div>
          <span className={styles.visitantes}>
            👥 {local.totalVisitantes.toLocaleString()}
          </span>
        </div>
        <Link href={`/locais/${local.id}`} className={styles.btnDetalhes}>
          Ver detalhes →
        </Link>
      </div>
    </div>
  );
}
