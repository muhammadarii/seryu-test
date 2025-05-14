import { create } from "zustand";

type AuthState = {
  sessionId: string | null;
  isLoggedIn: boolean;
  setSessionId: (id: string) => void;
  setIsLoggedIn: (state: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  sessionId: null,
  isLoggedIn: false,
  setSessionId: (id) => set({ sessionId: id }),
  setIsLoggedIn: (state) => set({ isLoggedIn: state }),
  logout: () => set({ sessionId: null, isLoggedIn: false }),
}));
