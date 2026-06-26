import { create } from "zustand";
import { persist } from "zustand/middleware";

// --- Types ---
// TODO: Replace with actual User type from your API
interface User {
  id: string;
  email: string;
  name: string;
  [key: string]: unknown;
}

interface AppConfig {
  pricingMsg?: string;
  isNewUser?: boolean;
}

interface AppState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  config: AppConfig | null;
  setConfig: (config: AppConfig) => void;
  clearConfig: () => void;
}

// --- Store ---
// Usage: const user = useAppStore(s => s.user);
//        const setUser = useAppStore(s => s.setUser);
const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
      config: null,
      setConfig: (config: AppConfig) => set({ config }),
      clearConfig: () => set({ config: null }),
    }),
    {
      name: "app",
      version: 1,
    }
  )
);

export default useAppStore;

