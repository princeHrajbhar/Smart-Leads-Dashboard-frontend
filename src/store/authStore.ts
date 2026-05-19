import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (status: boolean) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user }),
      setAuthenticated: (status) => set({ isAuthenticated: status }),
      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({ user: null, isAuthenticated: false });
      },
      // Initialize auth state from localStorage tokens
      initialize: () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          // If we have a token, assume user is authenticated
          // In a real app, you'd validate the token with the server
          set({ isAuthenticated: true });
        }
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        // Initialize auth state after rehydration
        const token = localStorage.getItem('accessToken');
        if (token && state) {
          state.isAuthenticated = true;
        }
      },
    }
  )
);