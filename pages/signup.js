import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useAuthStore from '../store/authStore';
import { authService } from '../services/authService';
import { mockUser } from '../services/mockData';
import { Button, Input } from '../components/Avatar';
import styles from '../styles/Auth.module.css';

export default function Signup() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Nome obrigatório';
    if (!form.email) e.email = 'Email obrigatório';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido';
    if (!form.password) e.password = 'Senha obrigatória';
    else if (form.password.length < 6) e.password = 'Mínimo 6 caracteres';
    if (!form.confirmPassword) e.confirmPassword = 'Confirme a senha';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Senhas não coincidem';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    try {
      const result = await authService.signup(form.name, form.email, form.password);
      login(result.user, result.token);
      router.push('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      // Fallback to mock
      login({ ...mockUser, name: form.name, email: form.email, id: Date.now() }, 'mock-token-demo');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className={styles.authPage}>
      <div className={styles.heroPanel}>
        <div className={styles.heroContent}>
          <span className={styles.heroIcon}>✈️</span>
          <h1 className={styles.heroTitle}>Comece sua jornada</h1>
          <p className={styles.heroSubtitle}>
            Crie sua conta e comece a registrar cada lugar incrível que você visitar pelo Brasil e pelo mundo.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}><strong>Grátis</strong><span>para sempre</span></div>
            <div className={styles.heroStat}><strong>∞</strong><span>registros</span></div>
            <div className={styles.heroStat}><strong>100%</strong><span>seu</span></div>
          </div>
        </div>
      </div>

      <div className={styles.formPanel}>
        <div className={styles.formBox}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Criar conta</h2>
            <p className={styles.formSub}>Preencha os dados para começar</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <Input label="Nome completo" type="text" placeholder="Seu nome" icon="👤" value={form.name} onChange={set('name')} error={errors.name} />
            <Input label="Email" type="email" placeholder="seu@email.com" icon="✉️" value={form.email} onChange={set('email')} error={errors.email} />
            <Input label="Senha" type="password" placeholder="Mínimo 6 caracteres" icon="🔒" value={form.password} onChange={set('password')} error={errors.password} />
            <Input label="Confirmar senha" type="password" placeholder="Repita a senha" icon="🔒" value={form.confirmPassword} onChange={set('confirmPassword')} error={errors.confirmPassword} />
            <Button type="submit" size="xl" loading={loading}>Criar Conta</Button>
          </form>

          <p className={styles.switchLink}>
            Já tem conta? <Link href="/login" className={styles.link}>Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
