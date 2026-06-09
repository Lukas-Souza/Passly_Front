import api from './api';

export const operadoraService = {
  // Criar nova operadora turística
  criar: async (operadoraData) => {
    const { data } = await api.post('/operadoras/', operadoraData);
    return data;
  },

  // Buscar operadora por login
  buscarPorLogin: async (login) => {
    const { data } = await api.get(`/operadoras/${login}`);
    return data;
  },

  // Atualizar operadora turística
  atualizar: async (id, operadoraData) => {
    const { data } = await api.put(`/operadoras/${id}`, operadoraData);
    return data;
  },

  // Deletar operadora turística
  deletar: async (id) => {
    const { data } = await api.delete(`/operadoras/${id}`);
    return data;
  },
};
