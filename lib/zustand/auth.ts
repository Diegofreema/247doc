import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

type Props = {
  id?: any;
  getId: () => void;
  setId: (id: string) => void;
  clearId: () => void;
};

export const useAuth = create<Props>((set) => ({
  id: SecureStore.getItem('id') || null,
  getId: () => {
    const id = SecureStore.getItem('id');
    if (id) set({ id });
  },
  setId: (id: string) => {
    const authId = SecureStore.setItem('id', id);
    set({ id: authId });
  },
  clearId: () => set({ id: null }),
}));
