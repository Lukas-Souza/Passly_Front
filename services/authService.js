import api from './api';

export const authService = {
  // Cadastrar novo turista (signup)
  signup: async (name, email, password) => {
    const response = await api.post('/turistas', {
      nome: name,
      email,
      senha: password,
    });
    // A resposta deve conter os dados do turista criado
    return {
      user: response.data,
      token: `token-${response.data?.id || Date.now()}`,
    };
  },

  // Buscar turista por ID (login com ID)
  loginWithId: async (id) => {
    const data = await api.get(`/turistas/${id}`);
    return {
      user: data,
      token: `token-${id}`,
    };
  },

  // Obter perfil do usuário
  getProfile: async (id) => {
    const data = await api.get(`/turistas/${id}`);
    return data;
  },

  // Atualizar perfil do turista
  updateProfile: async (id, payload) => {
    const { data } = await api.put(`/turistas/${id}`, {
      nome: payload.name || payload.nome,
      email: payload.email,
      senha: payload.password || payload.senha,
    });
    return data;
  },

  // Deletar perfil do turista
  deleteProfile: async (id) => {
    const { data } = await api.delete(`/turistas/${id}`);
    return data;
  },

  // Contar total de turistas
  contarTotal: async () => {
    const { data } = await api.get('/turistas/total');
    return data;
  },
};
