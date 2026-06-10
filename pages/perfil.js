import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../store/authStore';
import { authService } from '../services/authService';
import { mockUser, mockStats } from '../services/mockData';
import Avatar from '../components/Avatar';
import { Button, Input, Modal } from '../components/Avatar';
import styles from '../styles/Perfil.module.css';

export default function Perfil() {
  const { user, login } = useAuthStore();
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [saving, setSaving] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      try {
        if (user?.id) {
          return await authService.getProfile(user.id);
        }
        return { ...mockUser, ...mockStats };
      } catch {
        return { ...mockUser, ...mockStats };
      }
    },
    enabled: !!user?.id,
  });

  const p = profile || { ...mockUser, ...mockStats };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (user?.id) {
        const data = await authService.updateProfile(user.id, form);
        login(data || { ...user, ...form }, localStorage.getItem('passport_token'));
      } else {
        login({ ...user, ...form }, localStorage.getItem('passport_token'));
      }
    } catch {
      login({ ...user, ...form }, localStorage.getItem('passport_token'));
    } finally {
      setSaving(false);
      setEditOpen(false);
    }
  };

  return (
    <div>
      <h1 className={styles.pageTitle}>Meu Perfil</h1>

      <div className={styles.layout}>
        {/* Profile card */}
        <div className={styles.profileCard}>
          <div className={styles.avatarWrap}>
            <Avatar name={user?.name || p.name} size={90} />
          </div>
          <h2 className={styles.userName}>{user?.name || p.name}</h2>
          <p className={styles.userEmail}>{user?.email || p.email}</p>
          <div className={styles.memberSince}>
            Membro desde {new Date(p.createdAt || '2024-01-01').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </div>
          <Button variant="ghost" size="md" onClick={() => setEditOpen(true)}>
            ✏️ Editar Perfil
          </Button>
        </div>

        <div className={styles.mainArea}>
          {/* Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <div className={styles.statNum}>{p.totalVisitas || 12}</div>
              <div className={styles.statLbl}>🗓️ Visitas realizadas</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNum}>{p.locaisVisitados || 9}</div>
              <div className={styles.statLbl}>📍 Locais visitados</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNum}>{p.avaliacoes || 7}</div>
              <div className={styles.statLbl}>⭐ Avaliações</div>
            </div>
          </div>

          {/* Badges */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Conquistas</h3>
            <div className={styles.badges}>
              {[
                { icon: '🥾', label: 'Primeiro passo', desc: 'Primeiro check-in' },
                { icon: '🗺️', label: 'Exploradar', desc: '5 locais visitados' },
                { icon: '⭐', label: 'Avaliador', desc: 'Primeira avaliação' },
                { icon: '🎁', label: 'Colecionador', desc: 'Primeiro artefato' },
              ].map(b => (
                <div key={b.label} className={styles.badge}>
                  <span className={styles.badgeIcon}>{b.icon}</span>
                  <div className={styles.badgeLabel}>{b.label}</div>
                  <div className={styles.badgeDesc}>{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Editar Perfil">
        <div className={styles.editForm}>
          <Input
            label="Nome"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          />
          <div className={styles.editActions}>
            <Button variant="secondary" onClick={() => setEditOpen(false)}>Cancelar</Button>
            <Button loading={saving} onClick={handleSave}>Salvar alterações</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
