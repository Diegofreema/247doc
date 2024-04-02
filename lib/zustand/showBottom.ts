import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

type Props = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useShowBottom = create<Props>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
