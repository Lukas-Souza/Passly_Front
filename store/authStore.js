import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,

  login: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('passport_token', token);
      localStorage.setItem('passport_user', JSON.stringify(user));
    }
    set({ user, token });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('passport_token');
      localStorage.removeItem('passport_user');
    }
    set({ user: null, token: null });
  },

  hydrate: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('passport_token');
      const userRaw = localStorage.getItem('passport_user');
      if (token && userRaw) {
        try {
          const user = JSON.parse(userRaw);
          set({ user, token });
        } catch {
          // ignore
        }
      }
    }
  },
}));

export default useAuthStore;
