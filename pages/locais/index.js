import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { locaisService } from '../services/locaisService';
import { mockLocais, mockCidades, mockCategorias } from '../services/mockData';
import CardTuristico from '../components/CardTuristico';
import { Loader, EmptyState } from '../components/Avatar';
import { Input } from '../components/Avatar';
import styles from '../styles/Locais.module.css';

export default function Locais() {
  const [busca, setBusca] = useState('');
  const [cidade, setCidade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [nota, setNota] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['locais'],
    queryFn: async () => {
      try { return await locaisService.listar(); }
      catch { return mockLocais; }
    },
  });

  const locais = data || mockLocais;

  const filtrados = locais.filter((l) => {
    if (busca && !l.nome.toLowerCase().includes(busca.toLowerCase()) && !l.cidade.toLowerCase().includes(busca.toLowerCase())) return false;
    if (cidade && l.cidade !== cidade) return false;
    if (categoria && l.categoria !== categoria) return false;
    if (nota && l.notaMedia < parseFloat(nota)) return false;
    return true;
  });

  if (isLoading) return <Loader text="Carregando locais..." />;

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Explorar Locais</h1>
          <p className={styles.sub}>Descubra pontos turísticos incríveis pelo Brasil</p>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <Input
          placeholder="🔍  Buscar por nome ou cidade..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <select className={styles.select} value={cidade} onChange={e => setCidade(e.target.value)}>
          <option value="">Todas as cidades</option>
          {mockCidades.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className={styles.select} value={categoria} onChange={e => setCategoria(e.target.value)}>
          <option value="">Todas as categorias</option>
          {mockCategorias.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className={styles.select} value={nota} onChange={e => setNota(e.target.value)}>
          <option value="">Qualquer avaliação</option>
          <option value="4.5">4.5+ estrelas</option>
          <option value="4">4+ estrelas</option>
          <option value="3">3+ estrelas</option>
        </select>
        {(busca || cidade || categoria || nota) && (
          <button className={styles.clearBtn} onClick={() => { setBusca(''); setCidade(''); setCategoria(''); setNota(''); }}>
            ✕ Limpar filtros
          </button>
        )}
      </div>

      <p className={styles.resultCount}>{filtrados.length} local{filtrados.length !== 1 ? 'is' : ''} encontrado{filtrados.length !== 1 ? 's' : ''}</p>

      {filtrados.length === 0 ? (
        <EmptyState icon="🔍" title="Nenhum local encontrado" description="Tente ajustar os filtros de busca" />
      ) : (
        <div className={styles.grid}>
          {filtrados.map(l => <CardTuristico key={l.id} local={l} />)}
        </div>
      )}
    </div>
  );
}
