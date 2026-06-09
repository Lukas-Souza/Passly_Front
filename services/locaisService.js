import api from './api';

export const locaisService = {
  // Listar todos os locais turísticos
  listar: async (params = {}) => {
    // Nota: A API não tem endpoint GET /localTuristico sem ID
    // Você pode precisar implementar isso ou usar GET /localTuristico/{id}
    try {
      const { data } = await api.get('/localTuristico', { params });
      return data;
    } catch (error) {
      console.warn('Endpoint GET /localTuristico não disponível, usando dados mockados');
      return [];
    }
  },

  // Obter detalhes de um local turístico
  detalhe: async (id) => {
    const { data } = await api.get(`/localTuristico/${id}`);
    return data;
  },

  // Listar visitas a um local
  visitantes: async (id) => {
    const { data } = await api.get(`/localTuristico/${id}/visitas`);
    return data;
  },

  // Criar novo local turístico
  criar: async (localData) => {
    const { data } = await api.post('/localTuristico/', localData);
    return data;
  },

  // Editar local turístico
  editar: async (id, localData) => {
    const { data } = await api.put(`/localTuristico/${id}`, localData);
    return data;
  },

  // Deletar local turístico
  deletar: async (id) => {
    const { data } = await api.delete(`/localTuristico/${id}`);
    return data;
  },
};
