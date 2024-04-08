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
    set({ id: id });
    SecureStore.setItem('id', id);
  },
  clearId: async () => {
    set({ id: null });
    await SecureStore.deleteItemAsync('id');
  },
}));
