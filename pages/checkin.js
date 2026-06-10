import { useState } from 'react';
import useAuthStore from '../store/authStore';
import { checkinService } from '../services/checkinService';
import { mockLocais } from '../services/mockData';
import { Button, Input, Modal } from '../components/Avatar';
import styles from '../styles/Checkin.module.css';

export default function Checkin() {
  const { user } = useAuthStore();
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codigo.trim()) { setError('Informe o código do local'); return; }
    if (!user?.id) { setError('Usuário não identificado. Faça login novamente.'); return; }
    setError('');
    setLoading(true);
    try {
      const data = await checkinService.realizar(codigo.trim().toUpperCase(), user.id);
      setSuccess(data);
      setModalOpen(true);
    } catch {
      // demo fallback
      const local = mockLocais.find(l => l.codigoCheckin === codigo.trim().toUpperCase());
      if (local) {
        setSuccess({ local });
        setModalOpen(true);
      } else {
        setError('Código inválido ou não encontrado. Verifique e tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setCodigo('');
    setSuccess(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.iconWrap}>
          <span className={styles.icon}>📍</span>
        </div>
        <h1 className={styles.title}>Fazer Check-in</h1>
        <p className={styles.sub}>
          Encontre o código exclusivo disponível no ponto turístico e registre sua visita.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.codeInput}>
            <input
              type="text"
              placeholder="Ex: CRT-RJ-001"
              value={codigo}
              onChange={e => setCodigo(e.target.value.toUpperCase())}
              className={styles.codeField}
              maxLength={20}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit" size="xl" loading={loading}>
            Confirmar Check-in
          </Button>
        </form>



        {/* Demo codes */}
        <div className={styles.demoCodes}>
          <p className={styles.demoTitle}>💡 Códigos de demonstração:</p>
          <div className={styles.demoList}>
            {mockLocais.slice(0, 3).map(l => (
              <button
                key={l.id}
                className={styles.demoCode}
                onClick={() => setCodigo(l.codigoCheckin)}
              >
                {l.codigoCheckin}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Success modal */}
      <Modal open={modalOpen} onClose={handleClose}>
        <div className={styles.successModal}>
          <span className={styles.successIcon}>🎉</span>
          <h2 className={styles.successTitle}>Parabéns!</h2>
          <p className={styles.successMsg}>Você registrou uma nova visita.</p>
          {success?.local && (
            <div className={styles.successLocal}>
              <img src={success.local.imagem} alt={success.local.nome} className={styles.successImg} />
              <div>
                <strong>{success.local.nome}</strong>
                <p>📍 {success.local.cidade}</p>
              </div>
            </div>
          )}
          <Button variant="success" size="lg" onClick={handleClose}>
            Ver meu passaporte
          </Button>
        </div>
      </Modal>
    </div>
  );
}
