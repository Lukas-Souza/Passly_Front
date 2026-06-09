export const mockUser = {
  id: 1,
  name: 'Ana Souza',
  email: 'ana@email.com',
  avatar: null,
  createdAt: '2024-01-15',
};

export const mockStats = {
  totalVisitas: 12,
  locaisVisitados: 9,
  avaliacoes: 7,
  artefatos: 4,
  progressoPassaporte: 45,
};

export const mockLocais = [
  {
    id: 1,
    nome: 'Cristo Redentor',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    categoria: 'Monumento',
    descricao: 'Um dos maiores cartões postais do Brasil, o Cristo Redentor é uma estátua de 38 metros que domina o Morro do Corcovado com vista privilegiada da cidade.',
    imagem: 'https://picsum.photos/seed/cristo/800/500',
    notaMedia: 4.9,
    totalVisitantes: 2843,
    codigoCheckin: 'CRT-RJ-001',
  },
  {
    id: 2,
    nome: 'Pão de Açúcar',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    categoria: 'Natureza',
    descricao: 'Majestoso morro que se eleva a 396 metros sobre a Baía de Guanabara, acessível por teleférico com vistas deslumbrantes.',
    imagem: 'https://picsum.photos/seed/pao/800/500',
    notaMedia: 4.8,
    totalVisitantes: 1920,
    codigoCheckin: 'PAO-RJ-002',
  },
  {
    id: 3,
    nome: 'Cataratas do Iguaçu',
    cidade: 'Foz do Iguaçu',
    estado: 'PR',
    categoria: 'Natureza',
    descricao: "Uma das maiores e mais impressionantes quedas d'água do mundo, com 275 saltos se estendendo por quase 3 km.",
    imagem: 'https://picsum.photos/seed/iguacu/800/500',
    notaMedia: 5.0,
    totalVisitantes: 3100,
    codigoCheckin: 'IGU-PR-003',
  },
  {
    id: 4,
    nome: 'Pelourinho',
    cidade: 'Salvador',
    estado: 'BA',
    categoria: 'Histórico',
    descricao: 'Centro histórico de Salvador, com coloridas arquiteturas coloniais, igrejas barrocas e a vibrante cultura baiana.',
    imagem: 'https://picsum.photos/seed/pelourinho/800/500',
    notaMedia: 4.7,
    totalVisitantes: 1540,
    codigoCheckin: 'PEL-BA-004',
  },
  {
    id: 5,
    nome: 'Lençóis Maranhenses',
    cidade: 'Barreirinhas',
    estado: 'MA',
    categoria: 'Natureza',
    descricao: 'Parque nacional com extensas dunas de areia branca intercaladas por lagoas de água doce cristalina.',
    imagem: 'https://picsum.photos/seed/lencois/800/500',
    notaMedia: 4.9,
    totalVisitantes: 980,
    codigoCheckin: 'LEN-MA-005',
  },
  {
    id: 6,
    nome: 'Teatro Amazonas',
    cidade: 'Manaus',
    estado: 'AM',
    categoria: 'Cultural',
    descricao: 'Magnífico teatro inaugurado em 1896 durante o auge da borracha, símbolo da riqueza e história amazônica.',
    imagem: 'https://picsum.photos/seed/teatro/800/500',
    notaMedia: 4.6,
    totalVisitantes: 760,
    codigoCheckin: 'TEA-AM-006',
  },
];

export const mockVisitantes = [
  { id: 1, name: 'Carlos Lima', avatar: null, dataVisita: '2024-03-10' },
  { id: 2, name: 'Maria Santos', avatar: null, dataVisita: '2024-03-09' },
  { id: 3, name: 'João Oliveira', avatar: null, dataVisita: '2024-03-08' },
  { id: 4, name: 'Fernanda Costa', avatar: null, dataVisita: '2024-03-07' },
  { id: 5, name: 'Ricardo Alves', avatar: null, dataVisita: '2024-03-06' },
];

export const mockAvaliacoes = [
  {
    id: 1,
    usuario: 'Carlos Lima',
    avatar: null,
    nota: 5,
    comentario: 'Experiência incrível! Vale cada centavo e cada minuto de espera. A vista é simplesmente de tirar o fôlego.',
    data: '2024-03-10',
  },
  {
    id: 2,
    usuario: 'Maria Santos',
    avatar: null,
    nota: 4,
    comentario: 'Muito bonito, mas bastante movimentado. Recomendo visitar cedo pela manhã para evitar filas.',
    data: '2024-03-09',
  },
  {
    id: 3,
    usuario: 'João Oliveira',
    avatar: null,
    nota: 5,
    comentario: 'Um dos lugares mais marcantes que já visitei no Brasil. Obrigatório na lista de qualquer viajante.',
    data: '2024-03-08',
  },
];

export const mockArtefatos = [
  {
    id: 1,
    usuario: 'Ana Paula',
    avatar: null,
    mensagem: '🌟 Este lugar mudou minha perspectiva de vida. Levei minha filha pela primeira vez e ela chorou de emoção!',
    data: '2024-03-10',
  },
  {
    id: 2,
    usuario: 'Roberto Silva',
    avatar: null,
    mensagem: '🎒 Terceira vez aqui e cada visita é única. O pôr do sol daqui não tem igual no mundo.',
    data: '2024-03-08',
  },
  {
    id: 3,
    usuario: 'Juliana Ferreira',
    avatar: null,
    mensagem: '📸 Trouxe minha câmera velha e tirei as melhores fotos da minha vida. Lugar mágico!',
    data: '2024-03-05',
  },
];

export const mockPassaporte = [
  {
    id: 1,
    local: 'Cristo Redentor',
    cidade: 'Rio de Janeiro',
    imagem: 'https://picsum.photos/seed/cristo/400/300',
    dataVisita: '2024-03-10',
    nota: 5,
  },
  {
    id: 2,
    local: 'Pão de Açúcar',
    cidade: 'Rio de Janeiro',
    imagem: 'https://picsum.photos/seed/pao/400/300',
    dataVisita: '2024-02-22',
    nota: 5,
  },
  {
    id: 3,
    local: 'Pelourinho',
    cidade: 'Salvador',
    imagem: 'https://picsum.photos/seed/pelourinho/400/300',
    dataVisita: '2024-01-18',
    nota: 4,
  },
];

export const mockRanking = [
  { posicao: 1, nome: 'Carlos Lima', visitas: 28, avatar: null },
  { posicao: 2, nome: 'Maria Santos', visitas: 21, avatar: null },
  { posicao: 3, nome: 'Ana Souza', visitas: 12, avatar: null },
  { posicao: 4, nome: 'João Oliveira', visitas: 9, avatar: null },
  { posicao: 5, nome: 'Fernanda Costa', visitas: 7, avatar: null },
];

export const mockCidades = ['Rio de Janeiro', 'Salvador', 'Foz do Iguaçu', 'Manaus', 'Barreirinhas'];
export const mockCategorias = ['Monumento', 'Natureza', 'Histórico', 'Cultural', 'Praia', 'Gastronomia'];
