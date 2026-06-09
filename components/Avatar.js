import styles from '../styles/Components.module.css';

// ─── Button ────────────────────────────────────────────────────────────────
export function Button({ children, variant = 'primary', size = 'md', loading, disabled, onClick, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${styles.btn} ${styles[`btn_${variant}`]} ${styles[`btn_${size}`]} ${className}`}
    >
      {loading ? <span className={styles.btnSpinner} /> : children}
    </button>
  );
}

// ─── Input ─────────────────────────────────────────────────────────────────
export function Input({ label, error, icon, ...props }) {
  return (
    <div className={styles.inputGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.inputIcon}>{icon}</span>}
        <input className={`${styles.input} ${icon ? styles.inputWithIcon : ''} ${error ? styles.inputError : ''}`} {...props} />
      </div>
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
}

// ─── Avatar ────────────────────────────────────────────────────────────────
export default function Avatar({ name = '?', src, size = 40 }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  const colors = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#EF4444'];
  const color = colors[name.charCodeAt(0) % colors.length];

  if (src) {
    return <img src={src} alt={name} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} />;
  }

  return (
    <div
      className={styles.avatar}
      style={{ width: size, height: size, background: color, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}

// ─── Loader ────────────────────────────────────────────────────────────────
export function Loader({ text = 'Carregando...' }) {
  return (
    <div className={styles.loaderWrap}>
      <div className={styles.loaderRing} />
      <p className={styles.loaderText}>{text}</p>
    </div>
  );
}

// ─── EmptyState ────────────────────────────────────────────────────────────
export function EmptyState({ icon = '🗺️', title, description, action }) {
  return (
    <div className={styles.emptyState}>
      <span className={styles.emptyIcon}>{icon}</span>
      <h3 className={styles.emptyTitle}>{title}</h3>
      {description && <p className={styles.emptyDesc}>{description}</p>}
      {action && <div className={styles.emptyAction}>{action}</div>}
    </div>
  );
}

// ─── Modal ─────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
        {title && (
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>{title}</h2>
            <button className={styles.modalClose} onClick={onClose}>✕</button>
          </div>
        )}
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
}

// ─── RatingStars ───────────────────────────────────────────────────────────
export function RatingStars({ value = 0, max = 5, size = 16 }) {
  return (
    <div className={styles.stars} style={{ fontSize: size }}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < Math.round(value) ? styles.starFilled : styles.starEmpty}>★</span>
      ))}
    </div>
  );
}

// ─── CardEstatistica ───────────────────────────────────────────────────────
export function CardEstatistica({ icon, label, value, color = 'blue', trend }) {
  return (
    <div className={`${styles.statCard} ${styles[`statCard_${color}`]}`}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statContent}>
        <div className={styles.statValue}>{value}</div>
        <div className={styles.statLabel}>{label}</div>
        {trend !== undefined && (
          <div className={styles.statTrend}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% este mês
          </div>
        )}
      </div>
    </div>
  );
}
