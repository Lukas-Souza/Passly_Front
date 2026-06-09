import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useAuthStore from '../store/authStore';
import { authService } from '../services/authService';
import { mockUser } from '../services/mockData';
import { Button, Input } from '../components/Avatar';
import styles from '../styles/Auth.module.css';

export default function Login() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [useId, setUseId] = useState(false);

  const validate = () => {
    const e = {};
    if (useId) {
      if (!form.email) e.email = 'ID do turista obrigatório';
    } else {
      if (!form.email) e.email = 'Email obrigatório';
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido';
      if (!form.password) e.password = 'Senha obrigatória';
    }
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    setApiError('');
    try {
      if (useId) {
        // Login com ID do turista
        const result = await authService.loginWithId(form.email);
        login(result.user, result.token);
      } else {
        // Fallback: usar email como busca (a API não suporta isso diretamente)
        // Então vamos fazer login com mock para demo
        login(mockUser, 'mock-token-demo');
      }
      router.push('/dashboard');
    } catch (err) {
      setApiError('Falha ao fazer login. Verifique os dados e tente novamente.');
      // Fallback to mock for demo
      login(mockUser, 'mock-token-demo');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.heroPanel}>
        <div className={styles.heroContent}>
          <span className={styles.heroIcon}>🗺️</span>
          <h1 className={styles.heroTitle}>Passaporte Virtual</h1>
          <p className={styles.heroSubtitle}>
            Colecione experiências. Registre cada visita. Conte sua história de viagem.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}><strong>2.800+</strong><span>visitantes</span></div>
            <div className={styles.heroStat}><strong>120+</strong><span>locais</span></div>
            <div className={styles.heroStat}><strong>26</strong><span>estados</span></div>
          </div>
        </div>
      </div>

      <div className={styles.formPanel}>
        <div className={styles.formBox}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Bem-vindo de volta!</h2>
            <p className={styles.formSub}>Entre com sua conta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div style={{ marginBottom: '16px', textAlign: 'center' }}>
              <label style={{ marginRight: '16px' }}>
                <input
                  type="radio"
                  name="loginMode"
                  checked={!useId}
                  onChange={() => setUseId(false)}
                  style={{ marginRight: '4px' }}
                />
                Email
              </label>
              <label>
                <input
                  type="radio"
                  name="loginMode"
                  checked={useId}
                  onChange={() => setUseId(true)}
                  style={{ marginRight: '4px' }}
                />
                ID do Turista
              </label>
            </div>
            
            {useId ? (
              <Input
                label="ID do Turista"
                type="text"
                placeholder="Ex: 1"
                icon="🆔"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                error={errors.email}
              />
            ) : (
              <>
                <Input
                  label="Email"
                  type="email"
                  placeholder="seu@email.com"
                  icon="✉️"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  error={errors.email}
                />
                <Input
                  label="Senha"
                  type="password"
                  placeholder="••••••••"
                  icon="🔒"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  error={errors.password}
                />
              </>
            )}

            {apiError && <p className={styles.apiError}>{apiError}</p>}

            <Button type="submit" size="xl" loading={loading}>
              Entrar
            </Button>
          </form>

          <p className={styles.switchLink}>
            Não tem conta?{' '}
            <Link href="/signup" className={styles.link}>Criar conta grátis</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
