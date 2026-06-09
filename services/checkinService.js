import api from './api';
import { mockLocais } from './mockData';

export const checkinService = {
  // Realizar check-in em um local turístico usando código
  realizar: async (codigo, idUser) => {
    // Buscar local pelo código nos dados mockados
    const local = mockLocais.find(l => l.codigoCheckin === codigo);
    if (!local) {
      throw new Error('Código de check-in inválido');
    }
    
    // Fazer check-in com idLocal e idUser
    const { data } = await api.post(`/check-in/${local.id}/${idUser}`, {
      codigo,
    });
    return data;
  },

  // Realizar check-in direto com IDs
  realizarComIds: async (idLocal, idUser, checkInData = {}) => {
    const { data } = await api.post(`/check-in/${idLocal}/${idUser}`, checkInData);
    return data;
  },

  // Listar lugares visitados pelo turista
  meuPassaporte: async (id) => {
    const { data } = await api.get(`/turistas/${id}/lugares-visitados`);
    return data;
  },

  // Dashboard (retorna dados do turista)
  dashboard: async (id) => {
    const { data } = await api.get(`/turistas/${id}`);
    return data;
  },
};
